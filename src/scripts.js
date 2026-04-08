import { Swal } from "sweetalert2";

Swal.fire({
    icon: "success",
    title: response.success.toLowerCase(),
    showConfirmButton: false,
    timer: 1500,
});
