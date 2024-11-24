import { useState, useEffect, useCallback, useRef } from "react";
import { getPreferenceValues } from "@raycast/api";
import { translations, Language } from "../i18n";
import { useConfig } from "./useConfig";
import { Preferences } from "../types";

type TranslationValue = string | ((searchText?: string, count?: number) => string);

interface TranslationsType {
  [key: string]: TranslationValue | TranslationsType;
}

type Translations = {
  [key in Language]: TranslationsType;
};

export function useTranslation() {
  const { config } = useConfig();
  const [language, setLanguage] = useState<Language>((config?.language as Language) || "en");
  const isInitialMount = useRef(true);

  const t = useCallback(
    (
      key: string,
      params?: {
        searchText?: string;
        count?: number;
        [key: string]: string | number | undefined;
      },
    ): string => {
      const keys = key.split(".");
      let result: any = translations[language];

      for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
          result = result[k];
        } else {
          return key;
        }
      }

      if (typeof result === "function") {
        return result(params?.searchText, params?.count);
      }

      if (typeof result === "string" && params) {
        return Object.entries(params).reduce((str, [key, value]) => str.replace(`{{${key}}}`, String(value)), result);
      }

      return result as string;
    },
    [language],
  );

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const preferences = getPreferenceValues<Preferences>();
        const prefLanguage = preferences.language as Language;
        if (prefLanguage && prefLanguage !== language) {
          setLanguage(prefLanguage);
        }
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
      loadLanguage();
    }
  }, [language]);

  useEffect(() => {
    if (!isInitialMount.current && config?.language && config.language !== language) {
      setLanguage(config.language as Language);
    }
  }, [config?.language]);

  const changeLanguage = useCallback(
    async (newLanguage: Language) => {
      if (newLanguage !== language) {
        setLanguage(newLanguage);
      }
    },
    [language],
  );

  return {
    t,
    language,
    setLanguage: changeLanguage,
  };
}
