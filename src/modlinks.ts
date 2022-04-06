import { downloadLink, LinkData, MultiplatformLinks } from './links-processing';
import * as core from '@actions/core';

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
  return (rawJson as ModLinksSchema).ModLinks.Manifest;
}

export async function tryDownloadModManifest(
  manifest: ModManifest,
): Promise<boolean> {
  core.info(`Attempting to download ${manifest.Name} v${manifest.Version}`);
  const result = await downloadLink(
    isAllPlatformMod(manifest) ? manifest.Link : manifest.Links,
  );
  if (result.succeeded) {
    core.info(
      `Successfully downloaded ${manifest.Name} v${manifest.Version} to ${result.resultPath}`,
    );
    return true;
  } else {
    core.setFailed(
      `Failed to download ${manifest.Name} v${manifest.Version}: ${result.detailedReason}`,
    );
    return false;
  }
}
