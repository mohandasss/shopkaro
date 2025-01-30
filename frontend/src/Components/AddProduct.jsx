import React, { useState } from "react";
import { addProduct } from "../Apis/productAPI";
import Popup from "./popup";
import Loader from "./Loader";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    rating: "",
    image: null, // Store file object
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // For the popup visibility
  const [message, setMessage] = useState(""); // To store the message for the popup
  const [loading, setLoading] = useState(false); // For the loader visibility

  const categoryMapping = {
    Fashion: "673e274f9542d2d356732812",
    Gadgets: "673eb8f556236d3f93236ad9",
    Furniture: "674c6b25d9cdc82043dd4f46",
    HomeAppliances: "674dd51ec7790cb1e164ea93",
  };

  const categories = ["Fashion", "Gadgets", "Furniture", "Home Appliances"];

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "category") {
      value = categoryMapping[value]; // Map category name to ID
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });

    // Create image preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the loader when the form is being submitted

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("quantity", formData.quantity);
    data.append("rating", formData.rating);
    data.append("imageURL", formData.image);

    try {
      const response = await addProduct(data);
      setMessage("✅ Product added successfully!");
      setIsVisible(true);

      // Clear fields and hide loader after 3 seconds
      setTimeout(() => {
        setIsVisible(false);
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          rating: "",
          image: null,
        });
        setPreviewImage(null);
        setLoading(false); // Hide loader
      }, 1000); // Hide popup after 3 seconds
    } catch (error) {
      setMessage("❌ Failed to add product!");
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
        setLoading(false); // Hide loader on error as well
      }, 3000);
    }
  }
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Product</h2>
      {loading && <Loader />}
      {/* Popup Notification */}
      {isVisible && (
        <Popup message={message} isVisible={true}/>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Product Description"
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <select
            name="category"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Image Upload */}
        <div className="relative">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full p-3 rounded-md border border-gray-300 cursor-pointer"
          />
          {previewImage && (
            <div className="mt-4 flex justify-center">
              <img
                src={previewImage}
                alt="Image Preview"
                className="max-w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
