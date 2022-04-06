import * as core from '@actions/core';
import { getApiLinksManifest, tryDownloadApiManifest } from './apilinks';
import {
  getModLinksManifests,
  ModManifest,
  tryDownloadModManifest,
} from './modlinks';
import { parseApiLinks, parseModLinks } from './xml-util';

async function run(): Promise<void> {
  try {
    const installPath = core.getInput('apiPath');
    core.debug(`Requested to install at ${installPath}`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const apiLinks = getApiLinksManifest(await parseApiLinks());
    core.info(JSON.stringify(apiLinks));
    if (await tryDownloadApiManifest(apiLinks)) {
      const modLinks = getModLinksManifests(await parseModLinks());
      const modLookup = modLinks.reduce((map, obj) => {
        map[obj.Name] = obj;
        return map;
      }, {} as Record<string, ModManifest>);
      ['MagicUI', 'ConnectionMetadataInjector'].forEach(mod => {
        tryDownloadModManifest(modLookup[mod]);
      });
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
