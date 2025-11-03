import axios from "axios";
import Swal from "sweetalert2";
export default function DeleteProduct({ product, onDeleteSuccess }) {
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: `Bạn có chắc muốn xóa "${product.nameProduct}"?`,
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/product/${product.id}`);
        Swal.fire(
          "Đã xóa!",
          `"${product.nameProduct}" đã được xóa thành công.`,
          "success"
        );
        onDeleteSuccess();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        Swal.fire("Lỗi!", "Không thể xóa sản phẩm.", "error");
      }
    }
  };

  return (
    <>
      <button className="btn btn-warning" onClick={handleDelete}>
        Xoá
      </button>
    </>
  );
}
