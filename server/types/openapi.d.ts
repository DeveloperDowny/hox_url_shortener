import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Paths {
    namespace ApiShortLinks {
        namespace Get {
            namespace Responses {
                export interface $200 {
                }
            }
        }
        namespace Post {
            export interface RequestBody {
                id?: string;
                long_link: string;
            }
            namespace Responses {
                export interface $200 {
                    id?: string;
                }
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
