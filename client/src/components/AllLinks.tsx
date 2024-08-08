import { getLinks } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AllLinks = () => {
  function downloadBase64File(linkSource, fileName) {
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
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
    <div className="flex flex-col gap-[1rem]">
      {data.map((item, index) => {
        const handleClick = (e) => {
          downloadBase64File(item.qr, item.short_link);
        };
        return (
          <div className="flex gap-[1rem] bg-white rounded-md px-[1rem] py-[1rem] justify-between shadow-md">
            {" "}
            <div className="">
              <div className="text-xl">{item.short_link}</div>
              <div className="">
                <b>Short URL:</b>{" "}
                <a
                  target="_blank"
                  href={`http://localhost:5000/${item.short_link}`}
                  className="underline"
                >
                  http://localhost:5000/{item.short_link}
                </a>
              </div>
              <div className="">
                <b>Destination URL:</b>{" "}
                <a target="_blank" href={item.long_link} className="underline">
                  {item.long_link}{" "}
                </a>
              </div>
            </div>{" "}
            <div className="">
              <img src={item.qr} alt="" className="" width={100} height={100} />
              <div onClick={handleClick} className="underline cursor-pointer">
                Download
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllLinks;
