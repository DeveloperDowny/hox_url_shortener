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
    namespace $ShortUrl {
        namespace Get {
            namespace Responses {
                export interface $302 {
                }
            }
        }
    }
    namespace CreateLink {
        export type RequestBody = Components.Schemas.ShortLink;
        namespace Responses {
            export type $200 = Components.Schemas.ShortLink;
        }
    }
    namespace GetAllLinks {
        namespace Responses {
            export type $200 = Components.Schemas.ShortLink[];
        }
    }
}

export interface OperationMethods {
  /**
   * getAllLinks
   */
  'getAllLinks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAllLinks.Responses.$200>
  /**
   * createLink
   */
  'createLink'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateLink.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateLink.Responses.$200>
}

export interface PathsDictionary {
  ['/api/short_links']: {
    /**
     * getAllLinks
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAllLinks.Responses.$200>
    /**
     * createLink
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateLink.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateLink.Responses.$200>
  }
  ['/{short_url}']: {
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
