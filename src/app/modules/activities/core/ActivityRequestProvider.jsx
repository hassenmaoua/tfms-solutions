import { useState, createContext, useContext } from 'react';

export const initialQueryRequest = {
  state: { links: [], page: 1, items_per_page: 10 },
  updateState: () => {},
};

export const initialQueryState = {
  page: 1,
  items_per_page: 10,
};

const ActivityRequestContext = createContext(initialQueryRequest);

const ActivityRequestProvider = ({ children }) => {
  const [state, setState] = useState(initialQueryRequest.state);

  const updateState = (updates) => {
    const updatedState = { ...state, ...updates };
    setState(updatedState);
  };

  return (
    <ActivityRequestContext.Provider value={{ state, updateState }}>
      {children}
    </ActivityRequestContext.Provider>
  );
};

const useActivityRequest = () => useContext(ActivityRequestContext);
export { ActivityRequestProvider, useActivityRequest };
