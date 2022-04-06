export interface LinkData {
  href: string;
  hash: string;
}

export interface MultiplatformLinks {
  linux: LinkData;
  mac: LinkData;
  windows: LinkData;
}

export function isLink(link: LinkData | MultiplatformLinks): link is LinkData {
  if ('href' in link && 'hash' in link) {
    return (
      typeof link.hash === 'string' &&
      link.hash.length > 0 &&
      typeof link.href === 'string' &&
      link.href.length > 0
    );
  }
  return false;
}

export function isMultiLink(
  link: LinkData | MultiplatformLinks,
): link is MultiplatformLinks {
  if ('linux' in link && 'mac' in link && 'windows' in link) {
    return isLink(link.linux) && isLink(link.mac) && isLink(link.windows);
  }
  return false;
}

export interface ApiManifest {
  version: number;
  files: string[];
  links: MultiplatformLinks;
}

interface ModManifestBasic {
  name: string;
  description: string;
  version: string;
  dependencies: string[];
}

export interface ModManifestAllPlatform extends ModManifestBasic {
  link: LinkData;
}

export interface ModManifestMultiPlatform extends ModManifestBasic {
  links: MultiplatformLinks;
}

export type ModManifest = ModManifestAllPlatform | ModManifestMultiPlatform;

export function isAllPlatformMod(
  manifest: ModManifest,
): manifest is ModManifestAllPlatform {
  return 'link' in manifest && isLink(manifest.link);
}

export function isMultiPlatformMod(
  manifest: ModManifest,
): manifest is ModManifestMultiPlatform {
  return 'links' in manifest && isMultiLink(manifest.links);
}
