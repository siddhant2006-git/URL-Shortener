/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/Button";
import useFetch from "@/hooks/Use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
  const locationOrigin =
    typeof window !== "undefined" ? window.location.origin : "";

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id);

  return (
    <>
      <div className="hidden lg:block">
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-10">
          <div className="overflow-x-auto  bg-[#1a1d24] border border-[#1f1f22] rounded-xl hide-scrollbar">
            <table className="min-w-full text-left text-sm text-white">
              <thead className="text-gray-400 border-b border-gray-700 hidden sm:table-header-group">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Original URL</th>
                  <th className="px-6 py-4">Short URL</th>
                  <th className="px-6 py-4">Date Created</th>
                  <th className="px-6 py-4">QR Code</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800 ">
                <tr className="flex flex-col sm:table-row">
                  <td className="text-lg md:text-2xl font-semibold mb-2 md:mb-4 px-6 py-4 whitespace-nowrap">
                    <Link to={`/link/${url?.id}`}>{url?.title}</Link>
                  </td>

                  <td className="px-6  py-4 whitespace-nowrap text-blue-300 cursor-pointer break-all">
                    <Link to={`/link/${url?.id}`}>{url?.original_url}</Link>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-blue-300  break-all">
                    <Link to={`/link/${url?.id}`}>
                      {`${locationOrigin}/${url?.custom_url || url?.short_url}`}
                    </Link>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-gray-300 cursor-pointer">
                    <Link to={`/link/${url?.id}`}>
                      {new Date(url?.created_at).toLocaleString()}
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <Link to={`/link/${url?.id}`}>
                      <img
                        src={url?.qr}
                        className="h-28 w-28 object-contain mx-auto sm:mx-0"
                        alt="QR code"
                      />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start ml-4 mb-4">
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${locationOrigin}/${url?.custom_url || url?.short_url}`
                  )
                }
              >
                <Copy className="h-4 w-4" />
              </Button>

              <Button onClick={downloadImage}>
                <Download className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                onClick={() => fnDelete().then(() => fetchUrls())}
              >
                {loadingDelete ? (
                  <BeatLoader size={5} color="white" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="flex flex-col md:flex-row gap-5 p-4 bg-[#1a1d24] border border-[#1f1f22]  rounded-lg">
          <img
            src={url?.qr}
            className="h-28 w-28 object-contain mx-auto sm:mx-0"
            alt="qr code"
          />
          <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
            <span className="text-lg md:text-2xl font-semibold whitespace-nowrap">
              {url?.title}
            </span>
            <span className="whitespace-nowrap text-blue-300  break-all">
              https://trimrr.in/
              {url?.custom_url ? url?.custom_url : url.short_url}
            </span>
            <span className="flex items-center gap-1 hover:underline cursor-pointer">
              <LinkIcon className="p-1" />
              {url?.original_url}
            </span>
            <span className="flex items-end font-extralight text-sm flex-1">
              {new Date(url?.created_at).toLocaleString()}
            </span>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://trimrr.in/${url?.short_url}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={() => fnDelete().then(() => fetchUrls())}
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkCard;
