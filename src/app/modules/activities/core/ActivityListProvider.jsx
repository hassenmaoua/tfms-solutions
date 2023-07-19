import { useState, createContext, useMemo, useContext } from 'react';
import {
  calculateIsAllDataSelected,
  calculatedGroupingIsDisabled,
  groupingOnSelect,
  groupingOnSelectAll,
} from '../../../../assets/helpers';
import {
  useActivityResponse,
  useActivityResponseData,
} from './ActivityResponseProvider';

const initialListView = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  itemIdForUpdate: undefined,
  setItemIdForUpdate: () => {},
  showCreateModal: false,
  setShowCreateModal: () => {},
  activity: undefined,
  setActivity: () => {},
  isAllSelected: false,
  disabled: false,
};

const ActivityListViewContext = createContext(initialListView);

const ActivityListProvider = ({ children }) => {
  const [selected, setSelected] = useState(initialListView.selected);
  const [itemIdForUpdate, setItemIdForUpdate] = useState(undefined);
  const [activity, setActivity] = useState(undefined);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { isLoading } = useActivityResponse();
  const data = useActivityResponseData();
  const disabled = useMemo(
    () => calculatedGroupingIsDisabled(isLoading, data),
    [isLoading, data]
  );
  const isAllSelected = useMemo(
    () => calculateIsAllDataSelected(data, selected),
    [data, selected]
  );

  return (
    <ActivityListViewContext.Provider
      value={{
        selected,
        itemIdForUpdate,
        setItemIdForUpdate,
        activity,
        setActivity,
        showCreateModal,
        setShowCreateModal,
        disabled,
        isAllSelected,
        onSelect: (id) => {
          groupingOnSelect(id, selected, setSelected);
        },
        onSelectAll: () => {
          groupingOnSelectAll(isAllSelected, setSelected, data);
        },
        clearSelected: () => {
          setSelected([]);
        },
      }}
    >
      {children}
    </ActivityListViewContext.Provider>
  );
};

const useActivityListView = () => useContext(ActivityListViewContext);

export { ActivityListProvider, useActivityListView };
