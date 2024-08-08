"use client";

import { getLinks } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

const page = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error occurred: {error.message}</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
};
export default page;
