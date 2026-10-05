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

  // 1. استخراج page و totalPages من الـ Redux
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

  // 2. طلب 8 منتجات للصفحة الحالية
  useEffect(() => {
    dispatch(fetchProducts({ page: page || 1, limit: 8 }));
  }, [dispatch, page]);

  // 3. دالة التنقل بين الصفحات
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
        description: "",
        countInStock: "",
        image: null,
      });
    }
    setIsModalOpen(true);
  };
//تنظيف ذاكرة المكون وتصفير الـ id المخزن سابقاً.

// يضمن هذا السطر عدم بقاء أي بيانات لمنتج قديم تم التعديل عليه سابقاً، حتى لا يحدث تداخل (Conflict) عندما يقرر المستخدم فتح النافذة مجدداً لإضافة منتج جديد.
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
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-[#FAF7F2]">
      <div className="p-6 bg-white rounded-xl border border-[#E5DFD3] shadow-sm mt-18">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E5DFD3]">
          <div>
            <h2 className="text-2xl font-bold text-[#473428]">
              Products Management
            </h2>
            <p className="text-sm text-[#9A8B7F]">
              View, add, edit, and delete store products.
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#966907] hover:bg-[#785305] text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" /> Add New Product
          </button>
        </div>

        {/* Loading & Error States */}
        {status === "loading" && (
          <p className="text-[#9A8B7F]">Loading products...</p>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls - هنا موقعه بالضبط */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#E5DFD3]">
            <span className="text-sm text-[#9A8B7F]">
              Page <span className="font-semibold text-[#473428]">{page}</span>{" "}
              of{" "}
              <span className="font-semibold text-[#473428]">
                {totalPages}
              </span>
            </span>

            <div className="flex items-center gap-2">
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
            <div className="bg-white rounded-xl w-full max-w-md p-9 relative shadow-lg">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-red-700 hover:text-gray-600"
              >
                <X className="w-7 h-7 mt-25"  />
              </button>
              <h3 className="text-xl font-bold text-[#473428] mb-4 mt-20">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">
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
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1"
                  />
                </div>

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
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1"
                  />
                </div>

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
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1"
                  />
                </div>

                    <div>
                  <label className="block text-sm font-medium text-gray-700">
                    brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1"
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
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="2"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm mt-1"
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
                    className="w-full text-sm text-gray-500 mt-1"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-2 border-t">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-[#966907] text-white hover:bg-[#785305] rounded-lg"
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