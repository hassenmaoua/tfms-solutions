import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useQuery } from 'react-query';
import { getClients } from './requests';
import { initialQueryRequest, useClientRequest } from './ClientRequestProvider';
import { stringifyRequestQuery } from '../../../../assets/helpers';

const ClientResponseContext = React.createContext();

const ClientResponseProvider = ({ children }) => {
  const { state } = useClientRequest();
  const [query, setQuery] = useState(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [query, updatedQuery]);

  const {
    isFetching,
    refetch,
    error,
    data: response,
  } = useQuery(`clients-list-${query}`, () => getClients(query), {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <ClientResponseContext.Provider
      value={{
        isLoading: isFetching,
        isError: error,
        refetch,
        response,
        query,
      }}
    >
      {children}
    </ClientResponseContext.Provider>
  );
};

const useClientResponse = () => useContext(ClientResponseContext);

const useClientResponseData = () => {
  const { response } = useClientResponse();
  return response?.clients || [];
};

const useClientResponsePagination = () => {
  const defaultPaginationState = { ...initialQueryRequest };
  const { response } = useClientResponse();
  return response?.pagination || defaultPaginationState.state;
};

const useClientResponseLoading = () => {
  const { isLoading } = useClientResponse();
  return isLoading;
};

export {
  ClientResponseProvider,
  useClientResponse,
  useClientResponseData,
  useClientResponsePagination,
  useClientResponseLoading,
};
