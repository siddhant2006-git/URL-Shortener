/* eslint-disable react-hooks/exhaustive-deps */
import CreateLink from "@/components/Create-link";
import Error from "@/components/Error";
import LinkCard from "@/components/Link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "../Context";
import { getClicksforUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/Use-fetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();
  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksforUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <>
      <div className="hidden lg:block">
        <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {(loading || loadingClicks) && (
            <BarLoader className="mb-4" width="100%" color="#111" height={4} />
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="rounded-xl bg-white border border-gray-200 shadow-sm p-4">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl text-black">
                  Links Created
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl sm:text-2xl font-semibold text-black">
                  {urls?.length}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-white border border-gray-200 shadow-sm p-4">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl text-black">
                  Total Clicks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl sm:text-2xl font-semibold text-black">
                  {clicks?.length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Heading + CreateLink */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black tracking-tight leading-snug">
              My Links
            </h1>
            <div className="w-full sm:w-auto">
              <CreateLink />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Filter links"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 sm:py-3 pl-4 pr-12 text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <Filter className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Error Message */}
          {error && <Error message={error?.message} />}

          {/* Link Cards */}
          <div className="grid grid-cols-1 gap-6">
            {(filteredUrls || []).map((url, id) => (
              <LinkCard key={id} url={url} fetchUrls={fnUrls} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile & Small Screens */}
      <div className="block lg:hidden">
        <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-6xl mx-auto">
          {(loading || loadingClicks) && (
            <BarLoader className="mb-4" width="100%" color="#111" height={4} />
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg text-black mb-2">
                  Links Created
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl sm:text-3xl font-bold text-black">
                  {urls?.length}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg text-black mb-2">
                  Total Clicks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl sm:text-3xl font-bold text-black">
                  {clicks?.length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Header + Create Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-black">
              My Links
            </h1>
            <div className="w-full sm:w-auto">
              <CreateLink />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Filter links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 pl-4 pr-12 text-sm sm:text-base text-black focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <Filter className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Error Display */}
          {error && <Error message={error?.message} />}

          {/* Link Cards */}
          <div className="grid grid-cols-1 gap-6">
            {(filteredUrls || []).map((url, i) => (
              <LinkCard key={i} url={url} fetchUrls={fnUrls} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
