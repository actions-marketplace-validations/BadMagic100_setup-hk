import { downloadLink } from './links-processing';
import * as core from '@actions/core';
import { ApiManifest } from './schema/schema-types';

export async function tryDownloadApiManifest(
  manifest: ApiManifest,
): Promise<boolean> {
  core.info(`Attempting to download MAPI v${manifest.version}`);
  const result = await downloadLink(manifest.links);
  if (result.succeeded) {
    core.info(
      `Successfully downloaded MAPI v${manifest.version} to ${result.resultPath}`,
    );
    return true;
  } else {
    core.setFailed(
      `Failed to download MAPI v${manifest.version}: ${result.detailedReason}`,
    );
    return false;
  }
}
