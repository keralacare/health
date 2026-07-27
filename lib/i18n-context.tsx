"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useSyncExternalStore,
} from "react";

// Import locale files
import en from "@/locales/en.json";
import ta from "@/locales/ta.json";

// Types
export type Locale = "en" | "ta";

type TranslationKeys = keyof typeof en;
type Translations = Record<string, string>;

const locales: Record<Locale, Translations> = {
  en,
  ta,
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  ta: "தமிழ்",
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (
    key: TranslationKeys | string,
    params?: Record<string, string | number>
  ) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "healthylife-locale";

// Custom hook to safely access localStorage with SSR support
function useLocalStorageLocale(): Locale {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }, []);

  const getSnapshot = useCallback((): Locale => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (saved === "en" || saved === "ta")) {
      return saved;
    }
    return "en";
  }, []);

  const getServerSnapshot = useCallback((): Locale => "en", []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const storedLocale = useLocalStorageLocale();
  const [locale, setLocaleState] = useState<Locale>(storedLocale);

  // Sync with stored locale when it changes
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
  }, []);

  // Translation function with parameter interpolation
  const t = useCallback(
    (
      key: TranslationKeys | string,
      params?: Record<string, string | number>
    ): string => {
      const translations = locales[locale];
      let text = translations[key] || locales.en[key] || key;

      // Replace {{param}} placeholders with actual values
      if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
          text = text.replace(
            new RegExp(`{{${paramKey}}}`, "g"),
            String(value)
          );
        });
      }

      return text;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

// Convenience hook for just the translation function
export function useTranslation() {
  const { t } = useI18n();
  return t;
}
