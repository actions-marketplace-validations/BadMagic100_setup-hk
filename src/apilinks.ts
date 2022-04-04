import { downloadLink, MultiplatformLinks } from './links-processing';
import * as core from '@actions/core';

export interface ApiManifest {
  Version: number;
  Links: MultiplatformLinks;
  Files: {
    File: string[];
  };
}

export function getApiLinksManifest(rawJson: any): ApiManifest {
  return rawJson.ApiLinks.Manifest as ApiManifest;
}

export async function tryDownloadApiManifest(
  manifest: ApiManifest,
): Promise<boolean> {
  core.info(`Attempting to download MAPI v${manifest.Version}`);
  const result = await downloadLink(manifest.Links);
  if (result.succeeded) {
    core.info(
      `Successfully downloaded MAPI v${manifest.Version} to ${result.resultPath}`,
    );
    return true;
  } else {
    core.setFailed(
      `Failed to download MAPI v${manifest.Version}: ${result.detailedReason}`,
    );
    return false;
  }
}
