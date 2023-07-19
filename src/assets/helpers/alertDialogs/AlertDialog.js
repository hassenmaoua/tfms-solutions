import Swal from 'sweetalert2';

export const AlertDialog = (
  icon = '',
  title = '',
  message = '',
  confirmText = 'Ok'
) => {
  return Swal.fire({
    icon: icon,
    title: title,
    text: message,
    buttonsStyling: false,
    confirmButtonText: confirmText,
    customClass: {
      confirmButton: 'btn-default',
      popup: 'bg-white dark:bg-gray-900',
    },
  });
};
