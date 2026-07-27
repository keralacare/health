"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n-context";

interface ResourceLink {
  label: string;
  link: string;
}

export function Footer() {
  const { t } = useI18n();

  const resources: ResourceLink[] = [
    {
      label: t("footer_resource_1") || "Health and Family Welfare Department",
      link: "https://www.tnhealth.tn.gov.in/",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#08152f] text-white py-10 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.16),_transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" />
      <div className="container mx-auto max-w-6xl px-5 md:px-10">
        <div className="relative flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Image
              src="/tn-government-logo.webp"
              alt="Tamil Nadu Government Logo"
              width={120}
              height={120}
              className="mx-auto md:mx-0 drop-shadow-[0_20px_45px_rgba(0,0,0,0.25)]"
            />
            <p className="text-sm text-blue-100/80 max-w-xs text-center md:text-left">
              {t("app_tagline")}
            </p>
            {resources.map((link) => (
              <a
                href={link.link}
                key={link.label}
                className="text-sm text-blue-200 hover:text-white items-center md:items-end text-center md:text-left transition-all duration-200 ease-in-out hover:underline hover:underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right">
            <Image
              src="/tn-mtm-logo.png"
              alt="Makkalai Thedi Maruthuvam Logo"
              width={95}
              height={95}
              className="mb-4 md:mb-0 object-contain"
            />
            <div className="text-sm text-slate-100 mt-4 md:mt-6 max-w-sm md:max-w-md leading-6">
              <div dangerouslySetInnerHTML={{ __html: t("footer_text") }} />
            </div>
            <div className="text-sm text-white mt-4 md:mt-6 font-semibold">
              {t("footer_developed_by")}
            </div>
            <div>
              <p className="text-xs text-blue-100/80 text-center md:text-right mt-2 max-w-sm">
                {t("footer_disclaimer")}
                <br />
                {t("footer_consult_advice")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
