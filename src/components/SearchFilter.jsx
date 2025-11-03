import React, { useEffect, useState } from "react";

export default function SearchFilter({ categories, onSearch }) {
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Gọi hàm tìm kiếm từ cha khi người dùng thay đổi input
  useEffect(() => {
    onSearch(searchName, selectedCategory);
  }, [searchName, selectedCategory]);

  return (
    <div className="row mb-4">
      <div className="col-md-6 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập tên sản phẩm..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <div className="col-md-4 mb-2">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Chọn loại sản phẩm --</option>
          {categories.map((cate) => (
            <option key={cate.id} value={cate.id}>
              {cate.nameCategory}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-2 mb-2">
        <button
          className="btn btn-primary w-100"
          onClick={() => onSearch(searchName, selectedCategory)}
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}
