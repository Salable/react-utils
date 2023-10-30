import { useContext, createContext } from 'react';

type SalableContextData = {
  apiKey: string;
  granteeId?: string;
};

const SalableContext = createContext<SalableContextData | undefined>(undefined);

function useSalableContext(): SalableContextData {
  const context = useContext(SalableContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useSalableContext requires a parent SalableContextProvider to be rendered.',
    );
  }

  return context;
}

type SalableContextProviderProps = {
  children: React.ReactNode;
  value: SalableContextData;
};

function SalableContextProvider({
  children,
  value,
}: SalableContextProviderProps) {
  return (
    <SalableContext.Provider value={value}>{children}</SalableContext.Provider>
  );
}

export { useSalableContext, SalableContextProvider };
