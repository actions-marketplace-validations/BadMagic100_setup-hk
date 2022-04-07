import { Queue } from 'queue-typescript';
import { ModManifest } from './modlinks';
import * as core from '@actions/core';

export function resolveDependencyTree(
  targetMods: string[],
  modLookup: Record<string, ModManifest>,
): Set<ModManifest> {
  const modsToProcess = new Queue<string>(...targetMods);
  const processedMods = new Set<string>();
  let dependencyError = false;

  while (modsToProcess.length > 0) {
    const currentMod = modsToProcess.dequeue();
    if (currentMod in modLookup) {
      const manifest = modLookup[currentMod];
      manifest.Dependencies.Dependency.forEach(
        modsToProcess.enqueue.bind(modsToProcess),
      );
      processedMods.add(currentMod);
    } else {
      dependencyError = true;
      core.error(`${currentMod} expected in modlinks, but was not present`);
    }
  }
  if (dependencyError) {
    core.setFailed(
      'One or more requested dependencies was not available in modlinks. See previous output for more information',
    );
  }
  return new Set<ModManifest>([...processedMods].map(x => modLookup[x]));
}
