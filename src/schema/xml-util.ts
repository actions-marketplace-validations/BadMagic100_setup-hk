import { readFile } from 'fs/promises';
import { transform } from 'camaro';

import * as tc from '@actions/tool-cache';
import { apiLinksTemplate, modLinksTemplate } from './templates';
import {
  ApiManifest,
  isAllPlatformMod,
  isMultiPlatformMod,
  ModManifest,
} from './schema-types';

async function downloadXml(link: string): Promise<string> {
  const filePath = await tc.downloadTool(link);
  return await readFile(filePath, 'utf-8');
}

function cleanModManifests(manifests: ModManifest[]): ModManifest[] {
  manifests.map(manifest => {
    manifest.dependencies = manifest.dependencies.filter(x => x.length > 0);
    if (isAllPlatformMod(manifest)) {
      delete (manifest as any).links;
    } else if (isMultiPlatformMod(manifest)) {
      delete (manifest as any).link;
    }
  });
  return manifests;
}

export async function parseApiLinks(): Promise<ApiManifest> {
  const content = await downloadXml(
    'https://raw.githubusercontent.com/hk-modding/modlinks/main/ApiLinks.xml',
  );
  return (await transform(content, apiLinksTemplate)) as ApiManifest;
}

export const parseModLinks = async (): Promise<ModManifest[]> => {
  const content = await downloadXml(
    'https://raw.githubusercontent.com/hk-modding/modlinks/main/ModLinks.xml',
  );
  const manifests = (await transform(
    content,
    modLinksTemplate,
  )) as ModManifest[];
  return cleanModManifests(manifests);
};
