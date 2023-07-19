import clsx from 'clsx';

const Badge = ({ color, className, children }) => {
  const bgColorClass =
    color === 'blue'
      ? 'bg-blue-100'
      : color === 'red'
      ? 'bg-red-100'
      : color === 'green'
      ? 'bg-green-100'
      : 'bg-gray-100';

  const textColorClass =
    color === 'blue'
      ? 'text-blue-800'
      : color === 'red'
      ? 'text-red-800'
      : color === 'green'
      ? 'text-green-800'
      : 'text-gray-800';

  const darkBgColorClass =
    color === 'blue'
      ? 'dark:bg-blue-900'
      : color === 'red'
      ? 'dark:bg-red-900'
      : color === 'green'
      ? 'dark:bg-green-900'
      : 'dark:bg-gray-900';

  const darkTextColorClass =
    color === 'blue'
      ? 'dark:text-blue-300'
      : color === 'red'
      ? 'dark:text-red-300'
      : color === 'green'
      ? 'dark:text-green-300'
      : 'dark:text-gray-300';

  const tailwindClass = clsx(
    bgColorClass,
    textColorClass,

    'font-medium',

    'px-2.5',
    'py-0.5',
    'rounded',
    darkBgColorClass,
    darkTextColorClass,
    className
  );

  return <span className={tailwindClass}>{children}</span>;
};

export default Badge;
