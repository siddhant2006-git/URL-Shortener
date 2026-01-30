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
    <div className="p-4 lg:p-8 bg-white text-black font-sans max-w-7xl mx-auto">
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width="100%" color="#000000" />
      )}

      {/* Title and Created At */}
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl lg:text-4xl font-semibold break-words leading-tight">
          {url?.title}
        </h1>
        <span className="text-base lg:text-lg text-medium-gray">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-light-gray p-6 lg:p-8 rounded-xl shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Short + Original URLs */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Short URL Box */}
            <div className="bg-off-white p-6 rounded-lg border border-light-gray shadow-sm">
              <h3 className="text-base lg:text-lg text-medium-gray mb-3 font-medium">Short URL</h3>
              <a
                href={`${locationOrigin}/${url?.custom_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl lg:text-2xl font-semibold break-all text-black transition-all hover:text-dark-gray leading-tight"
              >
                {`${locationOrigin}/${link}`}
              </a>
            </div>

            {/* Original URL Box */}
            <div className="bg-off-white p-6 rounded-lg border border-light-gray shadow-sm">
              <h3 className="text-base lg:text-lg text-medium-gray mb-3 font-medium">Original URL</h3>
              <a
                href={url?.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-black break-words hover:text-dark-gray leading-relaxed"
              >
                <LinkIcon className="w-5 h-5 mt-1 text-medium-gray flex-shrink-0" />
                <span className="break-all">{url?.original_url}</span>
              </a>
            </div>
          </div>

          {/* Right Side: QR Code */}
          <div className="flex flex-col items-start justify-center gap-3">
            <img
              src={url?.qr}
              alt="QR Code"
              className="w-full max-w-[240px] lg:max-w-[280px] rounded-lg p-3 object-contain border border-light-gray shadow-sm"
            />
            <span className="text-sm lg:text-base text-medium-gray">
              Scan this QR to access
            </span>

            <div className="flex gap-3 mt-2">
              <Button
                onClick={downloadImage}
                className="bg-off-white border border-light-gray text-black flex items-center gap-2 rounded-lg hover:bg-white transition-all text-base lg:text-lg px-4 py-2"
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
                className="bg-off-white border border-light-gray text-black flex items-center gap-2 rounded-lg hover:bg-white transition-all text-base lg:text-lg px-4 py-2"
              >
                {loadingDelete ? (
                  <BeatLoader size={6} color="#000000" />
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

      <div className="max-w-7xl mx-auto py-8">
        <Card className="bg-white border border-light-gray rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl lg:text-4xl font-semibold text-black leading-tight">
              Stats
            </CardTitle>
          </CardHeader>

          {stats && stats.length > 0 ? (
            <CardContent className="flex flex-col gap-6 text-black">
              {/* Total Clicks */}
              <Card className="bg-off-white border border-light-gray rounded-lg shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg lg:text-xl text-medium-gray font-medium">
                    Total Clicks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl lg:text-3xl font-bold leading-tight">{stats.length}</p>
                </CardContent>
              </Card>

              {/* Charts Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <CardTitle className="text-lg lg:text-xl text-medium-gray font-medium mb-3">
                    Location Data
                  </CardTitle>
                  <LocationStats stats={stats} />
                </div>
                <div>
                  <CardTitle className="text-lg lg:text-xl text-medium-gray font-medium mb-3">
                    Device Info
                  </CardTitle>
                  <Device stats={stats} />
                </div>
              </div>
            </CardContent>
          ) : (
            <CardContent className="text-base lg:text-lg text-medium-gray">
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
