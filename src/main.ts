import * as core from '@actions/core'
import {parseApiLinks, parseModLinks} from './schema/schema-util'

async function run(): Promise<void> {
  try {
    const installPath = core.getInput('apiPath')
    core.debug(`Requested to install at ${installPath}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const apiLinks = await parseApiLinks()
    const modLinks = await parseModLinks()
    core.info(JSON.stringify(apiLinks))
    core.info(JSON.stringify(modLinks))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
