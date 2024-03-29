"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Camera from "../(components)/(logos)/Camera";
import Live from "../(components)/(logos)/Live";
import { Input } from "@nextui-org/react";
import ReactPlayer from "react-player";
import Upload from "../(components)/(logos)/Upload";

function page() {
  const [file, setFile] = useState(null);
  const handleChoose = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type && selectedFile.type.startsWith("video/")) {
        if (selectedFile.size <= 100 * 1024 * 1024) {
          setFile(selectedFile);
        } else {
          alert("Please select a video file with a maximum size of 20MB.");
        }
      } else {
        alert("Please select a .mp4 video file.");
      }
    }
  };
  return (
    <div className="flex flex-col p-5 m-3 justify-center items-center">
      <h1 className="text-4xl font-bold">
        Upload Presentation Video to Auto Evaluate!
      </h1>
      <div className="flex gap-10 m-10 mt-20">
        <div>
          <label
            htmlFor="videoInput"
            className="relative cursor-pointer"
            style={{ display: "inline-block" }}
          >
            <Button
              color="warning"
              className="text-lg font-semibold"
              size="lg"
              radius="lg"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              Choose Your Video <Camera />
            </Button>
            <Input
              id="videoInput"
              type="file"
              className="opacity-0"
              style={{
                position: "relative",
                zIndex: -1,
              }}
              onChange={handleChoose}
            />
          </label>
        </div>
        <div>
          <Button
            color="warning"
            className="text-lg font-semibold"
            size="lg"
            radius="lg"
          >
            Use Live Camera <Live />
          </Button>
        </div>
      </div>
      <div>
        {file && <ReactPlayer url={URL.createObjectURL(file)} controls />}
      </div>
      <div>
        {file && (
          <div>
            <Button
              color="warning"
              className="text-lg font-semibold"
              size="lg"
              radius="lg"
            >
              Upload Video <Upload />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
