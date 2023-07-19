import { isNotEmpty } from '../../../assets/helpers';
import {
  ActivityListProvider,
  useActivityListView,
} from './core/ActivityListProvider';
import { ActivityRequestProvider } from './core/ActivityRequestProvider';
import { ActivityResponseProvider } from './core/ActivityResponseProvider';
import Table from './table/Table';
import ActivitiesHeader from './components/header/ActivitiesHeader';
import ActivityModal from './components/modals/ActivityModal';
import CreateActivityModal from './components/modals/CreateActivityModal';

const ActivitiesList = () => {
  const { activity, showCreateModal, itemIdForUpdate } = useActivityListView();
  return (
    <div className='w-full'>
      <ActivitiesHeader />
      <Table />
      <ActivityModal show={isNotEmpty(activity)} />
      <CreateActivityModal
        show={showCreateModal || isNotEmpty(itemIdForUpdate)}
      />
    </div>
  );
};

export const ActivitiesListWrapper = () => (
  <ActivityRequestProvider>
    <ActivityResponseProvider>
      <ActivityListProvider>
        <ActivitiesList />
      </ActivityListProvider>
    </ActivityResponseProvider>
  </ActivityRequestProvider>
);
