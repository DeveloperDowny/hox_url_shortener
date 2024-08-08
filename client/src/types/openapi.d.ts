import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        export interface Analytics {
            traffic_from_qr: number;
            traffic_from_link: number;
            short_link_data: ShortLink;
        }
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
            namespace Parameters {
                export type Ref = string;
                export type ShortUrl = string;
            }
            export interface PathParameters {
                short_url: Parameters.ShortUrl;
            }
            export interface QueryParameters {
                ref?: Parameters.Ref;
            }
            namespace Responses {
                export interface $302 {
                }
            }
        }
    }
    namespace CreateLink {
        export type RequestBody = Components.Schemas.ShortLink;
        namespace Responses {
            export type $200 = Components.Schemas.Analytics;
        }
    }
    namespace GetAllLinks {
        namespace Responses {
            export type $200 = Components.Schemas.ShortLink[];
        }
    }
    namespace GetAnalyticsById {
        namespace Parameters {
            export type Sid = number;
        }
        export interface PathParameters {
            sid: Parameters.Sid;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Analytics;
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
  /**
   * getAnalyticsById
   */
  'getAnalyticsById'(
    parameters: Parameters<Paths.GetAnalyticsById.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAnalyticsById.Responses.$200>
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
  ['/api/short_links/{sid}/analytics']: {
    /**
     * getAnalyticsById
     */
    'get'(
      parameters: Parameters<Paths.GetAnalyticsById.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAnalyticsById.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
