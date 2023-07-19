import Swal from 'sweetalert2';

export const SuccessAlert = (title = '', message = '', confirmText = 'Ok') => {
  return Swal.fire({
    icon: 'success',
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
