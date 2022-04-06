import * as tc from '@actions/tool-cache';
import * as core from '@actions/core';
import * as crypto from 'crypto';
import * as path from 'path';
import { readFile } from 'fs/promises';
import { isLink, LinkData, MultiplatformLinks } from './schema/schema-types';

const allowedExtensions = ['.dll', '.zip'] as const;
type ModFileType = typeof allowedExtensions[number];

function readonlyIncludes<T extends U, U>(
  list: readonly T[],
  item: U,
): item is T {
  return list.includes(item as T);
}

interface DownloadFailed {
  succeeded: false;
  detailedReason: string;
}

interface DownloadSuccess {
  succeeded: true;
  resultPath: string;
  fileType: ModFileType;
}

export type DownloadStatus = DownloadFailed | DownloadSuccess;

export function getPreferredLinkPlatform(): keyof MultiplatformLinks {
  switch (process.platform) {
    case 'win32':
      return 'windows';
    case 'linux':
      return 'linux';
    case 'darwin':
      return 'mac';
    default:
      throw new Error('Not running on a modlinks-supported platform');
  }
}

export async function downloadLink(
  link: LinkData | MultiplatformLinks,
  dest?: string,
): Promise<DownloadStatus> {
  if (!isLink(link)) {
    const platform = getPreferredLinkPlatform();
    link = link[platform];
    core.debug(
      `Detected platform ${platform} while downloading multiplatform link, selected ${link.href}`,
    );
  }

  try {
    const ext = path.extname(link.href);
    if (!readonlyIncludes(allowedExtensions, ext)) {
      return {
        succeeded: false,
        detailedReason: `Download link ${link.href} does not have a supported extension`,
      };
    }
    const resultPath = await tc.downloadTool(link.href, dest);

    const fileContent = await readFile(resultPath);
    const actualHash = crypto
      .createHash('sha256')
      .update(fileContent)
      .digest('hex');
    const expectedHash = link.hash.toLowerCase();
    if (actualHash !== expectedHash) {
      return {
        succeeded: false,
        detailedReason: `Expected hash ${expectedHash}, got ${actualHash} instead`,
      };
    }
    return { succeeded: true, fileType: ext, resultPath };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected failure';
    return { succeeded: false, detailedReason: message };
  }
}
