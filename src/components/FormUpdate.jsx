import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function FormUpdateProduct({ product, onUpdateSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy category:", error);
      });
  }, []);

  const updateProduct = async (productData) => {
    axios
      .put(`http://localhost:3000/product/${product.id}`, productData)
      .then(() => {
        Swal.fire({
          title: "Cập nhật sản phẩm thành công!",
          icon: "success",
          draggable: true,
        });
        if (onUpdateSuccess) onUpdateSuccess();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật:", error);
        Swal.fire({
          title: "Cập nhật thất bại!",
          text: "Vui lòng thử lại.",
          icon: "error",
        });
      });
  };

  return (
    <div>
      <button
        className="btn btn-warning"
        onClick={() => setShowModal(true)}
        data-bs-toggle="modal"
        data-bs-target="#updateModal"
      >
        Sửa
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          id="updateModal"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          aria-labelledby="updateModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateModalLabel">
                  Cập nhật sản phẩm
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <Formik
                  initialValues={{
                    nameProduct: product?.nameProduct || "",
                    quantity: product?.quantity || "",
                    importDate: product?.importDate || "",
                    categoryId: product?.categoryId || "",
                  }}
                  enableReinitialize
                  validationSchema={Yup.object({
                    categoryId: Yup.string().required(
                      "Vui lòng chọn loại sản phẩm"
                    ),
                    nameProduct: Yup.string().required(
                      "Tên sản phẩm không được trống"
                    ),
                    quantity: Yup.number()
                      .typeError("Số lượng phải là số")
                      .required("Số lượng không được trống")
                      .min(1, "Số lượng phải > 0")
                      .max(100, "Số lượng phải < 100"),
                    importDate: Yup.date()
                      .required("Ngày không được trống")
                      .max(
                        new Date(),
                        "Ngày không được vượt quá ngày hiện tại"
                      ),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    updateProduct(values);
                    setSubmitting(false);
                    setShowModal(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label text-end">
                          Loại sản phẩm
                        </label>
                        <div className="col-sm-9">
                          <select
                            name="categoryId"
                            className="form-select"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.categoryId}
                          >
                            <option value="">-- Chọn loại sản phẩm --</option>
                            {categories.map((cate) => (
                              <option key={cate.id} value={cate.id}>
                                {cate.nameCategory}
                              </option>
                            ))}
                          </select>
                          {errors.categoryId && touched.categoryId && (
                            <div className="text-danger">
                              {errors.categoryId}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label text-end">
                          Tên sản phẩm
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            name="nameProduct"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nameProduct}
                          />
                          {errors.nameProduct && touched.nameProduct && (
                            <div className="text-danger">
                              {errors.nameProduct}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label text-end">
                          Ngày nhập hàng
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="date"
                            name="importDate"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.importDate}
                          />
                          {errors.importDate && touched.importDate && (
                            <div className="text-danger">
                              {errors.importDate}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label text-end">
                          Số lượng
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.quantity}
                          />
                          {errors.quantity && touched.quantity && (
                            <div className="text-danger">{errors.quantity}</div>
                          )}
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className="btn btn-warning"
                          disabled={isSubmitting}
                        >
                          Cập nhật
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
