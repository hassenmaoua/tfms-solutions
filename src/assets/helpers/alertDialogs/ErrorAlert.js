import Swal from 'sweetalert2';

export const ErrorAlert = (
  title = '',
  message = '',
  confirmText = 'Compris !'
) => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    buttonsStyling: false,
    confirmButtonText: confirmText,
    customClass: {
      confirmButton: 'btn-danger',
      popup: 'bg-white dark:bg-gray-900',
    },
  });
};
