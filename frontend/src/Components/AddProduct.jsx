import React, { useState } from "react";
import { addProduct } from "../Apis/productAPI";

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

  // Mapping category names to their respective IDs
  const categoryMapping = {
    Fashion: "673e274f9542d2d356732812",
    Gadgets: "673eb8f556236d3f93236ad9",
    Furniture: "674c6b25d9cdc82043dd4f46",
    HomeAppliances: "674dd51ec7790cb1e164ea93",
  };

  const categories = ["Fashion", "Gadgets", "Furniture", "Home Appliances"];

  const handleChange = (e) => {
    let { name, value } = e.target;

    // If the category is selected, map the name to its corresponding ID
    if (name === "category") {
      value = categoryMapping[value]; // Map category name to ID
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Ensure file is stored
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category); // Send the category ID
    data.append("quantity", formData.quantity);
    data.append("rating", formData.rating);
    data.append("imageURL", formData.image); // Ensure key matches backend expectation
  
    // Debug: Log FormData contents
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await addProduct(data);
      alert("✅ Product added successfully!");
      console.log("Response:", response);
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("❌ Failed to add product!");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />

        <select name="category" onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} />
        <input type="number" step="0.1" name="rating" placeholder="Rating" onChange={handleChange} />
        <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
