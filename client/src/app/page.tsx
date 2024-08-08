"use client";

import { getLinks } from "@/api/api";
import AllLinks from "@/components/AllLinks";
import AnalyticsCont from "@/components/AnalyticsCont";
import LinkInputForm from "@/components/LinkInputForm";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const page = () => {
  return (
    <div>
      <div className="">
        <AnalyticsCont sid={1} />
      </div>
      <LinkInputForm />
      <div className="mt-[3rem]">
        {" "}
        <AllLinks />
      </div>
    </div>
  );
};
export default page;
