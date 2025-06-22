import Swal from 'sweetalert2';

export function confirmDialog(
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  confirmButtonText = 'Yes, delete it!',
  cancelButtonText = 'Cancel'
): Promise<boolean> {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText,
    cancelButtonText,
  }).then((result) => result.isConfirmed);
}
