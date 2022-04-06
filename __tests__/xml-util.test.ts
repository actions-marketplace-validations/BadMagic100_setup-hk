import { parseApiLinks, parseModLinks } from '../src/schema/xml-util';
import { downloadTool } from '@actions/tool-cache';
import { readFile } from 'fs/promises';

import { test, expect, jest } from '@jest/globals';
import { ApiManifest, ModManifest } from '../src/schema/schema-types';

jest.mock('@actions/tool-cache');
jest.mock('fs/promises');

const downloadToolMock = downloadTool as jest.MockedFunction<
  typeof downloadTool
>;
const readFileMock = readFile as jest.MockedFunction<typeof readFile>;

const apiLinksSimplest = `
<?xml version="1.0"?>
<ApiLinks>
    <Manifest>
        <Version>69</Version>
        <Links>
            <Linux SHA256="b1d9266cf98bba8c02e9208e79935074424ffc1263bcadc8f31f911e01d6af29">
                <![CDATA[https://github.com/hk-modding/api/releases/download/1.5.78.11833-69/ModdingApiLinux.zip]]>
            </Linux>
            <Mac SHA256="e650b87d9bbfca3a55e841d675bf683923420a69ffc1da2199f7d1e2303e9b9a">
                <![CDATA[https://github.com/hk-modding/api/releases/download/1.5.78.11833-69/ModdingApiMac.zip]]>
            </Mac>
            <Windows SHA256="4c72f071649df9ce979f523b14265346188f23937105dd64b8004ef821b9574d">
                <![CDATA[https://github.com/hk-modding/api/releases/download/1.5.78.11833-69/ModdingApiWin.zip]]>
            </Windows>
        </Links>
        <Files>
            <File>Assembly-CSharp.dll</File>
        </Files>
    </Manifest>
</ApiLinks>`;

const modLinksSingleLinkNoDep = `
<?xml version="1.0"?>
<ModLinks>
    <Manifest>
        <Name>SteelSoulHUD</Name>
        <Description>Enables the Steel Soul HUD in normal mode.</Description>
        <Version>1.0.0.0</Version>
        <Link SHA256="C411A892B6409537EF01625EE3B42722D4C0FBA4F051316096939CE0DD46A7AF">
            <![CDATA[https://github.com/dpinela/SteelSoulHUD/releases/download/v1.0/SteelSoulHUD.zip]]>
        </Link>
        <Dependencies />
    </Manifest>
</ModLinks>`;

const modLinksSingleLinkWithDep = `
<?xml version="1.0"?>
<ModLinks>
  <Manifest>
  <Name>QoL</Name>
    <Description>A collection of various quality of life improvements.</Description>
    <Version>4.2.0.0</Version>
    <Link SHA256="55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9">
        <![CDATA[https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip]]>
    </Link>
    <Dependencies>
        <Dependency>Vasi</Dependency>
    </Dependencies>
  </Manifest>
</ModLinks>`;

const modLinksMultiLinkWithDeps = `
<?xml version="1.0"?>
<ModLinks>
  <Manifest>
  <Name>QoL</Name>
    <Description>A collection of various quality of life improvements.</Description>
    <Version>4.2.0.0</Version>
    <Links>
      <Linux SHA256="55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9">
          <![CDATA[https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip]]>
      </Linux>
      <Mac SHA256="55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9">
        <![CDATA[https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip]]>
      </Mac>
      <Windows SHA256="55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9">
        <![CDATA[https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip]]>
      </Windows>
    </Links>
    <Dependencies>
        <Dependency>Vasi</Dependency>
        <Dependency>SomeOtherMod</Dependency>
    </Dependencies>
  </Manifest>
</ModLinks>`;

const modLinksMultipleManifests = `
<?xml version="1.0"?>
<ModLinks>
  <Manifest>
    <Name>QoL</Name>
    <Description>A collection of various quality of life improvements.</Description>
    <Version>4.2.0.0</Version>
    <Link SHA256="55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9">
        <![CDATA[https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip]]>
    </Link>
    <Dependencies>
        <Dependency>Vasi</Dependency>
    </Dependencies>
  </Manifest>
  <Manifest>
    <Name>SteelSoulHUD</Name>
    <Description>Enables the Steel Soul HUD in normal mode.</Description>
    <Version>1.0.0.0</Version>
    <Link SHA256="C411A892B6409537EF01625EE3B42722D4C0FBA4F051316096939CE0DD46A7AF">
        <![CDATA[https://github.com/dpinela/SteelSoulHUD/releases/download/v1.0/SteelSoulHUD.zip]]>
    </Link>
    <Dependencies />
  </Manifest>
</ModLinks>`;

beforeEach(() => {
  downloadToolMock.mockClear();
  readFileMock.mockClear();

  downloadToolMock.mockResolvedValue('tmp/asdf.zip');
});

test('parses minimal API links', async () => {
  readFileMock.mockResolvedValue(apiLinksSimplest);
  const expected: ApiManifest = {
    version: 69,
    files: ['Assembly-CSharp.dll'],
    links: {
      linux: {
        hash: 'b1d9266cf98bba8c02e9208e79935074424ffc1263bcadc8f31f911e01d6af29',
        href: 'https://github.com/hk-modding/api/releases/download/1.5.78.11833-69/ModdingApiLinux.zip',
      },
      mac: {
        hash: 'e650b87d9bbfca3a55e841d675bf683923420a69ffc1da2199f7d1e2303e9b9a',
        href: 'https://github.com/hk-modding/api/releases/download/1.5.78.11833-69/ModdingApiMac.zip',
      },
      windows: {
        hash: '4c72f071649df9ce979f523b14265346188f23937105dd64b8004ef821b9574d',
        href: 'https://github.com/hk-modding/api/releases/download/1.5.78.11833-69/ModdingApiWin.zip',
      },
    },
  };
  expect(await parseApiLinks()).toEqual(expected);
});

test('parses minimal mod links, no dependencies', async () => {
  readFileMock.mockResolvedValue(modLinksSingleLinkNoDep);
  const expected: ModManifest[] = [
    {
      name: 'SteelSoulHUD',
      description: 'Enables the Steel Soul HUD in normal mode.',
      version: '1.0.0.0',
      link: {
        href: 'https://github.com/dpinela/SteelSoulHUD/releases/download/v1.0/SteelSoulHUD.zip',
        hash: 'C411A892B6409537EF01625EE3B42722D4C0FBA4F051316096939CE0DD46A7AF',
      },
      dependencies: [],
    },
  ];
  expect(await parseModLinks()).toEqual(expected);
});

test('parses minimal mod links, with dependencies', async () => {
  readFileMock.mockResolvedValue(modLinksSingleLinkWithDep);
  const expected: ModManifest[] = [
    {
      name: 'QoL',
      description: 'A collection of various quality of life improvements.',
      version: '4.2.0.0',
      link: {
        href: 'https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip',
        hash: '55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9',
      },
      dependencies: ['Vasi'],
    },
  ];
  expect(await parseModLinks()).toEqual(expected);
});

test('parses multi-platform mod links', async () => {
  readFileMock.mockResolvedValue(modLinksMultiLinkWithDeps);
  const expected: ModManifest[] = [
    {
      name: 'QoL',
      description: 'A collection of various quality of life improvements.',
      version: '4.2.0.0',
      links: {
        linux: {
          href: 'https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip',
          hash: '55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9',
        },
        mac: {
          href: 'https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip',
          hash: '55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9',
        },
        windows: {
          href: 'https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip',
          hash: '55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9',
        },
      },
      dependencies: ['Vasi', 'SomeOtherMod'],
    },
  ];
  expect(await parseModLinks()).toEqual(expected);
});

test('parses multiple mod link manifests', async () => {
  readFileMock.mockResolvedValue(modLinksMultipleManifests);
  const expected: ModManifest[] = [
    {
      name: 'QoL',
      description: 'A collection of various quality of life improvements.',
      version: '4.2.0.0',
      link: {
        href: 'https://github.com/fifty-six/HollowKnight.QoL/releases/download/v4.2/QoL.zip',
        hash: '55FBBAE4B666D0BB83201A14DE0AF662D417B174F502E0E0F919A012B42B4EE9',
      },
      dependencies: ['Vasi'],
    },
    {
      name: 'SteelSoulHUD',
      description: 'Enables the Steel Soul HUD in normal mode.',
      version: '1.0.0.0',
      link: {
        href: 'https://github.com/dpinela/SteelSoulHUD/releases/download/v1.0/SteelSoulHUD.zip',
        hash: 'C411A892B6409537EF01625EE3B42722D4C0FBA4F051316096939CE0DD46A7AF',
      },
      dependencies: [],
    },
  ];
  expect(await parseModLinks()).toEqual(expected);
});
