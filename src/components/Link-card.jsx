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
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-10">
      <div className="overflow-x-auto bg-[#11141b] border border-[#1f1f22] rounded-xl hide-scrollbar">
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
  );
};

export default LinkCard;
