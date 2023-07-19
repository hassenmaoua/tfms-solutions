import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { toAbsoluteUrl } from '../../../../../assets/helpers';

const Card = ({ title, icon, description, link }) => {
  return (
    <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <SVG src={toAbsoluteUrl(icon)} className='text-gray-500 h-16 w-16' />

      <h5 className='mb-2 text-2xl font-semibold tracking-tight text-gray-600 dark:text-white'>
        {title}
      </h5>

      <p className='mb-3 font-normal text-gray-500 dark:text-gray-400'>
        {description}
      </p>
      <Link
        to={link}
        className='inline-flex items-center text-primary-600 hover:underline'
      >
        Voir plus
        <SVG
          src={toAbsoluteUrl('/media/icons/arr095.svg')}
          className='ms-1 w-5 h-5'
        />
      </Link>
    </div>
  );
};

export default Card;
