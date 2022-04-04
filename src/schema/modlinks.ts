/* do not edit, but regenerate using xsd-tools */
import {parse} from 'xsd-tools'
export type _ = {
  ModLinks: ModLinksType
}
export type ShaStringType = string
export type LinkStringType = string
export type VersionStringType = string
export type ModLinksType = {
  Manifest: ManifestType
}
export type ManifestType = {
  Name: string
  Description: string
  Version: VersionStringType
  Dependencies: DepListType
}
export type LinksType = {
  Linux: SingleLinkType
  Mac: SingleLinkType
  Windows: SingleLinkType
}
export type SingleLinkType = {
  '#': LinkStringType
  '@SHA256'?: ShaStringType
}
export type DepListType = {
  Dependency: string
}
export default function (doc: globalThis.Document) {
  return parse(doc, {
    xsElement: [
      {
        '@name': 'ModLinks',
        '@type': 'ModLinksType',
        '@minOccurs': 1,
        '@maxOccurs': 1
      }
    ],
    xsComplexType: [
      {
        xsSequence: {
          xsElement: [
            {
              '@name': 'Manifest',
              '@type': 'ManifestType',
              '@minOccurs': 1,
              '@maxOccurs': 1
            }
          ]
        },
        xsAttribute: [],
        xsAttributeGroup: [],
        '@name': 'ModLinksType'
      },
      {
        xsSequence: {
          xsElement: [
            {
              '@name': 'Name',
              '@type': 'string',
              '@minOccurs': 1,
              '@maxOccurs': 1
            },
            {
              '@name': 'Description',
              '@type': 'string',
              '@minOccurs': 1,
              '@maxOccurs': 1
            },
            {
              '@name': 'Version',
              '@type': 'VersionStringType',
              '@minOccurs': 1,
              '@maxOccurs': 1
            },
            {
              '@name': 'Dependencies',
              '@type': 'DepListType',
              '@minOccurs': 1,
              '@maxOccurs': 1
            }
          ]
        },
        xsAttribute: [],
        xsAttributeGroup: [],
        '@name': 'ManifestType'
      },
      {
        xsSequence: {
          xsElement: [
            {
              '@name': 'Linux',
              '@type': 'SingleLinkType',
              '@minOccurs': 1,
              '@maxOccurs': 1
            },
            {
              '@name': 'Mac',
              '@type': 'SingleLinkType',
              '@minOccurs': 1,
              '@maxOccurs': 1
            },
            {
              '@name': 'Windows',
              '@type': 'SingleLinkType',
              '@minOccurs': 1,
              '@maxOccurs': 1
            }
          ]
        },
        xsAttribute: [],
        xsAttributeGroup: [],
        '@name': 'LinksType'
      },
      {
        xsSimpleContent: {
          xsExtension: {
            xsAttribute: [{'@name': 'SHA256', '@type': 'ShaStringType'}],
            '@base': 'LinkStringType'
          }
        },
        '@name': 'SingleLinkType'
      },
      {
        xsSequence: {
          xsElement: [
            {
              '@name': 'Dependency',
              '@type': 'string',
              '@minOccurs': 1,
              '@maxOccurs': 1
            }
          ]
        },
        xsAttribute: [],
        xsAttributeGroup: [],
        '@name': 'DepListType'
      }
    ],
    xsSimpleType: [
      {
        xsRestriction: {
          xsEnumeration: [],
          xsPattern: {'@value': '([0-9]|[a-f]|[A-F]){64}'},
          '@base': 'xs:string'
        },
        '@name': 'ShaStringType'
      },
      {
        xsRestriction: {
          xsEnumeration: [],
          xsPattern: {'@value': 'https?://.*'},
          '@base': 'xs:string'
        },
        '@name': 'LinkStringType'
      },
      {
        xsRestriction: {
          xsEnumeration: [],
          xsPattern: {'@value': '(\\d+\\.){3}\\d+'},
          '@base': 'xs:string'
        },
        '@name': 'VersionStringType'
      }
    ]
  }) as _
}
