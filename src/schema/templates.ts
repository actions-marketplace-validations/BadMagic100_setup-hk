function linkTemplate(xpath?: string) {
  if (!xpath) {
    xpath = '.';
  }
  return {
    href: xpath,
    hash: xpath + '/@SHA256',
  };
}

function multiLinkTemplate(xpath?: string) {
  if (!xpath) {
    xpath = '.';
  }
  return {
    linux: linkTemplate(xpath + '/Linux'),
    mac: linkTemplate(xpath + '/Mac'),
    windows: linkTemplate(xpath + '/Windows'),
  };
}

export const apiLinksTemplate = {
  version: 'number(ApiLinks/Manifest/Version)',
  links: multiLinkTemplate('ApiLinks/Manifest/Links'),
  files: ['ApiLinks/Manifest/Files/File', '.'],
};

export const modLinksTemplate = [
  'ModLinks/Manifest',
  {
    name: 'Name',
    description: 'Description',
    version: 'Version',
    link: linkTemplate('Link'),
    links: multiLinkTemplate('Links'),
    dependencies: ['Dependencies/Dependency', '.'],
  },
];
