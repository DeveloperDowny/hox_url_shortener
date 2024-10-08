import { OpenAPIV3 } from "openapi-types";
import fs from "fs";

const spec: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: { title: "URL Shortener", version: "1.0" },
  servers: [{ url: "http://localhost:5000" }],
  paths: {
    "/api/short_links": {
      get: {
        operationId: "getAllLinks",

        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Analytics" },
                },
              },
            },
          },
        },
      },
      post: {
        operationId: "createLink",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ShortLink",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "",
          },
        },
      },
    },
    "/{short_url}": {
      get: {
        parameters: [
          {
            name: "ref",
            in: "query",
            required: false,
            schema: { type: "string" },
          },
          {
            name: "short_url",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],

        responses: {
          "302": {
            description: "redirects",
          },
        },
      },
    },
    "/api/short_links/{sid}": {
      patch: {
        operationId: "updateLink",
        parameters: [
          {
            name: "sid",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ShortLink",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "To update the link",
          },
          "409": {
            description: "Bad Request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: { type: "string" },
                  },
                  required: ["error"],
                },
              },
            },
          },
        },
      },
    },
    "/api/short_links/{sid}/analytics": {
      get: {
        operationId: "getAnalyticsById",
        parameters: [
          {
            name: "sid",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": {
            description: "",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Analytics",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ShortLink: {
        type: "object",
        properties: {
          id: { type: "number" },
          long_link: { type: "string" },
          short_link: { type: "string" },
          qr: { type: "string" },
        },
        required: ["long_link"],
      },
      Analytics: {
        type: "object",
        properties: {
          traffic_from_qr: { type: "number" },
          traffic_from_link: { type: "number" },
          short_link_data: { $ref: "#/components/schemas/ShortLink" },
        },
        required: ["traffic_from_qr", "traffic_from_link", "short_link_data"],
      },
    },
  },
};

fs.writeFileSync("public/openapi.json", JSON.stringify(spec));
