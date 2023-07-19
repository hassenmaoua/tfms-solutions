import { useState, createContext, useContext } from 'react';

export const initialQueryRequest = {
  state: { links: [], page: 1, items_per_page: 12 },
  updateState: () => {},
};

export const initialQueryState = {
  page: 1,
  items_per_page: 12,
};

const ClientRequestContext = createContext(initialQueryRequest);

const ClientRequestProvider = ({ children }) => {
  const [state, setState] = useState(initialQueryRequest.state);

  const updateState = (updates) => {
    const updatedState = { ...state, ...updates };
    setState(updatedState);
  };

  return (
    <ClientRequestContext.Provider value={{ state, updateState }}>
      {children}
    </ClientRequestContext.Provider>
  );
};

const useClientRequest = () => useContext(ClientRequestContext);
export { ClientRequestProvider, useClientRequest };
