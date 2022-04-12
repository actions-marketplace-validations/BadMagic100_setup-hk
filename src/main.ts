import * as core from '@actions/core';
import * as io from '@actions/io';
import * as artifact from '@actions/artifact';
import path from 'path';
import {
  getApiLinksManifest,
  tryDownloadApiManifest,
  tryDownloadVanilla,
} from './apilinks';
import { resolveDependencyTree } from './dependency-management';
import {
  getModLinksManifests,
  ModManifest,
  tryDownloadModManifest,
} from './modlinks';
import { parseApiLinks, parseModLinks } from './xml-util';
import { zip } from 'zip-a-folder';
import { parse } from './mod-dependencies';

async function run(): Promise<void> {
  try {
    const installPath = core.getInput('apiPath');
    const dependencyFilePath = core.getInput('dependencyFilePath');
    const modPath = path.join(installPath, 'Mods');
    core.debug(`Requested to install at ${installPath}`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    await io.mkdirP(modPath);

    const apiLinks = getApiLinksManifest(await parseApiLinks());
    core.debug(JSON.stringify(apiLinks));

    if (!(await tryDownloadVanilla(installPath))) {
      core.setFailed(
        'Unable to download HK files, see previous output for more details',
      );
    }

    if (await tryDownloadApiManifest(apiLinks, installPath)) {
      const modLinks = getModLinksManifests(await parseModLinks());
      core.debug(JSON.stringify(modLinks));
      const modLookup = modLinks.reduce((map, obj) => {
        map[obj.Name] = obj;
        return map;
      }, {} as Record<string, ModManifest>);

      const dependencyEntries = await parse(dependencyFilePath);
      core.debug(`Parsed dependencies as ${JSON.stringify(dependencyEntries)}`);
      const modsToDownload = resolveDependencyTree(
        dependencyEntries.map(x => x.modName),
        modLookup,
      );
      core.debug(
        `Resolved dependency closure as ${JSON.stringify(modsToDownload)}`,
      );
      let downloadedAllDependencies = true;
      for (const mod of modsToDownload) {
        const success = await tryDownloadModManifest(mod, modPath);
        downloadedAllDependencies = downloadedAllDependencies && success;
      }

      if (downloadedAllDependencies) {
        // do something fancy

        // for debug purposes, upload the created install folder to sanity check if needed
        if (core.isDebug()) {
          const artifactName = `ManagedFolder-${process.platform}`;
          const zipPath = `${artifactName}.zip`;
          await zip(installPath, zipPath);
          const artifactClient = artifact.create();
          artifactClient.uploadArtifact(artifactName, [zipPath], '.', {
            continueOnError: true,
          });
        }
      } else {
        core.setFailed(
          'Unable to download all dependency files, see previous output for more details',
        );
      }
    } else {
      core.setFailed(
        'Unable to download API files, see previous output for more details',
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      if (core.isDebug()) {
        core.error(error);
        if (error.stack) {
          core.error(error.stack);
        }
      }
      core.setFailed(error.message);
    }
  }
}

run();
