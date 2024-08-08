import { OpenAPIV3 } from "openapi-types";
import fs from "fs";

const spec: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: {
    title: "URL Shortener",
    version: "1.0",
  },
  servers: [{ url: "http://localhost:5000" }],
  paths: {
    "/api/short_links": {
      get: {
        responses: {
            "200" : {
                description: "",
                
            }
        }
      },
      post: {
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  long_link: {
                    type: "string",
                  },
                },
                required: ["long_link"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

fs.writeFileSync("public/openapi.json", JSON.stringify(spec));
