import { renderHook, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { type Schemas } from '../types';
import { SalableContextProvider, type SalableContextData } from '../Context';
import useProduct from '../useProduct';

type WrapperProps = {
  children: React.ReactNode;
};

const createWrapper =
  (contextOverrides?: Partial<SalableContextData>) =>
  ({ children }: WrapperProps) => (
    <SalableContextProvider
      value={{ apiKey: '1', productUuid: '2', ...contextOverrides }}
    >
      {children}
    </SalableContextProvider>
  );

const mockResponseData: any = {
  uuid: 'bb775c7a-a527-46b0-9f5e-bf74cc3c9331',
  name: 'Delete Card Power Up 2',
  description: '',
  logoUrl: null,
  displayName: 'Delete Card Power Up',
  organisation: 'org_2U9bqGrOToUJ5ZnhtzqqfPte5t6',
  status: 'ACTIVE',
  paid: true,
  organisationPaymentIntegrationUuid: 'b16e3b5c-ad47-454e-b646-81e1e036a9c9',
  paymentIntegrationProductId: 'prod_Oij2IK2hI07SKE',
  appType: 'trello',
  updatedAt: '2023-09-28T10:36:24.164Z',
  isTest: true,
  features: [
    {
      uuid: '315d9595-b775-4a5e-b7af-878d423a914a',
      name: 'test',
      description: '',
      displayName: 'test',
      variableName: 'test',
      status: 'ACTIVE',
      visibility: 'public',
      valueType: 'boolean',
      defaultValue: 'true',
      showUnlimited: false,
      productUuid: 'bb775c7a-a527-46b0-9f5e-bf74cc3c9331',
      updatedAt: '2023-11-06T17:17:05.507Z',
      sortOrder: 0,
    },
  ],
  organisationPaymentIntegration: {
    uuid: 'b16e3b5c-ad47-454e-b646-81e1e036a9c9',
    organisation: 'org_2U9bqGrOToUJ5ZnhtzqqfPte5t6',
    integrationName: 'stripe_existing',
    accountName: 'test',
    accountData: {
      key: '37a0614c71877d248d9e0aa4c1233543185b966f8629e30b085a0fcd4652c3cdaa662b029292556b76f543067cc2a9a39de841ad844532b263aef31809805eb9',
      encryptedData:
        'U2FsdGVkX1+YTaDnvbMy3xVplFJLGP/qgrntAN+W5X23aMCuUZdLup4PZBQhiPhcYR6r4ECT98tVL5VyKDFg7TDCGRMDO9Cbcwc+K6ry/y8TAarMCKKfYWZrJRXfJT8ZDFOz263V4Cq4tlNAAJEsbQ==',
    },
    accountId: 'acct_1NvHX3GI1aVCucx0',
    updatedAt: '2023-09-28T10:33:26.690Z',
    isTest: true,
  },
  currencies: [
    {
      productUuid: 'bb775c7a-a527-46b0-9f5e-bf74cc3c9331',
      currencyUuid: '737df084-7164-4df2-b872-587cb128bb4b',
      defaultCurrency: true,
      currency: {
        uuid: '737df084-7164-4df2-b872-587cb128bb4b',
        shortName: 'EUR',
        longName: 'Euro',
        symbol: '€',
      },
    },
  ],
  plans: [
    {
      uuid: '3d5e3440-f659-4720-95d9-87733effddd5',
      name: 'Pro',
      description: null,
      displayName: 'Pro',
      status: 'ACTIVE',
      isTest: true,
      trialDays: null,
      evaluation: false,
      evalDays: 0,
      organisation: 'org_2U9bqGrOToUJ5ZnhtzqqfPte5t6',
      visibility: 'public',
      licenseType: 'licensed',
      perSeatAmount: 1,
      interval: 'month',
      length: 1,
      active: true,
      planType: 'Standard',
      pricingType: 'paid',
      environment: 'prod',
      paddlePlanId: null,
      productUuid: 'bb775c7a-a527-46b0-9f5e-bf74cc3c9331',
      salablePlan: false,
      updatedAt: '2023-09-28T10:44:13.449Z',
      currencies: [
        {
          planUuid: '3d5e3440-f659-4720-95d9-87733effddd5',
          currencyUuid: '737df084-7164-4df2-b872-587cb128bb4b',
          price: 1000,
          paymentIntegrationPlanId: 'plan_Oij99v9TmJlwqS',
          currency: {
            uuid: '737df084-7164-4df2-b872-587cb128bb4b',
            shortName: 'EUR',
            longName: 'Euro',
            symbol: '€',
          },
        },
      ],
      features: [
        {
          planUuid: '3d5e3440-f659-4720-95d9-87733effddd5',
          featureUuid: '315d9595-b775-4a5e-b7af-878d423a914a',
          value: 'true',
          enumValueUuid: null,
          isUnlimited: false,
          isUsage: false,
          pricePerUnit: null,
          minUsage: null,
          maxUsage: null,
          updatedAt: '2023-11-06T17:17:05.820Z',
          feature: {
            uuid: '315d9595-b775-4a5e-b7af-878d423a914a',
            name: 'test',
            description: '',
            displayName: 'test',
            variableName: 'test',
            status: 'ACTIVE',
            visibility: 'public',
            valueType: 'boolean',
            defaultValue: 'true',
            showUnlimited: false,
            productUuid: 'bb775c7a-a527-46b0-9f5e-bf74cc3c9331',
            updatedAt: '2023-11-06T17:17:05.507Z',
            sortOrder: 0,
          },
          enumValue: null,
        },
        {
          planUuid: '3d5e3440-f659-4720-95d9-87733effddd5',
          featureUuid: '315d9595-b775-4a5e-b7af-878d423a914a',
          value: 'true',
          enumValueUuid: null,
          isUnlimited: false,
          isUsage: false,
          pricePerUnit: null,
          minUsage: null,
          maxUsage: null,
          updatedAt: '2023-11-06T17:17:05.820Z',
          feature: {
            uuid: '315d9595-b775-4a5e-b7af-878d423a914a',
            name: 'deprecated test',
            description: '',
            displayName: 'deprecated test',
            variableName: 'deprecated test',
            status: 'DEPRECATED',
            visibility: 'public',
            valueType: 'boolean',
            defaultValue: 'true',
            showUnlimited: false,
            productUuid: 'bb775c7a-a527-46b0-9f5e-bf74cc3c9331',
            updatedAt: '2023-11-06T17:17:05.507Z',
            sortOrder: 0,
          },
          enumValue: null,
        },
      ],
    },
  ],
};

describe('useProduct', () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify(mockResponseData));
  });

  afterAll(() => {
    fetchMock.mockClear();
  });

  it('returns correctly transformed data', async () => {
    const { result } = renderHook(() => useProduct(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current).not.toBeNull());

    expect(result.current).toMatchObject({
      name: 'Delete Card Power Up 2',
      status: 'ACTIVE',
      plans: [
        {
          name: 'Pro',
          currencies: [{ price: 1000 }],
          features: [{ name: 'test' }],
        },
      ],
    });
  });

  it('excludes deprecated resources by default', async () => {
    const { result } = renderHook(() => useProduct({ withDeprecated: true }), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current).not.toBeNull());

    expect(result.current).not.toMatchObject({
      plans: [
        {
          features: [{ name: 'deprecated test' }],
        },
      ],
    });
  });

  it('includes deprecated resources if requested', async () => {
    const { result } = renderHook(() => useProduct({ withDeprecated: true }), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current).not.toBeNull());

    expect(result.current).toMatchObject({
      plans: [
        {
          features: [
            {
              name: 'test',
            },
            {
              name: 'deprecated test',
            },
          ],
        },
      ],
    });
  });
});
