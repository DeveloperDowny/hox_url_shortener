"use client";

import { getLinks } from "@/api/api";
import AllLinks from "@/components/AllLinks";
import LinkInputForm from "@/components/LinkInputForm";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const page = () => {
  return (
    <div>
      <LinkInputForm />
      <div className="mt-[3rem]">
        {" "}
        <AllLinks />
      </div>
    </div>
  );
};
export default page;
