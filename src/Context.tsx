import { useContext, createContext, useState } from 'react';

export type SalableContextData = {
  apiKey: string;
  productUuid: string;
  granteeId?: string;
  setGranteeId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const SalableContext = createContext<SalableContextData | undefined>(undefined);

function useSalableContext(): SalableContextData {
  const context = useContext(SalableContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'Salable React Hooks require a parent SalableContextProvider to be rendered.',
    );
  }

  return context;
}

type SalableContextProviderProps = {
  children: React.ReactNode;
  /**
   * We omit setGranteeId as we wouldn't expect the end-user to pass this value
   * in.
   */
  value: Omit<SalableContextData, 'setGranteeId'>;
};

function SalableContextProvider({
  children,
  value,
}: SalableContextProviderProps) {
  const [granteeId, setGranteeId] = useState(value.granteeId);

  return (
    <SalableContext.Provider value={{ ...value, granteeId, setGranteeId }}>
      {children}
    </SalableContext.Provider>
  );
}

export { useSalableContext, SalableContextProvider };
