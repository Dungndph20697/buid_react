import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ListProduct() {
  const [ListProduct, setListUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/product?_expand=category")
      .then((respone) => {
        setListUser(respone.data);
        console.log(respone.data);
      })
      .catch((error) => {
        console.log("Lỗi api", error);
      });
  }, []);

  return (
    <>
      <h1>Danh sách product</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Mã sản phẩm</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Ngày nhập</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Loại sản phẩm</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {ListProduct.map((p, index) => (
            <tr key={index}>
              <th scope="row">{p.codeProduct}</th>
              <th>{p.nameProduct}</th>
              <td>{p.importDate}</td>
              <td>{p.quantity}</td>
              <td>{p.category}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-warning">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
