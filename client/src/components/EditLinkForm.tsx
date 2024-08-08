import React, { FormEvent, useEffect } from "react";

import Form from "@rjsf/mui";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { createLink } from "@/api/api";
import { useQueryClient } from "@tanstack/react-query";
import { IChangeEvent } from "@rjsf/core";

const EditLinkForm = ({ short_link_data, handleClose }) => {
  const formRef = React.useRef(null);
  const queryClient = useQueryClient();
  const schema: RJSFSchema = {
    type: "object",
    properties: {
      short_link: { type: "string", title: "Short URL Suffix" },
      long_link: { type: "string", title: "Destination URL" },
      //   qr: { type: "string" },
    },
    required: ["long_link", "short_link"],
  };

  const uiSchema: UiSchema = {
    short_link: {
      "ui:autofocus": true,
      "ui:emptyValue": "",
      "ui:help": "Enter the short url suffix",
      "ui:placeholder": "Example: my-short-url",
      "ui:classNames": "formShortLink",
    },
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
    handleClose();

    // Can be used for editing
    // formRef.current.setState({
    //   formData: {
    //     long_link: "sdf",
    //   },
    // });
  };

  useEffect(() => {
    formRef.current.setState({
      formData: {
        short_link: short_link_data.short_link,
        long_link: short_link_data.long_link,
      },
    });
  }, [short_link_data]);

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

export default EditLinkForm;
