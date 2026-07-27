"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
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
import { StatusBadge, getStatusType } from "@/components/status-badge";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Scale,
  HeartPulse,
  Droplet,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  useAssessment,
  SugarType,
  isBPElevated,
  isSugarElevated,
  getBPStatus,
  getSugarStatus,
} from "@/lib/assessment-context";
import { useI18n } from "@/lib/i18n-context";
import Link from "next/link";

export default function Step2Page() {
  const router = useRouter();
  const { data, updateData, getBMICategory } = useAssessment();
  const { t } = useI18n();

  // Form state
  const [height, setHeight] = useState<string>(data.height?.toString() || "");
  const [weight, setWeight] = useState<string>(data.weight?.toString() || "");
  const [systolic, setSystolic] = useState<string>(
    data.systolic?.toString() || ""
  );
  const [diastolic, setDiastolic] = useState<string>(
    data.diastolic?.toString() || ""
  );
  const [sugarType, setSugarType] = useState<SugarType | null>(data.sugarType);
  const [sugarValue, setSugarValue] = useState<string>(
    data.sugarValue?.toString() || ""
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bpSkipped, setBpSkipped] = useState(false);
  const [sugarSkipped, setSugarSkipped] = useState(false);

  // Computed BMI
  const bmi = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return null;
    const heightM = h / 100;
    return Math.round((w / (heightM * heightM)) * 10) / 10;
  }, [height, weight]);

  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  // BP status
  const bpStatus = useMemo(() => {
    const sys = parseFloat(systolic);
    const dia = parseFloat(diastolic);
    if (!sys || !dia) return null;
    return getBPStatus(sys, dia);
  }, [systolic, diastolic]);

  // Sugar status
  const sugarStatus = useMemo(() => {
    const val = parseFloat(sugarValue);
    if (!sugarType || !val) return null;
    return getSugarStatus(sugarType, val);
  }, [sugarType, sugarValue]);

  // Check if we should block
  const shouldBlock = useMemo(() => {
    const sys = parseFloat(systolic);
    const dia = parseFloat(diastolic);
    const sugar = parseFloat(sugarValue);

    const bpHigh = isBPElevated(sys || null, dia || null);
    const sugarHigh = isSugarElevated(sugarType, sugar || null);

    return bpHigh || sugarHigh;
  }, [systolic, diastolic, sugarType, sugarValue]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!height) {
      newErrors.height = t("step2_height_error");
    } else {
      const h = parseFloat(height);
      if (isNaN(h) || h < 50 || h > 300) {
        newErrors.height = t("step2_height_error_invalid");
      }
    }

    if (!weight) {
      newErrors.weight = t("step2_weight_error");
    } else {
      const w = parseFloat(weight);
      if (isNaN(w) || w < 10 || w > 500) {
        newErrors.weight = t("step2_weight_error_invalid");
      }
    }

    // BP validation (optional, but if one is entered, both are needed)
    if (systolic || diastolic) {
      if (!systolic) newErrors.systolic = t("step2_bp_systolic_error");
      if (!diastolic) newErrors.diastolic = t("step2_bp_diastolic_error");
    }

    // Sugar validation (optional, but if type is selected, value is needed)
    if (sugarType && !sugarValue) {
      newErrors.sugarValue = t("step2_sugar_value_error");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;

    const sys = parseFloat(systolic) || null;
    const dia = parseFloat(diastolic) || null;
    const sugar = parseFloat(sugarValue) || null;

    updateData({
      height: parseFloat(height),
      weight: parseFloat(weight),
      systolic: sys,
      diastolic: dia,
      sugarType,
      sugarValue: sugar,
      bpEntered: !!(sys && dia),
      sugarEntered: !!(sugarType && sugar),
      bpElevated: isBPElevated(sys, dia),
      sugarElevated: isSugarElevated(sugarType, sugar),
    });

    if (shouldBlock) {
      router.push("/assessment/step-2/advisory");
    } else {
      router.push("/assessment/step-3");
    }
  };

  const clearBP = () => {
    setSystolic("");
    setDiastolic("");
    setBpSkipped(true);
  };

  const enableBP = () => {
    setBpSkipped(false);
  };

  const clearSugar = () => {
    setSugarType(null);
    setSugarValue("");
    setSugarSkipped(true);
  };

  const enableSugar = () => {
    setSugarSkipped(false);
  };

  return (
    <AppShell currentStep={2} totalSteps={4}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {t("step2_title")}
          </h1>
          <p className="text-sm text-slate-600 mt-1">{t("step2_subtitle")}</p>
        </div>

        {/* Card 1: Height & Weight */}
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              {t("step2_body_title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">
                  {t("step2_height_label")}{" "}
                  <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="height"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("step2_height_placeholder")}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={errors.height ? "border-rose-500" : ""}
                />
                {errors.height && (
                  <p className="text-xs text-rose-600">{errors.height}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">
                  {t("step2_weight_label")}{" "}
                  <span className="text-rose-500">*</span>
                </Label>
                <Input
                  id="weight"
                  type="number"
                  inputMode="decimal"
                  placeholder={t("step2_weight_placeholder")}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={errors.weight ? "border-rose-500" : ""}
                />
                {errors.weight && (
                  <p className="text-xs text-rose-600">{errors.weight}</p>
                )}
              </div>
            </div>

            {/* BMI Result */}
            {bmi && bmiCategory && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    {t("step2_bmi_label")}
                  </span>
                  <StatusBadge
                    status={getStatusType(bmiCategory.color)}
                    label={bmiCategory.label}
                  />
                </div>
                <p className="text-3xl font-semibold tabular-nums text-slate-900">
                  {bmi}
                </p>
                <p className="text-xs text-slate-500">
                  {t("step2_bmi_disclaimer")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 2: Blood Pressure */}
        <Card
          className={`bg-white border shadow-sm ${bpSkipped ? "border-slate-300 bg-slate-50" : "border-slate-200"}`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <HeartPulse
                  className={`w-5 h-5 ${bpSkipped ? "text-slate-400" : "text-emerald-600"}`}
                />
                {t("step2_bp_title")}
              </CardTitle>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                {t("common_optional")}
              </span>
            </div>
            <CardDescription>{t("step2_bp_description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bpSkipped ? (
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-500" />
                    <span className="text-sm text-slate-600">
                      {t("step2_bp_skipped")}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={enableBP}
                    className="text-emerald-600 hover:text-emerald-700 gap-1"
                  >
                    <X className="w-3 h-3" />
                    {t("step2_bp_enter")}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="systolic">{t("step2_bp_systolic")}</Label>
                    <Input
                      id="systolic"
                      type="number"
                      inputMode="numeric"
                      placeholder={t("step2_bp_systolic_placeholder")}
                      value={systolic}
                      onChange={(e) => setSystolic(e.target.value)}
                      className={errors.systolic ? "border-rose-500" : ""}
                    />
                    {errors.systolic && (
                      <p className="text-xs text-rose-600">{errors.systolic}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diastolic">{t("step2_bp_diastolic")}</Label>
                    <Input
                      id="diastolic"
                      type="number"
                      inputMode="numeric"
                      placeholder={t("step2_bp_diastolic_placeholder")}
                      value={diastolic}
                      onChange={(e) => setDiastolic(e.target.value)}
                      className={errors.diastolic ? "border-rose-500" : ""}
                    />
                    {errors.diastolic && (
                      <p className="text-xs text-rose-600">
                        {errors.diastolic}
                      </p>
                    )}
                  </div>
                </div>

                {bpStatus && (
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <span className="text-sm text-slate-700">
                      {t("step2_bp_result")}
                    </span>
                    <StatusBadge
                      status={getStatusType(bpStatus.color)}
                      label={bpStatus.label}
                    />
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearBP}
                  className="text-slate-600 border-slate-300"
                >
                  {t("step2_bp_skip")}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Card 3: Blood Sugar */}
        <Card
          className={`bg-white border shadow-sm ${sugarSkipped ? "border-slate-300 bg-slate-50" : "border-slate-200"}`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Droplet
                  className={`w-5 h-5 ${sugarSkipped ? "text-slate-400" : "text-emerald-600"}`}
                />
                {t("step2_sugar_title")}
              </CardTitle>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                {t("common_optional")}
              </span>
            </div>
            <CardDescription>{t("step2_sugar_description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sugarSkipped ? (
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-slate-500" />
                    <span className="text-sm text-slate-600">
                      {t("step2_sugar_skipped")}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={enableSugar}
                    className="text-emerald-600 hover:text-emerald-700 gap-1"
                  >
                    <X className="w-3 h-3" />
                    {t("step2_sugar_enter")}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>{t("step2_sugar_test_type")}</Label>
                  <Select
                    value={sugarType || ""}
                    onValueChange={(v) => setSugarType(v as SugarType)}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("step2_sugar_test_placeholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rbs">
                        {t("step2_sugar_rbs")}
                      </SelectItem>
                      <SelectItem value="fbs">
                        {t("step2_sugar_fbs")}
                      </SelectItem>
                      <SelectItem value="ppbs">
                        {t("step2_sugar_ppbs")}
                      </SelectItem>
                      <SelectItem value="hba1c">
                        {t("step2_sugar_hba1c")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {sugarType && (
                  <div className="space-y-2">
                    <Label htmlFor="sugarValue">
                      {t("step2_sugar_value")} (
                      {sugarType === "hba1c" ? "%" : "mg/dL"})
                    </Label>
                    <Input
                      id="sugarValue"
                      type="number"
                      inputMode="decimal"
                      placeholder={
                        sugarType === "hba1c"
                          ? t("step2_sugar_value_placeholder_hba1c")
                          : t("step2_sugar_value_placeholder")
                      }
                      value={sugarValue}
                      onChange={(e) => setSugarValue(e.target.value)}
                      className={errors.sugarValue ? "border-rose-500" : ""}
                    />
                    {errors.sugarValue && (
                      <p className="text-xs text-rose-600">
                        {errors.sugarValue}
                      </p>
                    )}
                  </div>
                )}

                {sugarStatus && (
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <span className="text-sm text-slate-700">
                      {t("step2_sugar_result")}
                    </span>
                    <StatusBadge
                      status={getStatusType(sugarStatus.color)}
                      label={sugarStatus.label}
                    />
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSugar}
                  className="text-slate-600 border-slate-300"
                >
                  {t("step2_sugar_skip")}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Warning if elevated */}
        {shouldBlock && (
          <Alert className="bg-rose-50 border-rose-200">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <AlertTitle className="text-rose-900 font-semibold">
              {t("step2_elevated_warning_title")}
            </AlertTitle>
            <AlertDescription className="text-rose-800">
              {t("step2_elevated_warning_description")}
            </AlertDescription>
          </Alert>
        )}

        {/* Navigation */}
        <div className="flex justify-between gap-3 pt-4">
          <Link href="/assessment/step-1">
            <Button variant="outline" className="gap-1">
              <ChevronLeft className="w-4 h-4" />
              {t("common_back")}
            </Button>
          </Link>
          <Button
            onClick={handleNext}
            className="gap-1 bg-blue-700 hover:bg-blue-800"
            disabled={!height || !weight}
          >
            {t("common_next")}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
