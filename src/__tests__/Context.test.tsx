import { render, renderHook } from '@testing-library/react';
import { SalableContextProvider, useSalableContext } from '../Context';

describe('Context', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('SalableContextProvider', () => {
    it('correctly renders provided children', () => {
      const { getByText } = render(
        <SalableContextProvider
          value={{ apiKey: 'fake-api-key', productUuid: '1' }}
        >
          <h1>Provided Children</h1>
        </SalableContextProvider>,
      );

      getByText('Provided Children');
    });
  });

  describe('useSalableContext', () => {
    it('warns user if SalableContextProvider not rendered', () => {
      /**
       * We suppress the errors in this particular instance since React is
       * trying to be helpful by telling us we can catch the errors using an
       * <ErrorBoundary />. This adds a lot of noise to the test output.
       */
      jest.spyOn(console, 'error').mockImplementation(() => jest.fn());
      try {
        renderHook(() => useSalableContext(), {});
      } catch (e) {
        expect((e as Error).message).toEqual(
          'Salable React Hooks require a parent SalableContextProvider to be rendered.',
        );
      }
    });

    it('returns correct context data', () => {
      const { result } = renderHook(() => useSalableContext(), {
        wrapper: ({ children }) => (
          <SalableContextProvider
            value={{
              apiKey: 'fake-api-key',
              granteeId: 'fake-grantee-id',
              productUuid: '1',
            }}
          >
            {children}
          </SalableContextProvider>
        ),
      });

      expect(result.current).toMatchObject({
        apiKey: 'fake-api-key',
        granteeId: 'fake-grantee-id',
        productUuid: '1',
      });
    });
  });
});
