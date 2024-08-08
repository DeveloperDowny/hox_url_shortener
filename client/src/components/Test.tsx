import React from "react";

import Form from "@rjsf/mui";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

const Test = () => {
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      long_link: { type: "string", title: "Your Link" },
      //   short_link: { type: "string" },
      //   qr: { type: "string" },
    },
    required: ["long_link"],
  };

  const uiSchema: UiSchema = {
    long_link: {
      "ui:autofocus": true,
      "ui:emptyValue": "",
      "ui:help": "Enter the destination url",
      "ui:placeholder":
        "Example https://openapistack.co/docs/openapi-client-axios/intro/",
      "ui:classNames": "formLongLink",
    },
  };

  const log = (type) => console.log.bind(console, type);

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      onChange={log("changed")}
      onSubmit={log("submitted")}
      onError={log("errors")}
    />
  );
};

export default Test;
