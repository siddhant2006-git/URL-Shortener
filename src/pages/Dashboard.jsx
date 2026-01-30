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
        <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
          {(loading || loadingClicks) && (
            <BarLoader className="mb-4" width="100%" color="#111" height={4} />
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="rounded-xl bg-background border border-border shadow-sm p-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg lg:text-xl text-foreground font-medium leading-tight">
                  Links Created
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
                  {urls?.length}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-xl bg-background border border-border shadow-sm p-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg lg:text-xl text-foreground font-medium leading-tight">
                  Total Clicks
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
                  {clicks?.length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Heading + CreateLink */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
            <h1 className="text-3xl lg:text-4xl font-medium text-foreground tracking-tight leading-tight">
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
              className="w-full bg-secondary border border-border rounded-lg py-3 lg:py-4 pl-4 pr-12 text-base lg:text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
            <Filter className="absolute top-1/2 right-4 transform -translate-y-1/2 text-muted-foreground" />
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
        <div className="flex flex-col gap-8 px-4 sm:px-6 max-w-7xl mx-auto font-sans">
          {(loading || loadingClicks) && (
            <BarLoader className="mb-4" width="100%" color="#111" height={4} />
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="bg-background border border-border shadow-sm rounded-xl p-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg lg:text-xl text-foreground font-medium leading-tight mb-2">
                  Links Created
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
                  {urls?.length}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background border border-border shadow-sm rounded-xl p-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg lg:text-xl text-foreground font-medium leading-tight mb-2">
                  Total Clicks
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
                  {clicks?.length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Header + Create Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl lg:text-4xl font-medium text-foreground leading-tight">
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
              className="w-full bg-secondary border border-border rounded-lg py-3 lg:py-4 pl-4 pr-12 text-base lg:text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
            <Filter className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground" />
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
