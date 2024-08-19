import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/Api";
import Swal from "sweetalert2";

const SellingProductCard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    category_id: "",
    product_name: "",
    price: "",
    stock: "",
    description: "",
    photo: null,
  });

  useEffect(() => {
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const data = new FormData();
      data.append("category_id", formData.category_id);
      data.append("product_name", formData.product_name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      await api.post("/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product created successfully",
      });
      setFormData({
        category_id: "",
        product_name: "",
        price: "",
        stock: "",
        description: "",
        photo: null,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFormData({ ...formData, category_id: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };
  return (
    <>
      <div className="w-3/4">
        {/* Inventory 1 */}
        <div className="w-11/12 p-8">
          <div className="bg-white rounded-md border shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Selling Product</h2>
            <hr className="mb-4" />
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                {/* Category Dropdown */}
                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Select Category</label>
                  <select value={selectedCategory} onChange={handleCategoryChange} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary">
                    <option value="">-- Select a Category --</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Name */}
                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Product Name</label>
                  <input type="text" name="product_name" value={formData.product_name} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" />
                </div>

                {/* Price */}
                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Price</label>
                  <input type="number" min="0" name="price" value={formData.price} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" />
                </div>

                {/* Stock */}
                <div className="mb-4 relative">
                  <label className="text-[#9B9B9B] mr-2">Stock</label>
                  <input type="number" min="0" name="stock" value={formData.stock} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" />
                  <span className="absolute right-2 top-1/2">Buah</span>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" />
                </div>

                {/* Photo */}
                <div className="mb-4">
                  <label className="text-[#9B9B9B] mr-2">Photo</label>
                  <input type="file" name="photo" onChange={handleFileChange} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" />
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Item details */}
        {/* <div className="w-full p-8 -mt-5">
          <div className="bg-white rounded-md border shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Item details</h2>
            <hr className="mb-4" />
            <div className="w-1/2">
              <div className="mb-4">
                <label className="text-[#9B9B9B] mr-2">Unit price</label>
                <input type="text" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" />
              </div>
              <div className="mb-4 relative">
                <label className="text-[#9B9B9B] mr-2">Stock</label>
                <input type="text" className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-primary" />
                <span className="absolute right-2 top-1/2">Buah</span>
              </div>
              <div className="mb-4">
                <label className="text-[#9B9B9B] mr-2">Stock</label>
                <div className="flex items-center">
                  <input type="radio" id="new" name="stock" value="new" className="mr-2 form-radio accent-primary" checked />
                  <label htmlFor="new" className="mr-4">
                    Baru
                  </label>
                  <input type="radio" id="used" name="stock" value="used" className="mr-2 form-radio accent-primary" />
                  <label htmlFor="used">Bekas</label>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Photo of goods */}
        {/* <div className="w-full p-8 -mt-5">
          <div className="bg-white rounded-md border shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Photo of goods</h2>
            <hr className="mb-4" />
            <div className="mb-4 border-dashed border-2 border-gray-300 rounded-lg py-8 px-4">
              <div className="grid grid-cols-5 ">
                {/* Image multiple 5 */}
        {/* Image 1 */}
        {/* <div className="flex justify-center items-center">
                  <label htmlFor="upload-photo-1" className="cursor-pointer">
                    <img src="https://via.placeholder.com/300" alt="Upload Image" className="w-32 h-32 rounded-lg border border-gray-300" />
                    <span className="block text-center mt-2 text-[#9B9B9B] text-sm">Foto Utama</span>
                  </label> */}
        {/* Hidden input for file upload */}
        {/* <input type="file" id="upload-photo-1" className="hidden" accept="image/*" />
                </div> */}

        {/* Image 2 */}
        {/* <div className="flex justify-center items-center">
                  <label htmlFor="upload-photo-2" className="cursor-pointer">
                    <img src="https://via.placeholder.com/150" alt="Upload Image" className="w-24 h-24 rounded-lg border border-gray-300" />
                  </label> */}
        {/* Hidden input for file upload */}
        {/* <input type="file" id="upload-photo-2" className="hidden" accept="image/*" />
                </div> */}

        {/* Image 3 */}
        {/* <div className="flex justify-center items-center">
                  <label htmlFor="upload-photo-3" className="cursor-pointer">
                    <img src="https://via.placeholder.com/150" alt="Upload Image" className="w-24 h-24 rounded-lg border border-gray-300" />
                  </label> */}
        {/* Hidden input for file upload */}
        {/* <input type="file" id="upload-photo-3" className="hidden" accept="image/*" />
                </div> */}

        {/* Image 4 */}
        {/* <div className="flex justify-center items-center">
                  <label htmlFor="upload-photo-4" className="cursor-pointer">
                    <img src="https://via.placeholder.com/150" alt="Upload Image" className="w-24 h-24 rounded-lg border border-gray-300" />
                  </label> */}
        {/* Hidden input for file upload */}
        {/* <input type="file" id="upload-photo-4" className="hidden" accept="image/*" />
                </div> */}

        {/* Image 5 */}
        {/* <div className="flex justify-center items-center">
                  <label htmlFor="upload-photo-5" className="cursor-pointer">
                    <img src="https://via.placeholder.com/150" alt="Upload Image" className="w-24 h-24 rounded-lg border border-gray-300" />
                  </label> */}
        {/* Hidden input for file upload */}
        {/* <input type="file" id="upload-photo-5" className="hidden" accept="image/*" />
                </div>
              </div> */}

        {/* <hr className="my-4" />

              <div className="flex justify-center">
                <button className="bg-white border-2 border-[#9B9B9B]   text-[#9B9B9B] hover:bg-[#9B9B9B] hover:text-white font-medium py-2 px-10 rounded-full">Upload foto</button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Description */}
        {/* <div className="w-full p-8 -mt-5">
          <div className="bg-white rounded-md border shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <hr className="mb-4" />
            <CustomReactQuill theme="snow" value={editorHtml} onChange={handleChange} placeholder="Mulai menulis deskripsi disini..." />
          </div>
        </div> */}

        {/* Jual BUTTON SEBELAH KANAN */}
        {/* <div className="w-full p-8 -mt-5">
          <div className="flex justify-end">
            <button className="bg-primary text-white px-10 py-2 rounded-full focus:outline-none hover:bg-hoverPrimary">Jual</button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default SellingProductCard;
