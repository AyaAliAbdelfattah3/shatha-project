import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProductThunk,
  updateProductThunk,
  deleteProductThunk,
} from "../../redux/productsSlice";
import { Plus, Edit, Trash2, X } from "lucide-react";

const AdminProducts = () => {
  const dispatch = useDispatch();

  const {
    items: products,
    status,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    description: "",
    countInStock: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchProducts({ page: page || 1, limit: 8 }));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchProducts({ page: newPage, limit: 8 }));
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        brand: product.brand || "",
        description: product.description || "",
        countInStock: product.countInStock || "",
        image: null,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        price: "",
        category: "",
        brand: "", // ضفت دي عشان تمنع مشكلة لو المودال اتفتح بدون بيانات
        description: "",
        countInStock: "",
        image: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("brand", formData.brand);
    data.append("description", formData.description);
    data.append("countInStock", formData.countInStock);
    if (formData.image) {
      data.append("image", formData.image);
    }

    if (editingProduct) {
      const id = editingProduct._id || editingProduct.id;
      dispatch(updateProductThunk({ id, data }))
        .unwrap()
        .then(() => {
          handleCloseModal();
        });
    } else {
      dispatch(createProductThunk(data))
        .unwrap()
        .then(() => {
          dispatch(fetchProducts({ page: page || 1, limit: 8 }));
          handleCloseModal();
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductThunk(id))
        .unwrap()
        .then(() => {
          dispatch(fetchProducts({ page: page || 1, limit: 8 }));
        });
    }
  };

  return (
    // ظبطنا المسافات (padding) في الموبايل
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-[#FAF7F2]">
      <div className="p-4 md:p-6 bg-white rounded-xl border border-[#E5DFD3] shadow-sm mt-4 md:mt-18">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-[#E5DFD3]">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#473428]">
              Products Management
            </h2>
            <p className="text-sm text-[#9A8B7F]">
              View, add, edit, and delete store products.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="w-full md:w-auto flex justify-center items-center gap-2 bg-[#966907] hover:bg-[#785305] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" /> Add New Product
          </button>
        </div>

        {/* Loading & Error States */}
        {status === "loading" && (
          <p className="text-[#9A8B7F] text-center py-4">Loading products...</p>
        )}
        {error && <p className="text-red-500 text-center py-4">Error: {error}</p>}

        {/* Products Table */}
        <div className="overflow-x-auto">
          {/* ضفنا min-w-[800px] عشان يظهر سكرول في الموبايل والجدول ميتضغطش */}
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#FAF7F2] text-[#473428] border-b border-[#E5DFD3]">
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Brand</th> 
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((item) => {
                  const id = item._id || item.id;
                  return (
                    <tr
                      key={id}
                      className="border-b border-[#E5DFD3] hover:bg-[#FAF7F2]/50"
                    >
                      <td className="p-3 font-medium text-[#473428]">
                        {item.name}
                      </td>
                      <td className="p-3 text-gray-600">{item.category}</td>
                      <td className="p-3 text-gray-600">{item.brand || "N/A"}</td> 
                      <td className="p-3 font-semibold text-[#966907]">
                        ${item.price}
                      </td>
                      <td className="p-3 text-gray-600">{item.countInStock}</td>
                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          // ضفنا flex-col في الموبايل عشان الكلام والأزرار ميتخانقوش
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-[#E5DFD3]">
            <span className="text-sm text-[#9A8B7F]">
              Page <span className="font-semibold text-[#473428]">{page}</span>{" "}
              of{" "}
              <span className="font-semibold text-[#473428]">
                {totalPages}
              </span>
            </span>

            {/* الأزرار بتلف على السطر اللي بعده لو المساحة مش كفاية (flex-wrap) */}
            <div className="flex flex-wrap justify-center items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="px-4 py-2 text-sm font-medium text-[#473428] bg-[#FAF7F2] border border-[#E5DFD3] rounded-lg hover:bg-[#E5DFD3]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      page === pageNum
                        ? "bg-[#966907] text-white"
                        : "bg-[#FAF7F2] text-[#473428] border border-[#E5DFD3] hover:bg-[#E5DFD3]/50"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#966907] rounded-lg hover:bg-[#785305] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            {/* ظبطنا المودال عشان ياخد مساحة الشاشة في الموبايل ويكون فيه سكرول لو المحتوى طويل */}
            <div className="bg-white rounded-xl w-full max-w-md p-6 md:p-8 relative shadow-lg max-h-[90vh] overflow-y-auto">
              
              {/* زرار القفل - شلنا الـ mt-25 الغريبة وظبطناه */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-xl font-bold text-[#473428] mb-6 pr-6">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:ring-2 focus:ring-[#966907]/50 focus:border-[#966907] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:ring-2 focus:ring-[#966907]/50 focus:border-[#966907] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      name="countInStock"
                      value={formData.countInStock}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:ring-2 focus:ring-[#966907]/50 focus:border-[#966907] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:ring-2 focus:ring-[#966907]/50 focus:border-[#966907] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:ring-2 focus:ring-[#966907]/50 focus:border-[#966907] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm mt-1 focus:ring-2 focus:ring-[#966907]/50 focus:border-[#966907] outline-none resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image File
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full text-sm text-gray-500 mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FAF7F2] file:text-[#966907] hover:file:bg-[#E5DFD3] transition-all"
                  />
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium bg-[#966907] text-white hover:bg-[#785305] rounded-lg transition-colors shadow-sm"
                  >
                    {editingProduct ? "Update Product" : "Save Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;