import { readFile } from 'fs/promises';
import { XMLParser } from 'fast-xml-parser';

import * as tc from '@actions/tool-cache';

const alwaysArray = [
  'ModLinks.Manifest',
  'ModLinks.Manifest.Dependencies.Dependency',
];

const parser = new XMLParser({
  ignoreDeclaration: true,
  ignoreAttributes: false,
  attributeNamePrefix: '__',
  textNodeName: '$value',
  isArray: (_, jpath) => alwaysArray.includes(jpath),
});

async function downloadAndParseXml(link: string): Promise<any> {
  const filePath = await tc.downloadTool(link);
  const content = await readFile(filePath, 'utf-8');
  return parser.parse(content);
}

export const parseApiLinks = async (): Promise<any> =>
  await downloadAndParseXml(
    'https://raw.githubusercontent.com/hk-modding/modlinks/main/ApiLinks.xml',
  );

export const parseModLinks = async (): Promise<any> =>
  await downloadAndParseXml(
    'https://raw.githubusercontent.com/hk-modding/modlinks/main/ModLinks.xml',
  );
