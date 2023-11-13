import { renderHook, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { type Schemas } from '../types';
import { SalableContextProvider, type SalableContextData } from '../Context';
import { useUser, type UserData } from '../useUser';

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

const mockResponseData: Schemas['License'][] = [
  {
    uuid: '095be615-a8ad-4c33-8e9c-c7612fbf6c9f',
    productUuid: '3a88375a-5ea7-4e22-b7fe-b3c10f9367f3',
    planUuid: '4da9429c-fce6-4d7f-97f3-072e42f5878b',
    subscriptionUuid: '466672c4-1527-4594-82f2-3d3ac972eb68',
    granteeId: 'test-user-1',
    purchaser: 'purchaser@example.com',
    email: 'user@example.com',
    name: 'John Doe',
    paymentService: 'Stripe',
    type: 'Renew',
    capabilities: [
      {
        uuid: '095be615-a8ad-4c33-8e9c-c7612fbf6c9f',
        name: 'create',
        description: 'Allows a user to create something',
        status: 'ACTIVE',
        productUuid: '3a88375a-5ea7-4e22-b7fe-b3c10f9367f3',
        updatedAt: '2019-08-24T14:15:22Z',
      },
    ],
    startTime: '2019-08-24T14:15:22Z',
    endTime: '2019-08-24T14:15:22Z',
    status: 'ACTIVE',
    metadata: 'string',
    updatedAt: '2019-08-24T14:15:22Z',
    isTest: true,
  },
  {
    uuid: '095be615-a8ad-4c33-8e9c-c7612fbf6c9g',
    productUuid: '3a88375a-5ea7-4e22-b7fe-b3c10f9367f4',
    planUuid: '4da9429c-fce6-4d7f-97f3-072e42f5878c',
    subscriptionUuid: '466672c4-1527-4594-82f2-3d3ac972eb69',
    granteeId: 'test-user-1',
    purchaser: 'purchaser-2@example.com',
    email: 'user@example.com',
    name: 'John Doe',
    paymentService: 'Stripe',
    type: 'Renew',
    capabilities: [
      {
        uuid: '095be615-a8ad-4c33-8e9c-c7612fbf6c9f',
        name: 'read',
        description: 'Allows a user to create something',
        status: 'ACTIVE',
        productUuid: '3a88375a-5ea7-4e22-b7fe-b3c10f9367f3',
        updatedAt: '2019-08-24T14:15:22Z',
      },
      {
        uuid: '095be615-a8ad-4c33-8e9c-c7612fbf6c9g',
        name: 'update',
        description: 'Allows a user to update something',
        status: 'DEPRECATED',
        productUuid: '3a88375a-5ea7-4e22-b7fe-b3c10f9367f4',
        updatedAt: '2019-08-24T14:15:22Z',
      },
    ],
    startTime: '2019-08-24T14:15:22Z',
    endTime: '2019-08-24T14:15:22Z',
    status: 'ACTIVE',
    metadata: 'string',
    updatedAt: '2019-08-24T14:15:22Z',
    isTest: true,
  },
];

describe('useUser', () => {
  beforeAll(() => {
    fetchMock.mockResponse(JSON.stringify(mockResponseData));
  });

  afterAll(() => {
    fetchMock.mockClear();
  });

  it('returns null if no granteeId is present', () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(),
    });

    expect(result.current.state).toBe('error');
  });

  describe('hasCapability', () => {
    it('checks for an individual capability', async () => {
      const { result } = renderHook(() => useUser(), {
        wrapper: createWrapper({ granteeId: '1' }),
      });

      await waitFor(() => expect(result.current.state).toBe('success'));

      const userData = result.current as UserData;

      expect(userData.hasCapability('create')).toEqual(true);
      expect(userData.hasCapability('delete')).toEqual(false);
    });

    it('is case insensitive', () => {
      const { result } = renderHook(() => useUser(), {
        wrapper: createWrapper({ granteeId: '1' }),
      });

      const userData = result.current as UserData;
      expect(userData.hasCapability('READ')).toEqual(true);
      expect(userData.hasCapability('ReAd')).toEqual(true);
    });

    it('fails for deprecated capabilities', async () => {
      const { result } = renderHook(() => useUser(), {
        wrapper: createWrapper({ granteeId: '1' }),
      });

      const userData = result.current as UserData;
      expect(userData.hasCapability('update')).toEqual(false);
      expect(userData.hasCapability(['update'])).toMatchObject({
        update: false,
      });
    });

    it('checks for multiple supplied capabilities', async () => {
      const { result } = renderHook(() => useUser(), {
        wrapper: createWrapper({ granteeId: '1' }),
      });

      const userData = result.current as UserData;
      expect(userData.hasCapability(['create', 'delete'])).toMatchObject({
        create: true,
        delete: false,
      });
    });
  });

  it('returns capabilities across all licenses', async () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper({ granteeId: '1' }),
    });

    const userData = result.current as UserData;
    expect(userData.capabilities).toMatchObject([
      { name: 'create', status: 'ACTIVE' },
      { name: 'read', status: 'ACTIVE' },
      { name: 'update', status: 'DEPRECATED' },
    ]);
  });
});
