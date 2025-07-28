/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/Button.jsx";
import { UrlState } from "../Context.jsx";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/Use-fetch";
import { Download, LinkIcon, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationStats from "@/components/Location-stats";
import Device from "@/components/Device-stats";

const Link = () => {
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

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!error && loading === false) fnStats();
  }, [loading, error]);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <div className="p-4 lg:p-8">
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width="100%" color="#36d7b7" />
      )}
      {/* Title and Created At */}
      <div className="space-y-1 mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold break-words">
          {url?.title}
        </h1>
        <span className="text-sm text-gray-500">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-[#1a1d24] border border-[#1f1f22] p-6 rounded-xl text-white grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Short + Original URLs */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Short URL Box */}
            <div className="bg-[#11141b] p-5 rounded-lg border border-[#2a2d33] shadow-sm">
              <h3 className="text-sm text-gray-400 mb-2">Short URL</h3>
              <a
                href={`${locationOrigin}/${url?.custom_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl sm:text-2xl font-semibold  break-all transition-all"
              >
                {`${locationOrigin}/${link}`}
              </a>
            </div>

            {/* Original URL Box */}
            <div className="bg-[#11141b] p-5 rounded-lg border border-[#2a2d33] shadow-sm">
              <h3 className="text-sm text-gray-400 mb-2">Original URL</h3>
              <a
                href={url?.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-white  break-words"
              >
                <LinkIcon className="w-4 h-4 mt-1 text-gray-400" />
                <span className="break-all">{url?.original_url}</span>
              </a>
            </div>
          </div>

          {/* Right Side: QR Code */}
          <div className="flex flex-col items-start justify-center gap-3">
            <img
              src={url?.qr}
              alt="QR Code"
              className="w-full max-w-[220px] rounded-md p-2 object-contain"
            />
            <span className="text-xs text-gray-400">
              Scan this QR to access
            </span>

            <div className="flex gap-3">
              <Button
                onClick={downloadImage}
                className="bg-[#1a1d24] border border-[#1f1f22] text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>

              <Button
                variant="ghost"
                onClick={() =>
                  fnDelete().then(() => {
                    navigate("/dashboard");
                  })
                }
                disabled={loadingDelete}
                className="bg-[#1a1d24] border border-[#1f1f22] flex items-center gap-2"
              >
                {loadingDelete ? (
                  <BeatLoader size={6} color="#f87171" />
                ) : (
                  <>
                    <Trash className="w-4 h-4" />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-9xl mx-auto py-4">
        <Card className="bg-[#1a1d24] border border-[#1f1f22] rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-semibold text-white">
              Stats
            </CardTitle>
          </CardHeader>

          {stats && stats.length > 0 ? (
            <CardContent className="flex flex-col gap-6 text-white">
              {/* Total Clicks */}
              <Card className="bg-[#11141b] border border-[#2a2d33]">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-400">
                    Total Clicks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stats.length}</p>
                </CardContent>
              </Card>

              {/* Charts Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <CardTitle className="text-lg text-gray-400 mb-2">
                    Location Data
                  </CardTitle>
                  <LocationStats stats={stats} />
                </div>
                <div>
                  <CardTitle className="text-lg text-gray-400 mb-2">
                    Device Info
                  </CardTitle>
                  <Device stats={stats} />
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="text-gray-400">
              {loadingStats === false
                ? "No statistics yet"
                : "Loading Statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Link;
