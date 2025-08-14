/* eslint-disable react-hooks/exhaustive-deps */
import { UrlState } from "../Context";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/Button";
import { Input } from "@/components/ui/input";
import Error from "./Error";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import useFetch from "@/hooks/Use-fetch";
import { QRCode } from "react-qrcode-logo";
import { CreateUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  const locationOrigin =
    typeof window !== "undefined" ? window.location.hostname : "";

  const { user } = UrlState();
  const navigate = useNavigate();

  // we create a reference to reference url to qr code
  const ref = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const LongLink = searchParams.get("createNew");

  // what we want as soon as user lands on dashboard page , we want to show and popup with this longURl prefilled

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: LongLink ? LongLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),

    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),

    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(CreateUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  // logic of creating a url
  const createNewLink = async () => {
    setErrors([]);

    try {
      // - **ref.current**: This accesses the instance of the custom component or the DOM element.
      // - **canvasRef**: This is a ref defined within the custom component (likely for the <canvas> element).

      // - **current**: This accesses the actual DOM node of the <canvas> element.

      // In short, this line is used to get direct access to the <canvas> element inside a component, where the main ref is attached to the parent component or wrapper, and canvasRef is the reference to the <canvas> within it.

      // In the context of react-qrcode, this would be necessary to manipulate or draw the QR code on the canvas directly.

      // Binary Large Object: A data type that stores binary data, such as images or videos. BLOBs are a collection of bytes, and can be any size. They are often used in SQL databases.

      // This code is waiting for the canvas.toBlob() operation to complete and returning the result (blob), which is a binary large object (Blob) containing the image data from the canvas.

      // The await ensures that the code execution pauses until the blob is generated, and then blob contains the resulting data.

      // https://chatgpt.com/share/679cdef4-9964-800e-8904-91d412bde283

      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;

      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={LongLink}
      // as soon it changes or as soon it opens we will remove it from our url and we dont want to just leave it in url
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-black hover:bg-black/80 text-white font-medium">
          Create New Link
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-gray-50 text-black max-w-xs sm:max-w-md rounded-xl p-6 shadow-md">
        <DialogHeader>
          <DialogTitle className="font-thin text-2xl mb-6">
            Create New URL
          </DialogTitle>
        </DialogHeader>

        {formValues?.longUrl && (
          <div className="flex justify-center mb-4">
            <QRCode value={formValues?.longUrl} size={200} ref={ref} />
          </div>
        )}

        <Input
          id="title"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white text-black"
          value={formValues.title}
          placeholder="Short Link's Title"
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}

        <Input
          id="longUrl"
          className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white text-black"
          value={formValues.longUrl}
          onChange={handleChange}
          placeholder="Enter your long URL"
        />

        {errors.longUrl && <Error message={errors.longUrl} />}

        <div className="flex items-center gap-2 mb-3">
          <Card className="p-2 bg-gray-200 text-black rounded-md">
            {locationOrigin}
          </Card>
          <Input
            id="customUrl"
            value={formValues.customUrl}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 bg-white text-black"
            placeholder="Custom Link char(6-34) (optional)"
          />
        </div>
        {error && <Error message={errors.message} />}

         <DialogFooter className="sm:justify-start mt-4">
          <Button
            disabled={loading}
            onClick={createNewLink}
            className="bg-black hover:bg-black/80 text-white w-full sm:w-auto px-6 py-2 rounded-md "
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
