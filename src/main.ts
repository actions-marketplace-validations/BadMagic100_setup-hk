import * as core from '@actions/core';
import { tryDownloadApiManifest } from './apilinks';
import { parseApiLinks, parseModLinks } from './schema/xml-util';

async function run(): Promise<void> {
  try {
    const installPath = core.getInput('apiPath');
    core.debug(`Requested to install at ${installPath}`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const apiLinks = await parseApiLinks();
    core.info(JSON.stringify(apiLinks));
    if (await tryDownloadApiManifest(apiLinks)) {
      const modLinks = await parseModLinks();
      core.info(JSON.stringify(modLinks));
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
