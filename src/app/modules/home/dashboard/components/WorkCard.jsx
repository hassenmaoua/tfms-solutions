import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../assets/helpers';

const WorkCard = ({ title }) => {
  return (
    <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <SVG
        src={toAbsoluteUrl('/media/icons/gra001.svg')}
        className='text-gray-500 h-16 w-16'
      />

      <h5 className='mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white'>
        <span className='flex items-center'>
          {title}%
          <SVG
            src={toAbsoluteUrl('/media/icons/arr_up.svg')}
            className='text-green-500 h-8 w-8'
          />
        </span>
      </h5>

      <p className='mb-3 font-normal text-gray-500 dark:text-gray-400'>
        Buget de vent
      </p>
    </div>
  );
};

export default WorkCard;
