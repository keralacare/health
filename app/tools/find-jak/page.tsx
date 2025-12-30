"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Footer } from "@/components/footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n-context";
import {
  Heart,
  ChevronLeft,
  Building2,
  Search,
  Clock,
  Phone,
  Stethoscope,
  CheckCircle2,
  Info,
  ArrowRight,
  Navigation,
  Users,
  Pill,
  Activity,
  MapPin,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import jakDataRaw from "@/data/jak-data.json";
import {
  JAKEntry,
  filterJAKEntries,
  getJAKDisplayName,
  getGoogleMapsUrl,
  hasValidCoordinates,
  findNearbyJAKs,
  formatDistance,
  JAKWithDistance,
} from "@/lib/jak-types";

// Type the imported data
const jakData: JAKEntry[] = jakDataRaw as JAKEntry[];

// Kerala districts for the dropdown
const KERALA_DISTRICTS = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

// JAK Result Card Component
function JAKResultCard({
  jak,
  showDistance = false,
}: {
  jak: JAKEntry | JAKWithDistance;
  showDistance?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const mapsUrl = getGoogleMapsUrl(jak);
  const { t } = useI18n();
  const jakWithDistance = jak as JAKWithDistance;

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <Button
        variant="ghost"
        onClick={() => setExpanded(!expanded)}
        className="w-full h-auto p-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-start justify-between gap-4 w-full">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-slate-900 truncate">
              {getJAKDisplayName(jak)}
            </h4>
            <p className="text-sm text-slate-600 truncate">
              {jak.healthBlock && `${jak.healthBlock}, `}
              {jak.district}
            </p>
            <div className="flex gap-2 mt-1">
              {jak.jakCode && (
                <Badge
                  variant="secondary"
                  className="bg-teal-50 text-teal-700 text-xs"
                >
                  {jak.jakCode}
                </Badge>
              )}
              {showDistance && jakWithDistance.distance !== undefined && (
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 text-xs"
                >
                  {t("tool_jak_distance_away", {
                    distance: formatDistance(jakWithDistance.distance),
                  })}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasValidCoordinates(jak) && (
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-teal-600" />
              </div>
            )}
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </Button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
          {jak.institutionName && jak.institutionName !== jak.jakName && (
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-500">Institution</p>
                <p className="text-sm text-slate-700">{jak.institutionName}</p>
              </div>
            </div>
          )}

          {jak.constituency && (
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-500">Constituency</p>
                <p className="text-sm text-slate-700">{jak.constituency}</p>
              </div>
            </div>
          )}

          {jak.email && (
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <a
                  href={`mailto:${jak.email}`}
                  className="text-sm text-teal-600 hover:underline break-all"
                >
                  {jak.email}
                </a>
              </div>
            </div>
          )}

          {jak.ninid && (
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-500">NIN ID</p>
                <p className="text-sm text-slate-700">{jak.ninid}</p>
              </div>
            </div>
          )}

          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full p-2 bg-teal-50 rounded-lg text-teal-700 hover:bg-teal-100 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t("tool_jak_get_directions")}
              </span>
              <ExternalLink className="w-3 h-3 ml-auto" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function FindJAKPage() {
  const [searchMode, setSearchMode] = useState<"district" | "location">(
    "location"
  );
  const [district, setDistrict] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(25); // Default 25km
  const { t } = useI18n();

  // Filter results based on search criteria
  const searchResults = useMemo(() => {
    if (!hasSearched) return [];

    if (searchMode === "location" && userLocation) {
      return findNearbyJAKs(
        jakData,
        userLocation.lat,
        userLocation.lon,
        searchRadius
      );
    } else {
      return filterJAKEntries(jakData, district, searchQuery);
    }
  }, [
    district,
    searchQuery,
    hasSearched,
    searchMode,
    userLocation,
    searchRadius,
  ]);

  // Get count by district for display
  const districtCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    jakData.forEach((jak) => {
      const dist = jak.district || "Unknown";
      counts[dist] = (counts[dist] || 0) + 1;
    });
    return counts;
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(t("tool_jak_location_error"));
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setSearchMode("location");
        setLocationLoading(false);
        setHasSearched(true);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationError(t("tool_jak_location_error"));
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSearch = () => {
    setSearchMode("district");
    setUserLocation(null);
    setLocationError(null);
    setHasSearched(true);
  };

  const handleClearSearch = () => {
    setDistrict("");
    setSearchQuery("");
    setHasSearched(false);
    setSearchMode("district");
    setUserLocation(null);
    setLocationError(null);
  };

  const hasData = jakData.length > 0;

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-b from-emerald-500 to-teal-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                {t("app_name")}
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-teal-100 text-teal-700 border-teal-200"
              >
                <Building2 className="w-3 h-3 mr-1" />
                {t("tool_jak_badge")}
              </Badge>
              <LanguageSwitcher variant="minimal" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {t("common_back_to_home")}
        </Link>

        <div className="space-y-6">
          {/* Hero */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-b from-teal-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/30">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
              {t("tool_jak_title")}
            </h1>
            <p className="text-slate-600">{t("tool_jak_subtitle")}</p>
            {hasData && (
              <p className="text-sm text-teal-600 mt-2 font-medium">
                {jakData.length - 1} JAKs available across Kerala
              </p>
            )}
          </div>

          {/* What is JAK */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-teal-600" />
                {t("tool_jak_what_is_title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                {t("tool_jak_what_is_description_1")}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {t("tool_jak_what_is_description_2")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {t("tool_jak_services_title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Stethoscope, text: t("tool_jak_service_opd") },
                  { icon: Activity, text: t("tool_jak_service_ncd") },
                  { icon: Pill, text: t("tool_jak_service_medicines") },
                  { icon: Users, text: t("tool_jak_service_family") },
                  { icon: Clock, text: t("tool_jak_service_lab") },
                  { icon: Phone, text: t("tool_jak_service_teleconsult") },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-50"
                  >
                    <item.icon className="w-4 h-4 text-teal-600" />
                    <span className="text-sm text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="w-5 h-5 text-teal-600" />
                {t("tool_jak_search_title")}
              </CardTitle>
              <CardDescription>
                {t("tool_jak_search_description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {locationError && (
                <Alert className="bg-red-50 border-red-200">
                  <Info className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800 font-semibold">
                    {t("tool_jak_location_error")}
                  </AlertTitle>
                  <AlertDescription className="text-red-700">
                    {t("tool_jak_location_error_desc")}
                  </AlertDescription>
                </Alert>
              )}

              <Tabs
                value={searchMode}
                onValueChange={(value) => {
                  setSearchMode(value as "district" | "location");
                  if (value === "district") {
                    setUserLocation(null);
                    setLocationError(null);
                  }
                  setHasSearched(false);
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="location"
                    className="gap-1.5 text-xs sm:text-sm"
                  >
                    <Navigation className="w-4 h-4 shrink-0" />
                    <span className="truncate">
                      {t("tool_jak_search_mode_location")}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="district"
                    className="gap-1.5 text-xs sm:text-sm"
                  >
                    <Search className="w-4 h-4 shrink-0" />
                    <span className="truncate">
                      {t("tool_jak_search_mode_district")}
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {searchMode === "district" && (
                <>
                  <div className="space-y-2">
                    <Label>{t("tool_jak_select_district")}</Label>
                    <Select value={district} onValueChange={setDistrict}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("tool_jak_choose_district")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {KERALA_DISTRICTS.map((d) => (
                          <SelectItem key={d} value={d.toLowerCase()}>
                            {d}
                            {hasData && districtCounts[d] && (
                              <span className="text-slate-400 ml-2">
                                ({districtCounts[d]})
                              </span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="search">
                      {t("tool_jak_search_by_name")}
                    </Label>
                    <Input
                      id="search"
                      type="text"
                      placeholder={t("tool_jak_search_placeholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSearch}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 gap-2"
                      disabled={!hasData || !district}
                    >
                      <Search className="w-4 h-4" />
                      {t("common_search")}
                    </Button>
                    {hasSearched && (
                      <Button
                        onClick={handleClearSearch}
                        variant="outline"
                        className="border-slate-300"
                      >
                        {t("tool_jak_clear")}
                      </Button>
                    )}
                  </div>
                </>
              )}

              {searchMode === "location" && (
                <div className="space-y-4">
                  <div className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-slate-700">
                        {t("tool_jak_search_radius")}
                      </Label>
                      <Badge
                        variant="secondary"
                        className="bg-teal-100 text-teal-700 font-semibold"
                      >
                        {searchRadius}km
                      </Badge>
                    </div>
                    <Slider
                      value={[searchRadius]}
                      onValueChange={(value) => setSearchRadius(value[0])}
                      min={5}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>5km</span>
                      <span className="text-slate-600">
                        {t("tool_jak_adjust_radius")}
                      </span>
                      <span>100km</span>
                    </div>
                  </div>

                  {!userLocation ? (
                    <Button
                      onClick={requestLocation}
                      disabled={locationLoading || !hasData}
                      className="w-full bg-teal-600 hover:bg-teal-700 gap-2"
                    >
                      {locationLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t("tool_jak_finding_location")}
                        </>
                      ) : (
                        <>
                          <Navigation className="w-4 h-4" />
                          {t("tool_jak_use_location")}
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                        <p className="text-sm text-teal-800 font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {t("tool_jak_nearby_results")}
                        </p>
                        <p className="text-xs text-teal-600 mt-1">
                          {t("tool_jak_within_radius", {
                            radius: searchRadius,
                          })}
                        </p>
                      </div>
                      <Button
                        onClick={handleClearSearch}
                        variant="outline"
                        className="w-full border-slate-300"
                      >
                        {t("tool_jak_clear")}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {hasSearched && hasData && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-slate-900">
                        {t("tool_jak_results_title")}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-teal-50 text-teal-700"
                      >
                        {searchResults.length} {t("tool_jak_results_found")}
                      </Badge>
                    </div>

                    {searchResults.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                          <Search className="w-6 h-6 text-slate-400" />
                        </div>
                        <p className="text-slate-600 text-sm">
                          {t("tool_jak_results_none")}
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                          {t("tool_jak_results_none_hint")}
                        </p>
                      </div>
                    ) : (
                      <div className="h-[50vh] max-h-125 overflow-y-auto -mx-6 px-6">
                        <div className="space-y-3">
                          {searchResults.slice(0, 100).map((jak) => (
                            <JAKResultCard
                              key={jak.id}
                              jak={jak}
                              showDistance={searchMode === "location"}
                            />
                          ))}
                          {searchResults.length > 100 && (
                            <p className="text-center text-sm text-slate-500 py-3 bg-slate-50 rounded-lg border border-slate-200">
                              {t("tool_jak_results_limit")}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Alternative Options */}
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                {t("tool_jak_other_ways_title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {t("tool_jak_helpline_title")}
                  </p>
                  <p className="text-sm text-slate-600">
                    {t("tool_jak_helpline_description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {t("tool_jak_asha_title")}
                  </p>
                  <p className="text-sm text-slate-600">
                    {t("tool_jak_asha_description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {t("tool_jak_phc_title")}
                  </p>
                  <p className="text-sm text-slate-600">
                    {t("tool_jak_phc_description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operating Hours */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-600" />
                {t("tool_jak_hours_title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">
                    {t("tool_jak_hours_weekday")}
                  </span>
                  <span className="font-medium text-slate-900">
                    {t("tool_jak_hours_weekday_time")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">
                    {t("tool_jak_hours_emergency")}
                  </span>
                  <span className="font-medium text-slate-900">
                    {t("tool_jak_hours_emergency_time")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">
                    {t("tool_jak_hours_sunday")}
                  </span>
                  <span className="font-medium text-slate-500">
                    {t("tool_jak_hours_sunday_time")}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                {t("tool_jak_hours_note")}
              </p>
            </CardContent>
          </Card>

          {/* What to Bring */}
          <Card className="bg-teal-50 border-teal-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-teal-900">
                {t("tool_jak_bring_title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  t("tool_jak_bring_1"),
                  t("tool_jak_bring_2"),
                  t("tool_jak_bring_3"),
                  t("tool_jak_bring_4"),
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-teal-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Separator />

          {/* Full Assessment CTA */}
          <Card className="bg-linear-to-b from-emerald-500 to-teal-600 border-0 text-white">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">
                  {t("tool_jak_cta_title")}
                </h3>
                <p className="text-emerald-100 text-sm">
                  {t("tool_jak_cta_description")}
                </p>
                <Link href="/assessment/step-1">
                  <Button
                    variant="secondary"
                    className="bg-white text-emerald-700 hover:bg-emerald-50 gap-2"
                  >
                    {t("tool_jak_cta_Button")}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
