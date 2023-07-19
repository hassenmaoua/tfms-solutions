import { useActivityListView } from '../../core/ActivityListProvider';
import ActivitiesFilter from './ActivitiesFilter';
import ActivitiesGrouping from './ActivitiesGrouping';

const ActivitiesToolbar = () => {
  const { selected, setShowCreateModal } = useActivityListView();
  const handleOpen = () => {
    setShowCreateModal(true);
  };

  return (
    <div className='flex'>
      {selected.length > 0 ? (
        <ActivitiesGrouping />
      ) : (
        <>
          <ActivitiesFilter />
          <button onClick={handleOpen} className='btn-primary mr-3'>
            Ajouter une activité
          </button>
        </>
      )}
    </div>
  );
};

export default ActivitiesToolbar;
