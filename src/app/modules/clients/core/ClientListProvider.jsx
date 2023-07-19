import { useState, createContext, useContext } from 'react';

const initialListView = {
  itemIdForUpdate: undefined,
  setItemIdForUpdate: () => {},
  showCreateModal: false,
  setShowCreateModal: () => {},
  client: undefined,
  setClient: () => {},
};

const ClientListViewContext = createContext(initialListView);

const ClientListProvider = ({ children }) => {
  const [itemIdForUpdate, setItemIdForUpdate] = useState(
    initialListView.itemIdForUpdate
  );
  const [client, setClient] = useState(initialListView.client);
  const [showCreateModal, setShowCreateModal] = useState(
    initialListView.showCreateModal
  );
  return (
    <ClientListViewContext.Provider
      value={{
        itemIdForUpdate,
        setItemIdForUpdate,
        showCreateModal,
        setShowCreateModal,
        client,
        setClient,
      }}
    >
      {children}
    </ClientListViewContext.Provider>
  );
};

const useClientListView = () => useContext(ClientListViewContext);

export { ClientListProvider, useClientListView };
