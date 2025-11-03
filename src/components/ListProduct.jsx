import React, { useEffect, useState } from "react";
import axios from "axios";
import FormAddProduct from "./FormAddProduct";
import DeleteProduct from "./DeleteProduct";
import FormUpdateProduct from "./FormUpdate";
import SearchFilter from "./SearchFilter";

export default function ListProduct() {
  const [ListProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const loadData = async () => {
    Promise.all([
      axios.get("http://localhost:3000/product"),
      axios.get("http://localhost:3000/category"),
    ])
      .then(([productRes, categoryRes]) => {
        const products = productRes.data;
        setCategories(categoryRes.data);

        const merged = products.map((p) => {
          const category = categories.find((c) => c.id === p.categoryId);
          return {
            ...p,
            categoryName: category ? category.nameCategory : "Không rõ",
          };
        });
        merged.sort((a, b) => a.quantity - b.quantity);
        setListProduct(merged);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (searchName, selectedCategory) => {
    let filtered = ListProduct;

    if (searchName.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.nameProduct.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedCategory !== "") {
      filtered = filtered.filter(
        (p) => String(p.categoryId) === String(selectedCategory)
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <SearchFilter categories={categories} onSearch={handleSearch} />
      <h1>Danh sách product</h1>
      <div className="mb-3 text-start">
        <FormAddProduct onAddSuccess={loadData} />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="alert alert-warning text-center fs-5">
          Không tìm thấy sản phẩm
        </div>
      ) : (
        <table className="table table-hover text-center align-middle table-striped big-table">
          <thead className="table-light">
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Ngày nhập</th>
              <th>Số lượng</th>
              <th>Loại sản phẩm</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p, index) => (
              <tr key={index}>
                <td>{p.id}</td>
                <td>{p.nameProduct}</td>
                <td>
                  {p.importDate
                    ? new Date(p.importDate).toLocaleDateString("vi-VN")
                    : ""}
                </td>
                <td>{p.quantity}</td>
                <td>{p.categoryName}</td>
                <td>
                  <FormUpdateProduct product={p} onUpdateSuccess={loadData} />{" "}
                  <DeleteProduct product={p} onDeleteSuccess={loadData} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
