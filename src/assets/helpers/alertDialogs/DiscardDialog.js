import Swal from 'sweetalert2';

export const DiscardDialog = (
  message = '',
  confirmText = '',
  cancelText = ''
) => {
  return Swal.fire({
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: false,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn-default mr-2',
      cancelButton: 'btn-alternative ms-2',
      popup: 'bg-white dark:bg-gray-900',
    },
  });
};
