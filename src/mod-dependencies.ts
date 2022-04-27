import { readFile } from 'fs/promises';

export interface ModDependency {
  modName: string;
  alias?: string;
  url?: string;
}

function parseTokens(tokens: string[]): ModDependency | undefined {
  let buf = '';
  let field: keyof ModDependency = 'modName';
  const result: ModDependency = { modName: '' };
  for (const token of tokens) {
    // comments terminate parsing the line
    if (token.startsWith('#')) {
      break;
    }
    // check reserve words first
    if (token === 'as') {
      if (field === 'modName') {
        result[field] = buf;
        buf = '';
        field = 'alias';
      } else {
        throw new Error(`Parse error: unexpected 'as' near '${buf}'`);
      }
    } else if (token === 'from') {
      result[field] = buf;
      buf = '';
      field = 'url';
    } else {
      // the token is not a reserve word. append it
      if (buf !== '') {
        buf += ' ';
      }
      buf += token;
    }
  }
  // out of tokens. push the buffer to the current field
  result[field] = buf;
  if (result.modName !== '') {
    return result;
  }
}

export async function parse(path?: string): Promise<ModDependency[]> {
  if (!path) {
    return [];
  }
  const content = await readFile(path, 'utf8');
  const lines = content.split(/\r?\n/);
  return lines
    .map(x => parseTokens(x.trim().split(' ')))
    .filter((x?: ModDependency): x is ModDependency => !!x);
}
