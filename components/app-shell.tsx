"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Shield, FileWarning } from "lucide-react";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n-context";

interface AppShellProps {
  children: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  showStepper?: boolean;
}

export function AppShell({
  children,
  currentStep = 0,
  totalSteps = 6,
  showStepper = true,
}: AppShellProps) {
  const { t } = useI18n();
  const progress = currentStep > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_28%),linear-gradient(180deg,#f7fbff_0%,#ffffff_40%,#f8fafc_100%)]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-blue-100/70 bg-white/78 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl">
        <div className="max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/tn-mtm-logo.png"
                alt="Makkalai Thedi Maruthuvam Logo"
                width={34}
                height={34}
                className="h-8 w-8"
              />
              <div className="leading-tight">
                <span className="block text-lg font-semibold tracking-tight text-slate-900 ">
                  {t("app_name")}
                </span>
                <span className="block text-[11px] text-slate-500">
                  {t("app_tagline")}
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              <LanguageSwitcher variant="minimal" />

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 hover:bg-blue-50"
                  >
                    <Shield className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">
                      {t("common_privacy")}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-700" />
                      {t("privacy_dialog_title")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm text-slate-700">
                    <p>
                      <strong>
                        {t("privacy_dialog_what_we_dont_collect")}
                      </strong>{" "}
                      {t("privacy_dialog_what_we_dont_collect_desc")}
                    </p>
                    <p>
                      <strong>{t("privacy_dialog_what_happens")}</strong>{" "}
                      {t("privacy_dialog_what_happens_desc")}
                    </p>
                    <p>
                      <strong>{t("privacy_dialog_pdf")}</strong>{" "}
                      {t("privacy_dialog_pdf_desc")}
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 hover:bg-blue-50"
                  >
                    <FileWarning className="w-4 h-4 mr-1" />
                    <span className="hidden sm:inline">
                      {t("common_disclaimer")}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileWarning className="w-5 h-5 text-amber-600" />
                      {t("disclaimer_dialog_title")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm text-slate-700">
                    <p>{t("disclaimer_dialog_p1")}</p>
                    <p>{t("disclaimer_dialog_p2")}</p>
                    <p>{t("disclaimer_dialog_p3")}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Step indicator */}
          {showStepper && currentStep > 0 && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border-blue-100"
                >
                  {t("common_step_of", {
                    current: currentStep.toString(),
                    total: totalSteps.toString(),
                  })}
                </Badge>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-xl mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
