import {
  downloadLink,
  DownloadSuccess,
  LinkData,
  MultiplatformLinks,
} from './links-processing';
import * as core from '@actions/core';
import * as io from '@actions/io';
import * as tc from '@actions/tool-cache';
import path from 'path';

interface ModLinksSchema {
  ModLinks: {
    Manifest: ModManifest[];
  };
}

interface ModLinksManifestBase {
  Name: string;
  Description: string;
  Version: string;
  Dependencies: {
    Dependency: string[];
  };
}

interface ModManifestAllPlatforms extends ModLinksManifestBase {
  Link: LinkData;
}

interface ModManifestMultiplatform extends ModLinksManifestBase {
  Links: MultiplatformLinks;
}

export type ModManifest = ModManifestAllPlatforms | ModManifestMultiplatform;

function isAllPlatformMod(
  manifest: ModManifest,
): manifest is ModManifestAllPlatforms {
  return 'Link' in manifest;
}

export function getModLinksManifests(rawJson: unknown): ModManifest[] {
  const manifests = (rawJson as ModLinksSchema).ModLinks.Manifest;
  manifests.forEach(manifest => {
    if ((manifest.Dependencies as unknown) === '') {
      manifest.Dependencies = { Dependency: [] };
    }
  });
  return manifests;
}

async function extractMod(
  mod: ModManifest,
  result: DownloadSuccess,
  modInstallPath: string,
): Promise<string> {
  const thisModInstall = path.join(modInstallPath, mod.Name);
  await io.mkdirP(thisModInstall);

  if (result.fileType === '.dll') {
    await io.cp(result.resultPath, thisModInstall, { force: true });
  } else if (result.fileType === '.zip') {
    const tmpResult = await tc.extractZip(result.resultPath);
    await io.cp(tmpResult, thisModInstall, {
      recursive: true,
      force: true,
      copySourceDirectory: false,
    });
  }
  return thisModInstall;
}

export async function tryDownloadModManifest(
  manifest: ModManifest,
  modInstallPath: string,
): Promise<boolean> {
  core.info(`Attempting to download ${manifest.Name} v${manifest.Version}`);
  const result = await downloadLink(
    isAllPlatformMod(manifest) ? manifest.Link : manifest.Links,
  );
  if (result.succeeded) {
    const thisModInstallPath = await extractMod(
      manifest,
      result,
      modInstallPath,
    );
    core.info(
      `Successfully downloaded ${manifest.Name} v${manifest.Version} to ${thisModInstallPath}`,
    );
    return true;
  } else {
    core.error(
      `Failed to download ${manifest.Name} v${manifest.Version}: ${result.detailedReason}`,
    );
    return false;
  }
}
