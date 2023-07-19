import { useClientListView } from '../../core/ClientListProvider';
import ClientsFilter from './ClientsFilter';

const ClientsToolbar = () => {
  const { setShowCreateModal } = useClientListView();

  const handleOpen = () => {
    setShowCreateModal(true);
  };

  return (
    <div className='flex'>
      <ClientsFilter />
      <button onClick={handleOpen} className='btn-primary mr-3'>
        Ajouter client
      </button>
    </div>
  );
};

export default ClientsToolbar;
