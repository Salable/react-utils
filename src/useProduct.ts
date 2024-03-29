import useSWR from 'swr';
import { useSalableContext } from './Context';

type ProductFeature = {
  name: string;
  displayName: string;
  description: string;
  visibility: string;
  /** Whether the feature should be showcased in the pricing table or not. */
  isPublic: boolean;
  valueType: 'enum' | 'boolean' | 'numeric';
  defaultValue: string;
};

type PlanCurrency = {
  shortName: string;
  longName: string;
  symbol: string;
  price: number;
};

type ProductPlan = {
  name: string;
  displayName: string;
  description: string;
  type: 'Standard' | 'Bespoke' | 'Coming soon';
  trialDays: number;
  licenseType:
    | 'licensed'
    | 'user'
    | 'board'
    | 'perSeat'
    | 'metered'
    | 'customId';
  perSeatAmount: number;
  interval: 'month' | 'year';
  length: number;
  currencies: PlanCurrency[];
  features: ProductFeature[];
};

type ProductData = {
  name: string;
  displayName: string;
  description: string;
  hasPaidPlans: boolean;
  status: 'ACTIVE' | 'DEPRECATED';
  isTest: boolean;
  plans: ProductPlan[];
};

const fetcher = ([url, apiKey]: [string, string]) =>
  fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  }).then((res) => res.json());

/**
 * Returns useful information about the product specified in the
 * `SalableContext`. If you also want deprecated resources to be returned, you
 * can pass in an optional options object with `{ withDeprecated: true}`.
 */
export const useProduct = (options?: {
  withDeprecated: boolean;
}): ProductData | null => {
  const { productUuid, apiKey } = useSalableContext();
  const { data, isLoading } = useSWR(
    [
      `https://api.salable.app/products/${productUuid}/pricingtable?globalSuccessUrl='https://example.com/'&globalCancelUrl='https://example.com/'&globalGranteeId=''&member=''`,
      apiKey,
    ],
    fetcher,
  );

  if (isLoading || typeof data === 'undefined') return null;

  const isDeprecated = (item: any) =>
    options?.withDeprecated || item.status === 'ACTIVE';

  const transformedData: ProductData = {
    name: data.name,
    displayName: data.displayName,
    description: data.description,
    status: data.status,
    hasPaidPlans: data.plans.some((plan: any) => plan.pricingType === 'paid'),
    isTest: data.isTest,
    plans: data.plans.filter(isDeprecated).map((plan: any) => ({
      name: plan.name,
      displayName: plan.displayName,
      description: plan.description,
      type: plan.planType,
      trialDays: plan.trialDays,
      licenseType: plan.licenseType,
      perSeatAmount: plan.perSeatAmount,
      interval: plan.interval,
      length: plan.length,
      currencies: plan.currencies.map((currency: any) => ({
        price: currency.price,
        shortName: currency.currency.shortName,
        longName: currency.currency.longName,
        symbol: currency.currency.symbol,
      })),
      features: plan.features
        .filter((f: any) => isDeprecated(f.feature))
        .map((feature: any) => ({
          name: feature.feature.name,
          displayName: feature.feature.displayName,
          description: feature.feature.description,
          isPublic: feature.feature.visibility === 'public',
          valueType: feature.feature.valueType,
          defaultValue: feature.feature.defaultValue,
        })),
    })),
  };

  return transformedData;
};
