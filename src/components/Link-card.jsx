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
        <div className="w-full max-w-7xl mt-8 lg:mt-12 mx-auto font-sans">
          <div className="overflow-x-auto bg-secondary border border-border rounded-lg hide-scrollbar shadow-sm">
            <table className="min-w-full text-left text-base lg:text-lg text-foreground">
              <thead className="font-medium border-b border-border hidden sm:table-header-group">
                <tr>
                  <th className="px-6 py-4 text-left text-base lg:text-lg font-medium">Title</th>
                  <th className="px-6 py-4 text-left text-base lg:text-lg font-medium">Original URL</th>
                  <th className="px-6 py-4 text-left text-base lg:text-lg font-medium">Short URL</th>
                  <th className="px-6 py-4 text-left text-base lg:text-lg font-medium">QR Code</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                <tr className="hover:bg-secondary transition-colors">
                  <td className="px-6 py-4 text-xl lg:text-2xl font-medium whitespace-nowrap">
                    <Link to={`/link/${url?.id}`} className="hover:underline">
                      {url?.title}
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-base lg:text-lg break-all cursor-pointer hover:underline">
                    <Link to={`/link/${url?.id}`}>{url?.original_url}</Link>
                  </td>

                  <td className="px-6 py-4 text-base break-all hover:underline">
                    <Link to={`/link/${url?.id}`}>
                      {`${locationOrigin}/${url?.custom_url || url?.short_url}`}
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    <Link to={`/link/${url?.id}`}>
                      <img
                        src={url?.qr}
                        className="h-32 w-32 object-contain mx-auto sm:mx-0 rounded-lg border border-border p-2 bg-background"
                        alt="QR code"
                      />
                    </Link>
                  </td>
                </tr>

                {/* Action Row + Date */}
                <tr>
                  <td colSpan="4" className="">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 p-1">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              `${locationOrigin}/${url?.custom_url || url?.short_url
                              }`
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>

                        <Button onClick={downloadImage} variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          onClick={() => fnDelete().then(() => fetchUrls())}
                        >
                          {loadingDelete ? (
                            <BeatLoader size={5} color="currentColor" />
                          ) : (
                            <Trash className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="text-muted-foreground text-base lg:text-lg px-6 py-3 whitespace-nowrap">
                        <span className="font-medium text-secondary-foreground mr-2 text-base lg:text-lg">
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
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-secondary border border-border rounded-xl shadow-sm font-sans">
          {/* QR Image aligned to start */}
          <div className="flex justify-start items-start">
            <img
              src={url?.qr}
              className="h-32 w-32 object-contain rounded-lg border border-border p-2 bg-background"
            />
          </div>

          {/* URL Details */}
          <div className="flex flex-col flex-1 gap-2 text-foreground">
            <Link
              to={`/link/${url?.id}`}
              className="text-xl lg:text-2xl font-medium hover:underline break-words leading-tight"
            >
              {url?.title || "Untitled"}
            </Link>

            <span className="break-words text-base lg:text-lg hover:underline mb-4 leading-relaxed">
              https://trimrr.in/{url?.custom_url || url?.short_url}
            </span>

            <a
              href={url?.original_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base lg:text-lg hover:underline break-words break-all word-break-anywhere mb-4 leading-relaxed"
            >
              <span className="break-all">{url?.original_url}</span>
            </a>

            <span className="text-base lg:text-lg text-muted-foreground">
              {url?.created_at
                ? new Date(url.created_at).toLocaleString()
                : "N/A"}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4">
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
                <BeatLoader size={5} color="currentColor" />
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
