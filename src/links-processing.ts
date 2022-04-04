import * as tc from '@actions/tool-cache';
import * as core from '@actions/core';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

export type LinkData = {
  $value: string;
  __SHA256: string;
};

export interface MultiplatformLinks {
  Linux: LinkData;
  Mac: LinkData;
  Windows: LinkData;
}

function isSingleLink(link: LinkData | MultiplatformLinks): link is LinkData {
  return (link as LinkData).$value !== undefined;
}

interface DownloadFailed {
  succeeded: false;
  detailedReason: string;
}

interface DownloadSuccess {
  succeeded: true;
  resultPath: string;
}

export type DownloadStatus = DownloadFailed | DownloadSuccess;

export function getPreferredLinkPlatform(): keyof MultiplatformLinks {
  switch (process.platform) {
    case 'win32':
      return 'Windows';
    case 'linux':
      return 'Linux';
    case 'darwin':
      return 'Mac';
    default:
      throw new Error('Not running on a modlinks-supported platform');
  }
}

export async function downloadLink(
  link: LinkData | MultiplatformLinks,
  dest?: string,
): Promise<DownloadStatus> {
  if (!isSingleLink(link)) {
    const platform = getPreferredLinkPlatform();
    link = link[platform];
    core.debug(
      `Detected platform ${platform} while downloading multiplatform link ${link.$value}`,
    );
  }

  try {
    const resultPath = await tc.downloadTool(link.$value, dest);

    const fileContent = await readFile(resultPath);
    const actualHash = createHash('sha256').update(fileContent).digest('hex');
    const expectedHash = link.__SHA256.toLowerCase();
    if (actualHash !== expectedHash) {
      return {
        succeeded: false,
        detailedReason: `Expected hash ${expectedHash}, got ${actualHash} instead`,
      };
    }
    return { succeeded: true, resultPath };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected failure';
    return { succeeded: false, detailedReason: message };
  }
}
