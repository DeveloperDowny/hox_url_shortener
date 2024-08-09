"use client";

import { getLinks } from "@/api/api";
import { Analytics, ShortLink } from "@/types/types";
import { Edit } from "@mui/icons-material";
import { Collapse, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import EditLinkForm from "./EditLinkForm";
import TransitionGroup from "react-transition-group/TransitionGroup";

const AllLinks = () => {
  const [editDialog, setEditDialog] = React.useState({
    open: false,
    data: null as ShortLink,
  });

  const handleEditClick = (data: ShortLink) => {
    setEditDialog({
      open: true as boolean,
      data: data as ShortLink,
    });
  };

  const handleSaveEdit = async () => {};

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
    <div className="">
      <EditDialog
        editDialog={editDialog}
        setEditDialog={setEditDialog}
        handleSaveEdit={handleSaveEdit}
      />
      <TransitionGroup className="flex flex-col gap-[1rem]">
        {data.map((analytic: Analytics, index) => {
          const item = analytic.short_link_data;
          const handleClick = (e) => {
            downloadBase64File(item.qr, item.short_link);
          };
          return (
            <Collapse key={item.short_link} className="">
              <div
                className="flex gap-[1rem] bg-white rounded-md px-[1rem] py-[1rem] justify-between shadow-md"
                // key={analytic.short_link_data.id}
              >
                <div className="">
                  <div className="flex gap-8 items-center mb-[0.5rem]">
                    {" "}
                    <div className="text-xl pt-[0.5rem] ">
                      {item.short_link}
                    </div>
                    <IconButton
                      className=""
                      onClick={() => handleEditClick(item)}
                    >
                      <Edit />
                    </IconButton>
                  </div>
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
                    <a
                      target="_blank"
                      href={item.long_link}
                      className="underline"
                    >
                      {item.long_link}{" "}
                    </a>
                  </div>
                  <div className="">
                    <b>Traffic from browser:</b> {analytic.traffic_from_link}
                  </div>
                  <div className="">
                    <b>Traffic from QR:</b> {analytic.traffic_from_qr}
                  </div>
                </div>{" "}
                <div className="">
                  <img
                    src={item.qr}
                    alt=""
                    className=""
                    width={100}
                    height={100}
                  />
                  <div
                    onClick={handleClick}
                    className="underline cursor-pointer"
                  >
                    Download
                  </div>
                </div>
              </div>
            </Collapse>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

const EditDialog = ({
  editDialog,
  setEditDialog,
  handleSaveEdit,
}: {
  editDialog: { open: boolean; data: ShortLink };
  setEditDialog: any;
  handleSaveEdit: any;
}) => {
  return (
    <Dialog
      open={editDialog.open}
      onClose={() => setEditDialog({ open: false, data: null })}
      maxWidth="lg"
    >
      <DialogTitle>Edit Short URL</DialogTitle>
      <DialogContent className="min-w-[50rem]">
        <EditLinkForm
          short_link_data={editDialog.data}
          handleClose={() => setEditDialog({ open: false, data: null })}
        />
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={() => setEditDialog({ open: false, data: null })}>
          Cancel
        </Button>
        <Button onClick={handleSaveEdit} variant="contained">
          Save
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default AllLinks;
