import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useQuery } from 'react-query';
import { getActivities } from './requests';
import {
  initialQueryRequest,
  useActivityRequest,
} from './ActivityRequestProvider';
import { stringifyRequestQuery } from '../../../../assets/helpers';

const ActivityResponseContext = React.createContext();

const ActivityResponseProvider = ({ children }) => {
  const { state } = useActivityRequest();
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
  } = useQuery(`activities-list-${query}`, () => getActivities(query), {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <ActivityResponseContext.Provider
      value={{
        isLoading: isFetching,
        isError: error,
        refetch,
        response,
        query,
      }}
    >
      {children}
    </ActivityResponseContext.Provider>
  );
};

const useActivityResponse = () => useContext(ActivityResponseContext);

const useActivityResponseData = () => {
  const { response } = useActivityResponse();
  return response?.activities || [];
};

const useActivityResponsePagination = () => {
  const defaultPaginationState = { ...initialQueryRequest };
  const { response } = useActivityResponse();
  return response?.pagination || defaultPaginationState.state;
};

const useActivityResponseLoading = () => {
  const { isLoading } = useActivityResponse();
  return isLoading;
};

export {
  ActivityResponseProvider,
  useActivityResponse,
  useActivityResponseData,
  useActivityResponsePagination,
  useActivityResponseLoading,
};
