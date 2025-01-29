import { useState } from 'react';
import { addProduct } from '../Apis/productAPI';

const Addproduct = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    rating: '',
  });
  const [imageFile, setImageFile] = useState(null); // To store the selected image file

  // Handle image file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save the file to send to the backend
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Show the preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  // Form Submission handler
const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!imageFile) {
      alert('Please upload a product image.');
      return;
    }
  
    // Create a FormData object to send the form data and image
    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('category', formData.category);
    productData.append('description', formData.description);
    productData.append('price', formData.price);
    productData.append('quantity', formData.quantity);
    productData.append('rating', formData.rating);
    productData.append('imageURL', imageFile); // Append the image file
  
    try {
      await addProduct(productData); // Call the API function
      alert('Product added successfully!');
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        quantity: '',
        rating: '',
      });
      setPreviewImage(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };
  

  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Books'];
  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Product</h2>

      {/* Image Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
          <div className="space-y-1 text-center">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
            ) : (
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 px-2 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
          />
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 px-2 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 px-2 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700"
          >
            <option value="">Select rating</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-6 mt-6">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
