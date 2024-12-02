import React, { useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Pagination = ({ totalPages = 5, onPageChange }) => {
  const [active, setActive] = React.useState(1);

  // Fetch products when the page changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?page=${active}&limit=6`);
        
        
        if (onPageChange) onPageChange(response.data);  // Pass relevant data to parent
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [active, onPageChange]); // Re-fetch when the page number changes

  // Ensure the correct page change
  const getItemProps = (index) => ({
    className: `px-3 py-1 rounded-full cursor-pointer ${active === index ? "bg-gray-600 text-white" : "text-gray-600"}`,
    onClick: () => {
      setActive(index);
    },
  });

  const next = () => {
    if (active < totalPages) {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="flex items-center gap-2 text-black disabled:text-gray-300 cursor-pointer"
        onClick={prev}
        disabled={active === 1}
        aria-label="Previous Page"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-black" />
        Previous
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            {...getItemProps(index + 1)}
            key={index}
            className={`px-3 py-1 rounded-full cursor-pointer ${active === index + 1 ? "bg-black text-white" : "text-gray-600"}`}
            aria-label={`Page ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="flex items-center gap-2 text-black disabled:text-gray-300 cursor-pointer"
        onClick={next}
        disabled={active === totalPages}
        aria-label="Next Page"
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="text-black h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
