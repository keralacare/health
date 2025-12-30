"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DisclaimerAlert } from "@/components/disclaimer-alert";
import { InterpretationRow } from "@/components/interpretation-row";
import {
  AlertTriangle,
  Building2,
  Download,
  RotateCcw,
  HelpCircle,
} from "lucide-react";
import {
  useAssessment,
  getBPStatus,
  getSugarStatus,
} from "@/lib/assessment-context";
import { useI18n } from "@/lib/i18n-context";

export default function AdvisoryPage() {
  const router = useRouter();
  const { t } = useI18n();
  const { data, resetAssessment, calculateBMI, getBMICategory } =
    useAssessment();

  const bmi = calculateBMI();
  const bmiCategory = bmi ? getBMICategory(bmi) : null;
  const bpStatus = getBPStatus(data.systolic, data.diastolic);
  const sugarStatus = getSugarStatus(data.sugarType, data.sugarValue);

  const handleRestart = () => {
    resetAssessment();
    router.push("/");
  };

  const handleDownload = () => {
    // Generate simple text summary for now
    const summary = `
HEALTH ASSESSMENT - VITALS SUMMARY
Date: ${new Date().toLocaleDateString()}

MEASUREMENTS
${bmi ? `BMI: ${bmi} (${bmiCategory?.label})` : "BMI: Not calculated"}
${data.bpEntered ? `Blood Pressure: ${data.systolic}/${data.diastolic} mmHg (${bpStatus.label})` : "Blood Pressure: Not entered"}
${data.sugarEntered ? `Blood Sugar (${data.sugarType?.toUpperCase()}): ${data.sugarValue} ${data.sugarType === "hba1c" ? "%" : "mg/dL"} (${sugarStatus.label})` : "Blood Sugar: Not entered"}

ADVISORY
Your entered blood pressure or blood sugar is higher than normal.
Please consult a doctor at your nearest health facility for further evaluation.

DISCLAIMER
This tool provides general risk information and is not a diagnosis.
It does not provide treatment advice.
`.trim();

    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "health-vitals-summary.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell currentStep={2} totalSteps={4}>
      <div className="space-y-6">
        {/* Main Advisory Alert */}
        <Alert className="bg-rose-50 border-rose-200">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          <AlertTitle className="text-lg font-semibold text-rose-900">
            {t("advisory_title")}
          </AlertTitle>
          <AlertDescription className="text-rose-800 mt-2">
            {t("advisory_description")}
          </AlertDescription>
        </Alert>

        {/* Measurements Summary */}
        <Card className="bg-white border border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              {t("advisory_measurements_title")}
            </CardTitle>
            <CardDescription>
              {t("advisory_measurements_description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {bmi && bmiCategory && (
              <InterpretationRow label="BMI" value={bmi} status={bmiCategory} />
            )}

            {data.bpEntered && (
              <InterpretationRow
                label={t("step4_measurements_bp")}
                value={`${data.systolic}/${data.diastolic}`}
                unit="mmHg"
                status={bpStatus}
              />
            )}

            {data.sugarEntered && (
              <InterpretationRow
                label={`${t("step4_measurements_sugar")} (${data.sugarType?.toUpperCase()})`}
                value={data.sugarValue || 0}
                unit={data.sugarType === "hba1c" ? "%" : "mg/dL"}
                status={sugarStatus}
              />
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            size="lg"
            asChild
          >
            <Link
              href="/tools/find-jak"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Building2 className="w-5 h-5" />
              {t("advisory_consult_doctor")}
            </Link>
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              {t("advisory_download_measurements")}
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleRestart}>
              <RotateCcw className="w-4 h-4" />
              {t("advisory_restart")}
            </Button>
          </div>
        </div>

        {/* Why am I seeing this? */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full text-slate-600 gap-2">
              <HelpCircle className="w-4 h-4" />
              {t("advisory_why_seeing")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("advisory_why_seeing")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm text-slate-700">
              <p>{t("advisory_why_intro")}</p>
              <p>{t("advisory_why_bp")}</p>
              <p>{t("advisory_why_sugar")}</p>
              <p>{t("advisory_why_conclusion")}</p>
            </div>
          </DialogContent>
        </Dialog>

        <Separator />

        <DisclaimerAlert variant="warning" />
      </div>
    </AppShell>
  );
}
