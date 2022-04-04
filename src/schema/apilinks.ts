/* do not edit, but regenerate using xsd-tools */
import {parse} from 'xsd-tools'
export type _ = {
  ApiLinks: ApiLinksType
}
export type ShaStringType = string
export type LinkStringType = string
export type VersionStringType = string
export type ApiLinksType = {
  Manifest: ManifestType
}
export type ManifestType = {
  Version: VersionStringType
  Files: FileListType
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
export type FileListType = {
  File: string
}
export default function (doc: globalThis.Document) {
  return parse(doc, {
    xsElement: [
      {
        '@name': 'ApiLinks',
        '@type': 'ApiLinksType',
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
        '@name': 'ApiLinksType'
      },
      {
        xsSequence: {
          xsElement: [
            {
              '@name': 'Version',
              '@type': 'VersionStringType',
              '@minOccurs': 1,
              '@maxOccurs': 1
            },
            {
              '@name': 'Files',
              '@type': 'FileListType',
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
              '@name': 'File',
              '@type': 'string',
              '@minOccurs': 1,
              '@maxOccurs': 1
            }
          ]
        },
        xsAttribute: [],
        xsAttributeGroup: [],
        '@name': 'FileListType'
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
          xsPattern: {'@value': '\\d+'},
          '@base': 'xs:string'
        },
        '@name': 'VersionStringType'
      }
    ]
  }) as _
}
