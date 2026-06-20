// UI helpers menggunakan SweetAlert2
(function(){
  window.showAlert = async function(message, title = '') {
    return await Swal.fire({
      title: title,
      text: message,
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#2b8aef'
    });
  };

  window.showConfirm = async function(message, title = 'Konfirmasi') {
    const result = await Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#2b8aef',
      cancelButtonColor: '#d33'
    });
    return result.isConfirmed;
  };

  window.showSuccess = async function(message, title = 'Berhasil') {
    return await Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#2b8aef'
    });
  };

  window.showError = async function(message, title = 'Error') {
    return await Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#2b8aef'
    });
  };

  window.showToast = async function(message, icon = 'info') {
    return await Swal.fire({
      toast: true,
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  };
})();
