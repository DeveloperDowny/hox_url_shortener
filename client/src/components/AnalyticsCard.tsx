import React from "react";

import { Analytics } from "@/types/types";

export interface AnalyticsCardProps {
  analytics: Analytics;
  type: "qr" | "link";
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ analytics, type }) => {
  return (
    <div className="px-[1rem] py-[1rem] rounded-md border flex flex-col gap-[0.5rem] bg-white shadow-md">
      <div className="text-xl">{type == "link" ? "Link" : "QR"}</div>
      <div className="text-8xl">
        {type == "link"
          ? analytics.traffic_from_link
          : analytics.traffic_from_qr}
      </div>
    </div>
  );
};

export default AnalyticsCard;
