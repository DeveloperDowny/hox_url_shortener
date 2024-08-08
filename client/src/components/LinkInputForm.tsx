import React, { FormEvent } from "react";

import Form from "@rjsf/mui";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { createLink } from "@/api/api";
import { useQueryClient } from "@tanstack/react-query";
import { IChangeEvent } from "@rjsf/core";

const LinkInputForm = () => {
  const formRef = React.useRef(null);
  const queryClient = useQueryClient();
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

  const onSubmit = async (myObj: IChangeEvent, e: FormEvent) => {
    const formData = myObj.formData;

    const data = await createLink(formData.long_link);
    queryClient.invalidateQueries({ queryKey: ["links"] });
    // reset the form

    formRef.current.reset();

    // Can be used for editing
    // formRef.current.setState({
    //   formData: {
    //     long_link: "sdf",
    //   },
    // });
  };

  return (
    <Form
      ref={formRef}
      schema={schema}
      uiSchema={uiSchema}
      validator={validator}
      onChange={log("changed")}
      onSubmit={onSubmit}
      onError={log("errors")}
    />
  );
};

export default LinkInputForm;
