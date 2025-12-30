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
  Heart,
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

export default function LandingPage() {
  const { resetAssessment } = useAssessment();
  const { t } = useI18n();

  const handleStartAssessment = () => {
    resetAssessment();
  };

  const scrollToTools = (e: React.MouseEvent) => {
    e.preventDefault();
    const toolsSection = document.getElementById("tools");
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Healthy Life
                </span>
                <p className="text-xs text-slate-500 -mt-0.5">
                  Health & Wellness Tools
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#tools"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {t("common_tools")}
              </Link>
              <Link
                href="#assessment"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {t("common_assessment")}
              </Link>
              <LanguageSwitcher />
              <Link href="/assessment/step-1" onClick={handleStartAssessment}>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  {t("common_start_assessment")}
                </Button>
              </Link>
            </nav>

            {/* Mobile language switcher */}
            <div className="md:hidden">
              <LanguageSwitcher variant="minimal" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-lg.png"
            alt="Doctor Owl examining Turtle - Your Health Companion"
            fill
            className="object-cover object-left"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 lg:bg-linear-to-r from-transparent via-cyan-700/20 to-cyan-700/95 md:to-cyan-800/90" />
        </div>

        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/hero-mobile.png"
            alt="Doctor Owl examining Turtle - Your Health Companion"
            fill
            className="object-cover sm:object-bottom object-center"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-transparent via-cyan-700/20 to-cyan-700/95 md:to-cyan-800/90 " />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-6xl mx-auto flex items-center">
          <div className="ml-auto w-full lg:w-1/2 text-center pt-16 pb-80 sm:pb-120 lg:py-24 px-4 lg:text-left">
            <p className="text-base md:text-2xl lg:text-3xl text-white tracking-wider text-shadow-xs">
              {t("hero_badge")}
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-white text-shadow-xs">
              {t("hero_title")}
            </h1>
            <p className="text-base md:text-lg  ms:max-w-lg text-white mb-4 text-shadow-2xs">
              {t("hero_description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/assessment/step-1" onClick={handleStartAssessment}>
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30 gap-2 w-full sm:w-auto cursor-pointer"
                >
                  {t("hero_cta_primary")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto cursor-pointer"
                onClick={scrollToTools}
              >
                <Calculator className="w-5 h-5" />
                {t("hero_cta_secondary")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="flex items-center gap-4 justify-center max-w-5xl mx-auto px-4">
          <div className="flex-1 h-px bg-gray-300" />
          <div className="flex items-center gap-8">
            <Image
              src="/vibe-4-wellness-logo.png"
              alt="Vibe 4 Wellness Logo"
              width={85}
              height={80}
              className="object-contain"
            />
            <Image
              src="/Kerala-sarkar-Emblem.png"
              alt="Kerala State Logo"
              width={160}
              height={100}
              className="object-contain"
            />
          </div>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
      </section>

      {/* Chief Minister Section */}
      <section id="cm-legacy-of-compassion">
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

      <section id="hm-legacy-of-compassion" className="pt-20">
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
            <Link href="/tools/bmi-calculator" className="group">
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
            <Link href="/tools/bp-checker" className="group">
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
            <Link href="/tools/sugar-checker" className="group">
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
            <Link href="/tools/cancer-screening" className="group">
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
            <Link href="/tools/uhid-registration" className="group">
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
            <Link href="/tools/find-jak" className="group">
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
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 mb-4">
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
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/assessment/step-1" onClick={handleStartAssessment}>
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                >
                  {t("assessment_cta")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-3xl" />
              <Card className="relative bg-white border-slate-200 shadow-2xl shadow-slate-200/50">
                <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
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
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-sm">
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
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-12 h-12 text-emerald-200 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t("privacy_title")}
          </h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-8">
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
                className="bg-emerald-500/30 text-white border-emerald-400/50 py-1.5 px-3"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">
                Healthy Life
              </span>
            </div>
            <p className="text-sm text-center md:text-right">
              {t("footer_disclaimer")}
              <br />
              {t("footer_consult_advice")}
            </p>
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  );
}
