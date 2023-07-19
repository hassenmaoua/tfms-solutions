import React, { useState } from 'react';
import Badge from '../../../../../assets/helpers/components/Badge';
import { Menu, Transition } from '@headlessui/react';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../assets/helpers';
import { useQuery } from 'react-query';
import { getStatesByCode, updateActivity } from '../../core/requests';
import { useActivityListView } from '../../core/ActivityListProvider';
import { useActivityResponse } from '../../core/ActivityResponseProvider';

const UpdateStateDropdown = ({ state }) => {
  const { activity } = useActivityListView();
  const { refetch } = useActivityResponse();
  const [isHovered, setIsHovered] = useState(false);

  const [newState, setNewState] = useState(state);

  const handleChange = async (state) => {
    const id = activity._id;
    const formData = { state: state._id };
    setNewState(state);
    refetch();
    await updateActivity(id, formData);
  };

  const {
    isFetching,
    error,
    data: states,
  } = useQuery(`acitvity-states`, () => getStatesByCode('AE'), {
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  return (
    <div className='relative'>
      <Menu>
        <Menu.Button>
          <Badge color={newState.style} className='inline-flex my-auto text-sm'>
            {newState.label}
            <SVG
              className={`h-6 w-6 ms-2 transform transition-all duration-300 ${
                isHovered ? 'rotate-180' : 'rotate-0'
              }`}
              src={toAbsoluteUrl('/media/icons/gear.svg')}
            />
          </Badge>
        </Menu.Button>
        <Transition
          enter='transition duration-300 ease-out'
          enterFrom='transform scale-75 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-200 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-50 opacity-0'
        >
          <Menu.Items
            onBlur={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            as='ul'
            className='absolute mt-1 p-2 space-y-1 text-sm z-10 w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-all ease-in-out duration-300'
          >
            {states &&
              states.length > 0 &&
              states.map((state) => (
                <Menu.Item
                  hidden={state._id === newState._id}
                  disabled={state._id === newState._id}
                  key={state._id}
                  onClick={() => handleChange(state)}
                  as='li'
                >
                  <Badge
                    color={state.style}
                    className='inline-flex my-auto w-full hover:cursor-pointer'
                  >
                    {state.label}
                  </Badge>
                </Menu.Item>
              ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UpdateStateDropdown;
