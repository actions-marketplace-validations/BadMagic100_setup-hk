import parseApi, {ApiLinksType} from './apilinks'
import parseMods, {ModLinksType} from './modlinks'
import {readFile} from 'fs/promises'
import {DOMParser} from 'xmldom'

import tc from '@actions/tool-cache'

async function downloadAndParseDom(link: string): Promise<Document> {
  const apiLinksPath = await tc.downloadTool(link)
  const content = await readFile(apiLinksPath, 'utf-8')
  return new DOMParser().parseFromString(content, 'text/xml')
}

export async function parseApiLinks(): Promise<ApiLinksType> {
  const dom = await downloadAndParseDom(
    'https://raw.githubusercontent.com/hk-modding/modlinks/main/ApiLinks.xml'
  )
  return parseApi(dom).ApiLinks
}

export async function parseModLinks(): Promise<ModLinksType> {
  const dom = await downloadAndParseDom(
    'https://raw.githubusercontent.com/hk-modding/modlinks/main/ModLinks.xml'
  )
  return parseMods(dom).ModLinks
}
