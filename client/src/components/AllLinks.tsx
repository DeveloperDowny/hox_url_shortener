import { getLinks } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllLinks = () => {
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
  return (
    <div className="flex flex-col gap-[1rem] ">
      {data.map((item, index) => {
        return (
          <div className="bg-white rounded-md px-[1rem] py-[1rem]">
            <div className="text-xl">{item.short_link}</div>
            <div className="">
              <b>Short URL:</b>{" "}
              <a
                href={`http://localhost:5000/${item.short_link}`}
                className="underline"
              >
                http://localhost:5000/{item.short_link}
              </a>
            </div>
            <div className="">
              <b>Destination URL:</b>{" "}
              <a href={item.long_link} className="underline">
                {item.long_link}{" "}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllLinks;
