import { OpenAPIV3 } from "openapi-types";
import fs from "fs";

const spec: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: { title: "URL Shortener", version: "1.0" },
  servers: [{ url: "http://localhost:5000" }],
  paths: {
    "/api/short_links": {
      get: { responses: { "200": { description: "" } } },
      post: {
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
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ShortLink",
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
    },
  },
};

fs.writeFileSync("public/openapi.json", JSON.stringify(spec));
