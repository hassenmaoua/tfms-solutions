import React from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { checkIsActive } from '../../../helpers/RouterHelpers';

const MenuItem = ({ to, title }) => {
  const { pathname } = useLocation();
  return (
    <li>
      <Link
        to={to}
        className={clsx(
          'block pl-3 pr-4 border-b-2 text-gray-900 md:p-0 dark:text-gray-200 dark:hover:text-primary-500 dark:border-gray-700 transition-all duration-300 ease-linear',
          {
            'dark:text-primary-400 text-primary-700 font-semibold border-b-2 border-primary-700 dark:border-primary-500':
              checkIsActive(pathname, to),
          }
        )}
      >
        {title}
      </Link>
    </li>
  );
};

export default MenuItem;
