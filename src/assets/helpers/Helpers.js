import qs from 'qs';
import { useState, useEffect } from 'react';

export function isNotEmpty(obj) {
  return obj !== undefined && obj !== null && obj !== '';
}

export function capitalize(str) {
  return str.charAt().toUpperCase() + str.slice(1);
}

export function dateFormat(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function calculatedGroupingIsDisabled(isLoading, data) {
  if (isLoading) {
    return true;
  }

  return !data || !data.length;
}

export function calculateIsAllDataSelected(data, selected) {
  if (!data) {
    return false;
  }

  return data.length > 0 && data.length === selected.length;
}

export function groupingOnSelect(id, selected, setSelected) {
  if (!id) {
    return;
  }

  if (selected.includes(id)) {
    setSelected(selected.filter((itemId) => itemId !== id));
  } else {
    const updatedSelected = [...selected];
    updatedSelected.push(id);
    setSelected(updatedSelected);
  }
}

export function groupingOnSelectAll(isAllSelected, setSelected, data) {
  if (isAllSelected) {
    setSelected([]);
    return;
  }

  if (!data || !data.length) {
    return;
  }

  setSelected(data.filter((item) => item._id).map((item) => item._id));
}

export function stringifyRequestQuery(state) {
  const pagination = qs.stringify(state, {
    filter: ['page', 'items_per_page'],
    skipNulls: true,
  });
  const sort = qs.stringify(state, {
    filter: ['sort', 'order'],
    skipNulls: true,
  });

  const search = isNotEmpty(state.search)
    ? qs.stringify(state, { filter: ['search'], skipNulls: true })
    : '';

  const view = isNotEmpty(state.view)
    ? qs.stringify(state, { filter: ['view'], skipNulls: true })
    : '';

  const filter = state.filter
    ? Object.entries(state.filter)
        .filter((obj) => isNotEmpty(obj[1]))
        .map((obj) => {
          return `filter_${obj[0]}=${obj[1]}`;
        })
        .join('&')
    : '';

  return [pagination, sort, view, search, filter].filter((f) => f).join('&');
}

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
