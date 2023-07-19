import { isNotEmpty } from '../../../assets/helpers';
import {
  ClientListProvider,
  useClientListView,
} from './core/ClientListProvider';
import { ClientRequestProvider } from './core/ClientRequestProvider';
import { ClientResponseProvider } from './core/ClientResponseProvider';

import ClientsHeader from './components/header/ClientsHeader';
import ClientModal from './components/modals/ClientModal';
import ClientsGrid from './list/ClientsGrid';
import CreateClientModal from './components/modals/CreateClientModal';

const ClientsList = () => {
  const { client, itemIdForUpdate, showCreateModal } = useClientListView();
  return (
    <div className='w-full'>
      <ClientsHeader />
      <ClientsGrid />
      <ClientModal show={isNotEmpty(client)} />
      <CreateClientModal show={showCreateModal} />
      <CreateClientModal show={isNotEmpty(itemIdForUpdate)} />
    </div>
  );
};

export const ClientsListWrapper = () => (
  <ClientRequestProvider>
    <ClientResponseProvider>
      <ClientListProvider>
        <ClientsList />
      </ClientListProvider>
    </ClientResponseProvider>
  </ClientRequestProvider>
);
