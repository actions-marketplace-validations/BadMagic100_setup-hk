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

const vanillaLinks: ApiManifest = {
  Version: 1.5,
  Links: {
    Windows: {
      $value: 'https://files.catbox.moe/i4sdl6.zip',
      __SHA256:
        '15dbd6a5668c722c9b1e585b944756063a7f4b41f9c0e161a3c7649f1d3ab08e',
    },
    Linux: {
      $value: 'https://files.catbox.moe/j85bvb.zip',
      __SHA256:
        'febb2350fb19ab6ec594f9994bd6854d16f5e8f8b30008571e43c082bbd7eef7',
    },
    Mac: {
      $value: 'https://files.catbox.moe/j8fyro.zip',
      __SHA256:
        '48a038fb88d7a85b4f92d1c879ef5478d3734f440cf99aae0d6d5013148feb00',
    },
  },
  // not actually used currently, just a placeholder for the moment
  Files: {
    File: [],
  },
};

export function getApiLinksManifest(rawJson: unknown): ApiManifest {
  return (rawJson as ApiSchema).ApiLinks.Manifest;
}

export async function tryDownloadVanilla(
  apiTargetPath: string,
): Promise<boolean> {
  return tryDownloadApiManifest(vanillaLinks, apiTargetPath);
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
    await io.cp(tmpResult, apiTargetPath, {
      recursive: true,
      force: true,
      copySourceDirectory: false,
    });

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
