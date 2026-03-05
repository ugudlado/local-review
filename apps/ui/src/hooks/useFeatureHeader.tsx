import { createContext, useContext, useState, type ReactNode } from "react";

interface FeatureHeaderContextValue {
  headerActions: ReactNode;
  setHeaderActions: (actions: ReactNode) => void;
}

export const FeatureHeaderContext = createContext<FeatureHeaderContextValue>({
  headerActions: null,
  setHeaderActions: () => {},
});

export function FeatureHeaderProvider({ children }: { children: ReactNode }) {
  const [headerActions, setHeaderActions] = useState<ReactNode>(null);

  return (
    <FeatureHeaderContext.Provider value={{ headerActions, setHeaderActions }}>
      {children}
    </FeatureHeaderContext.Provider>
  );
}

export function useFeatureHeader() {
  return useContext(FeatureHeaderContext);
}
