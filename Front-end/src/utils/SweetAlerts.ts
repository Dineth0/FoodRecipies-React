import Swal from 'sweetalert2';

const COLORS = {
  primary: '#7C4A2D',
  dark: '#4E2A1E',
  light: '#C4A484',

  success: '#3A7D44',
  error: '#B83A2D',
  warning: '#D8A23A',
  info: '#6B8E8E',
  question: '#7C4A2D',
  cancel: '#6B5B53',
};

export const showSuccessAlert = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'success',
    confirmButtonColor: COLORS.success,
    background: '#FFF8F2',
    color: COLORS.dark,
    confirmButtonText: 'OK',
  });
};

export const showErrorAlert = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'error',
    confirmButtonColor: COLORS.error,
    background: '#FFF8F2',
    color: COLORS.dark,
    confirmButtonText: 'OK',
  });
};

export const showWarningAlert = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'warning',
    confirmButtonColor: COLORS.warning,
    background: '#FFF8F2',
    color: COLORS.dark,
    confirmButtonText: 'OK',
  });
};

export const showInfoAlert = (title: string, message?: string) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'info',
    confirmButtonColor: COLORS.info,
    background: '#FFF8F2',
    color: COLORS.dark,
    confirmButtonText: 'OK',
  });
};

export const showConfirmDialog = (
  title: string,
  message: string,
  confirmButtonText = 'Yes',
  cancelButtonText = 'No'
) => {
  return Swal.fire({
    title,
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: COLORS.primary,
    cancelButtonColor: COLORS.cancel,
    background: '#FFF8F2',
    color: COLORS.dark,
    confirmButtonText,
    cancelButtonText,
  });
};

export const showToast = (
  title: string,
  icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success'
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: COLORS.dark,
    color: '#FFF8F2',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon,
    title,
    iconColor: COLORS[icon],
  });
};
