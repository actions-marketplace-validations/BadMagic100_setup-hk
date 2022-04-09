import { downloadLink, MultiplatformLinks } from './links-processing';
import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as io from '@actions/io';

interface ApiSchema {
  ApiLinks: {
    Manifest: ApiManifest;
  };
}

export interface ApiManifest {
  Version: number;
  Links: MultiplatformLinks;
  Files: {
    File: string[];
  };
}

export function getApiLinksManifest(rawJson: unknown): ApiManifest {
  return (rawJson as ApiSchema).ApiLinks.Manifest;
}

export async function tryDownloadApiManifest(
  manifest: ApiManifest,
  apiTargetPath: string,
): Promise<boolean> {
  core.info(`Attempting to download MAPI v${manifest.Version}`);
  const result = await downloadLink(manifest.Links);
  if (result.succeeded) {
    if (result.fileType !== '.zip') {
      core.info(
        `Failed to download MAPI v${manifest.Version}. Expected a .zip file.`,
      );
      return false;
    }
    const tmpResult = await tc.extractZip(result.resultPath);
    await io.cp(tmpResult, apiTargetPath, { recursive: true, force: true });

    core.info(
      `Successfully downloaded MAPI v${manifest.Version} to ${apiTargetPath}`,
    );
    return true;
  } else {
    core.error(
      `Failed to download MAPI v${manifest.Version}: ${result.detailedReason}`,
    );
    return false;
  }
}
