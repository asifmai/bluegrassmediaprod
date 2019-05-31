$('.btn-delete-project').on('click', function (e) {
  e.preventDefault();
  var deleteURL = $(this).attr("href");
  swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this Item!",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then(function (result) {
    if (result.value) {
      window.location.href = deleteURL;
    }
  })
});