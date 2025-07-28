/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Copy, Download, Trash } from "lucide-react";
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
        <div className="w-full max-w-[1600px] mt-10 mx-auto">
          <div className="overflow-x-auto  bg-[#1a1d24] border border-[#1f1f22] rounded-xl hide-scrollbar">
            <table className="min-w-full text-left text-sm text-white">
              <thead className="text-gray-400 border-b border-gray-700 hidden sm:table-header-group">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Original URL</th>
                  <th className="px-6 py-4">Short URL</th>
                  <th className="px-6 py-4">QR Code</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800 ">
                <tr>
                  <td className="px-6 py-4 text-lg md:text-2xl font-semibold whitespace-nowrap">
                    <Link to={`/link/${url?.id}`}>{url?.title}</Link>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-blue-300 text-base cursor-pointer break-all">
                    <Link to={`/link/${url?.id}`}>{url?.original_url}</Link>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-blue-300 text-base break-all">
                    <Link to={`/link/${url?.id}`}>
                      {`${locationOrigin}/${url?.custom_url || url?.short_url}`}
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

                {/* Action Row + Date */}
                <tr>
                  <td colSpan="4" className="pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        <Button
                          onClick={() =>
                            navigator.clipboard.writeText(
                              `${locationOrigin}/${
                                url?.custom_url || url?.short_url
                              }`
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

                      <div className="text-gray-300 text-sm  mb-4 px-6 py-4 whitespace-nowrap  cursor-pointer">
                        <span className="text-sm font-medium text-gray-400 mr-2">
                          Date Created:
                        </span>
                        <Link to={`/link/${url?.id}`}>
                          {new Date(url?.created_at).toLocaleString()}
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="flex flex-col md:flex-row gap-5 p-4 bg-[#1a1d24] border border-[#1f1f22] rounded-lg">
          {/* QR Image aligned to start */}
          <div className="flex justify-start items-start">
            <img
              src={url?.qr}
              className="h-28 w-28 object-contain"
              alt="QR code"
            />
          </div>

          {/* URL Details */}
          <div className="flex flex-col flex-1">
            <Link
              to={`/link/${url?.id}`}
              className="text-lg md:text-2xl font-semibold whitespace-nowrap hover:underline"
            >
              {url?.title || "Untitled"}
            </Link>

            <span className="text-blue-300 break-words">
              https://trimrr.in/{url?.custom_url || url?.short_url}
            </span>

            <a
              href={url?.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:underline text-sm mt-1 break-words"
            >
              <span className="break-all">{url?.original_url}</span>
            </a>

            <span className="mt-2 text-sm text-gray-400">
              {url?.created_at
                ? new Date(url.created_at).toLocaleString()
                : "N/A"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 items-start">
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

            <Button variant="ghost" onClick={() => downloadImage(url?.qr)}>
              <Download />
            </Button>

            <Button
              variant="ghost"
              onClick={() => fnDelete().then(() => fetchUrls())}
              disabled={loadingDelete}
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
