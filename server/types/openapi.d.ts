import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        export interface ShortLink {
            id?: number;
            long_link: string;
            short_link?: string;
            qr?: string;
        }
    }
}
declare namespace Paths {
    namespace ApiShortLinks {
        namespace Get {
            namespace Responses {
                export interface $200 {
                }
            }
        }
        namespace Post {
            export type RequestBody = Components.Schemas.ShortLink;
            namespace Responses {
                export type $200 = Components.Schemas.ShortLink;
            }
        }
    }
}

export interface OperationMethods {
}

export interface PathsDictionary {
  ['/api/short_links']: {
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
