import { createContext, useContext } from 'react';

export const SelectionContext = createContext({
  selectedRowsMap: {},
  onToggleRow: () => {},
});

export const useSelectionContext = () => useContext(SelectionContext);
