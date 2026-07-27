"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  ClipboardCheck,
  Activity,
  Utensils,
  ChevronRight,
  Shield,
  HeartPulse,
  Droplet,
  ArrowRight,
  Ribbon,
  IdCard,
  Building2,
} from "lucide-react";
import { useAssessment } from "@/lib/assessment-context";
import { useI18n } from "@/lib/i18n-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Footer } from "@/components/footer";
import Title from "@/components/ui/title";
import { recordEvent } from "@/lib/rum";

export default function LandingPage() {
  const { resetAssessment } = useAssessment();
  const { t } = useI18n();

  const heroHighlights = [
    {
      icon: Building2,
      title: t("hero_trust_programme"),
      description: t("hero_trust_programme_desc"),
    },
    {
      icon: Shield,
      title: t("stats_secure"),
      description: t("hero_trust_privacy_desc"),
    },
    {
      icon: ClipboardCheck,
      title: t("hero_trust_workflow"),
      description: t("hero_trust_workflow_desc"),
    },
  ];

  const handleStartAssessment = () => {
    console.log("start_assessment_click");
    recordEvent("start_assessment_click");
    resetAssessment();
  };

  const handleToolClick = (toolName: string) => {
    recordEvent(`tool_click_${toolName}`);
  };

  const scrollToTools = (e: React.MouseEvent) => {
    e.preventDefault();
    recordEvent("scroll_to_tools_click");
    const toolsSection = document.getElementById("tools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#ffffff_46%,#f7faff_100%)]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-blue-700/70 bg-blue-800/95 text-white backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="rounded-full bg-white p-1 shadow-sm ring-1 ring-white/30">
                <Image
                  src="/tn-mtm-logo.png"
                  alt="Makkalai Thedi Maruthuvam Logo"
                  width={42}
                  height={42}
                  className="h-9 w-9 object-contain sm:h-10.5 sm:w-10.5"
                />
              </div>
              <div className="min-w-0 leading-tight">
                <span className="block text-sm font-bold tracking-tight text-white sm:text-xl">
                  Makkalai Thedi Maruthuvam
                </span>
                <p className="-mt-0.5 text-xs text-blue-100/90">
                  NCD Cascade Care in Tamil Nadu
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="#tools"
                className="text-sm text-blue-100 transition-colors hover:text-white"
              >
                {t("common_tools")}
              </Link>
              <Link
                href="#assessment"
                className="text-sm text-blue-100 transition-colors hover:text-white"
              >
                {t("common_assessment")}
              </Link>
              <LanguageSwitcher
                variant="minimal"
                className="text-blue-100 hover:bg-white/10 hover:text-white"
              />
              <Link href="/assessment/step-1" onClick={handleStartAssessment}>
                <Button className="bg-white text-blue-800 shadow-lg shadow-blue-950/20 hover:bg-blue-50">
                  {t("common_start_assessment")}
                </Button>
              </Link>
            </nav>

            {/* Mobile language switcher */}
            <div className="shrink-0 md:hidden">
              <LanguageSwitcher
                variant="minimal"
                className="text-blue-100 hover:bg-white/10 hover:text-white"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-8 pb-12 sm:pt-10 md:pt-14 md:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.10),transparent_30%)]" />
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 text-center sm:space-y-7">
            <div className="inline-flex items-center gap-2 self-center rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-xs text-slate-700 shadow-sm backdrop-blur sm:text-sm lg:self-start">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              {t("hero_badge")}
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-800 sm:text-sm">
                  {t("hero_supporting_title")}
                </p>
                <h1 className="mx-auto max-w-[11ch] text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl md:text-6xl lg:max-w-none lg:text-7xl">
                  {t("app_name")}
                  <span className="block bg-linear-to-r from-blue-800 via-sky-700 to-cyan-600 bg-clip-text text-transparent">
                    {t("hero_title_highlight")}
                  </span>
                </h1>
              </div>
              <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600">
                {t("hero_supporting_description")}
              </p>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                {t("hero_description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/assessment/step-1" onClick={handleStartAssessment}>
                <Button
                  size="lg"
                  className="w-full gap-2 rounded-xl bg-blue-800 px-6 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-900 sm:w-auto"
                >
                  {t("hero_cta_primary")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-2 rounded-xl border-slate-200 bg-white/80 px-6 text-slate-800 shadow-sm hover:bg-slate-50 sm:w-auto"
                onClick={scrollToTools}
              >
                <Calculator className="h-5 w-5" />
                {t("hero_cta_secondary")}
              </Button>
            </div>

            <div className="grid gap-3 rounded-3xl border border-slate-200 bg-white/75 p-3 shadow-sm md:grid-cols-3">
              {heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white px-4 py-4 text-left"
                >
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chief Minister Section */}
      <section id="cm-legacy-of-compassion" className="hidden">
        <div className="bg-white shadow-md rounded-lg max-w-6xl sm:mx-auto mx-2 my-4">
          <div className="container mx-auto p-4 lg:p-0">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-y-8">
                <div className="w-full md:w-1/3 xl:rounded-lg overflow-hidden -mt-10">
                  <Image
                    src="/cm-portrait.png"
                    alt="Chief Minister"
                    width={346}
                    height={368}
                    className="grayscale"
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-4 md:pr-10">
                  <Title>{t("legacy_title")}</Title>
                  <blockquote className="text-gray-600 leading-relaxed md:pr-16">
                    &ldquo;{t("legacy_quote")}&rdquo;
                  </blockquote>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <cite className="text-primary-800 font-semibold text-lg text-center md:text-left">
                      {t("legacy_author")}
                    </cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hm-legacy-of-compassion" className="pt-20 hidden">
        <div className="bg-white shadow-md rounded-lg max-w-6xl sm:mx-auto mx-2 my-4">
          <div className="container mx-auto p-4 lg:p-0">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-y-8">
                <div className="w-full md:w-1/3 -mt-12 md:order-2 xl:rounded-br-lg overflow-hidden">
                  <Image
                    src="/hm-portrait.png"
                    alt="Health Minister"
                    width={346}
                    height={368}
                    className="lg:w-full"
                  />
                </div>
                <div className="w-full md:w-2/3 space-y-4 md:px-10">
                  <Title>{t("health_minister_title")}</Title>
                  <blockquote className="text-gray-600 leading-relaxed">
                    &ldquo;{t("health_minister_quote")}&rdquo;
                  </blockquote>
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <cite className="text-primary-800 font-semibold text-lg text-center md:text-left">
                      {t("health_minister_author")}
                    </cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-slate-100 text-slate-700 border-slate-200 mb-4">
              {t("tools_section_title")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              {t("tools_title")}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("tools_description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* BMI Calculator */}
            <Link
              href="/tools/bmi-calculator"
              className="group"
              onClick={() => handleToolClick("bmi_calculator")}
            >
              <Card className="h-full bg-linear-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {t("tool_bmi_title")}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {t("tool_bmi_description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-emerald-700 font-medium group-hover:gap-2 transition-all">
                    {t("tool_bmi_cta")}{" "}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* BP Tracker */}
            <Link
              href="/tools/bp-checker"
              className="group"
              onClick={() => handleToolClick("bp_checker")}
            >
              <Card className="h-full bg-linear-to-br from-rose-50 to-pink-50 border-rose-200 hover:shadow-lg hover:shadow-rose-500/10 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-rose-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
                    <HeartPulse className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {t("tool_bp_title")}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {t("tool_bp_description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-rose-700 font-medium group-hover:gap-2 transition-all">
                    {t("tool_bp_cta")} <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Blood Sugar Checker */}
            <Link
              href="/tools/sugar-checker"
              className="group"
              onClick={() => handleToolClick("sugar_checker")}
            >
              <Card className="h-full bg-linear-to-br from-amber-50 to-orange-50 border-amber-200 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                    <Droplet className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {t("tool_sugar_title")}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {t("tool_sugar_description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-amber-700 font-medium group-hover:gap-2 transition-all">
                    {t("tool_sugar_cta")}{" "}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Cancer Screening */}
            <Link
              href="/tools/cancer-screening"
              className="group"
              onClick={() => handleToolClick("cancer_screening")}
            >
              <Card className="h-full bg-linear-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                    <Ribbon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {t("tool_cancer_title")}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {t("tool_cancer_description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-purple-700 font-medium group-hover:gap-2 transition-all">
                    {t("tool_cancer_cta")}{" "}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* UHID Registration */}
            <Link
              href="/tools/uhid-registration"
              className="group"
              onClick={() => handleToolClick("uhid_registration")}
            >
              <Card className="h-full bg-linear-to-br from-sky-50 to-blue-50 border-sky-200 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-sky-500/30 group-hover:scale-110 transition-transform">
                    <IdCard className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {t("tool_uhid_title")}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {t("tool_uhid_description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sky-700 font-medium group-hover:gap-2 transition-all">
                    {t("tool_uhid_cta")}{" "}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Find JAK */}
            <Link
              href="/tools/find-jak"
              className="group"
              onClick={() => handleToolClick("find_jak")}
            >
              <Card className="h-full bg-linear-to-br from-teal-50 to-cyan-50 border-teal-200 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {t("tool_jak_title")}
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    {t("tool_jak_description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-teal-700 font-medium group-hover:gap-2 transition-all">
                    {t("tool_jak_cta")}{" "}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Full Assessment Section */}
      <section
        id="assessment"
        className="py-16 md:py-24 bg-linear-to-b from-slate-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
                {t("assessment_badge")}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
                {t("assessment_title")}
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {t("assessment_description")}
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Calculator,
                    text: t("assessment_feature_bmi"),
                  },
                  { icon: HeartPulse, text: t("assessment_feature_bp") },
                  { icon: ClipboardCheck, text: t("assessment_feature_ncd") },
                  { icon: Activity, text: t("assessment_feature_lifestyle") },
                  { icon: Utensils, text: t("assessment_feature_diet") },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-blue-700" />
                    </div>
                    <span className="text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/assessment/step-1" onClick={handleStartAssessment}>
                <Button
                  size="lg"
                  className="bg-blue-700 hover:bg-blue-800 gap-2"
                >
                  {t("assessment_cta")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-indigo-600/20 rounded-3xl blur-3xl" />
              <Card className="relative bg-white border-slate-200 shadow-2xl shadow-slate-200/50">
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <ClipboardCheck className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">
                    {t("assessment_card_title")}
                  </CardTitle>
                  <CardDescription>
                    {t("assessment_card_subtitle")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: t("assessment_step1_title"),
                      desc: t("assessment_step1_desc"),
                    },
                    {
                      step: 2,
                      title: t("assessment_step2_title"),
                      desc: t("assessment_step2_desc"),
                    },
                    {
                      step: 3,
                      title: t("assessment_step3_title"),
                      desc: t("assessment_step3_desc"),
                    },
                    {
                      step: 4,
                      title: t("assessment_step4_title"),
                      desc: t("assessment_step4_desc"),
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex items-center gap-4 p-3 rounded-lg bg-slate-50"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 bg-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-12 h-12 text-blue-200 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t("privacy_title")}
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            {t("privacy_description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              t("privacy_badge_no_signup"),
              t("privacy_badge_no_data"),
              t("privacy_badge_anonymous"),
            ].map((item, i) => (
              <Badge
                key={i}
                className="bg-blue-700/40 text-white border-blue-500/50 py-1.5 px-3"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
