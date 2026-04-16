import type { Locale } from "./i18n";
import type { PlanCode } from "@/db/schema";

type TranslationMap = Record<string, string>;

const localeMap: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
  pt: "pt-BR",
};

export interface PlanPresentation {
  code: PlanCode;
  name: string;
  description: string;
  priceLabel: string;
  badge: string;
  cta: string;
  features: string[];
  featured?: boolean;
}

export const defaultPlanCode: PlanCode = "trial";

function formatUsd(amount: number, locale: Locale) {
  return new Intl.NumberFormat(localeMap[locale], {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getPlanCatalog(
  t: TranslationMap,
  locale: Locale,
): PlanPresentation[] {
  return [
    {
      code: "trial",
      name: t.pricingPlanTrialName,
      description: t.pricingPlanTrialDesc,
      priceLabel: formatUsd(0.99, locale),
      badge: t.pricingPlanTrialBadge,
      cta: t.pricingPlanTrialCta,
      features: [
        t.pricingPlanTrialFeature1,
        t.pricingPlanTrialFeature2,
        t.pricingPlanTrialFeature3,
        t.pricingPlanTrialFeature4,
      ],
    },
    {
      code: "plus",
      name: t.pricingPlanPlusName,
      description: t.pricingPlanPlusDesc,
      priceLabel: formatUsd(19, locale),
      badge: t.pricingPlanPlusBadge,
      cta: t.pricingPlanPlusCta,
      features: [
        t.pricingPlanPlusFeature1,
        t.pricingPlanPlusFeature2,
        t.pricingPlanPlusFeature3,
        t.pricingPlanPlusFeature4,
      ],
    },
    {
      code: "teams",
      name: t.pricingPlanTeamsName,
      description: t.pricingPlanTeamsDesc,
      priceLabel: formatUsd(49, locale),
      badge: t.pricingPlanTeamsBadge,
      cta: t.pricingPlanTeamsCta,
      features: [
        t.pricingPlanTeamsFeature1,
        t.pricingPlanTeamsFeature2,
        t.pricingPlanTeamsFeature3,
        t.pricingPlanTeamsFeature4,
      ],
      featured: true,
    },
    {
      code: "pro",
      name: t.pricingPlanProName,
      description: t.pricingPlanProDesc,
      priceLabel: formatUsd(199, locale),
      badge: t.pricingPlanProBadge,
      cta: t.pricingPlanProCta,
      features: [
        t.pricingPlanProFeature1,
        t.pricingPlanProFeature2,
        t.pricingPlanProFeature3,
        t.pricingPlanProFeature4,
      ],
    },
  ];
}

export function getPlanByCode(
  code: PlanCode,
  t: TranslationMap,
  locale: Locale,
) {
  return (
    getPlanCatalog(t, locale).find((plan) => plan.code === code) ??
    getPlanCatalog(t, locale)[0]
  );
}
