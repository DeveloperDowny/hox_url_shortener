"use client";

import { getAnalyticsById } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AnalyticsCard from "./AnalyticsCard";

const AnalyticsCont = ({ sid }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["analytics", sid],
    queryFn: () => getAnalyticsById(sid),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error occurred: {error.message}</div>;
  }
  return (
    <div className="flex gap-4">
      <AnalyticsCard analytics={data} type="link" />
      <AnalyticsCard analytics={data} type="qr" />
    </div>
  );
};

export default AnalyticsCont;
