import React from "react";
import {
  Button,
  IconButton,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom"; // To access the state
import Loader from "./Loader";

const ProductDetails = () => {
  const { state } = useLocation(); // Receive the state passed from CardDetails

  if (!state) {
    return <Loader/>;
  }

  const { image, name, price, rating, description } = state;

  return (
    <section className="py-16 px-8">
      <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
        <img
          src={image}
          alt={name}
          className="h-[36rem]"
        />
        <div>
          <Typography className="mb-4" variant="h3">
            {name}
          </Typography>
          <Typography variant="h5">${price}</Typography>
          <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
            {description}
          </Typography>
          <div className="my-8 flex items-center gap-2">
            <Rating value={rating} className="text-amber-500" />
            <Typography className="!text-sm font-bold !text-gray-700">
              {rating} / 5 (100 reviews)
            </Typography>
          </div>
          <Typography color="blue-gray" variant="h6">
            Color
          </Typography>
          <div className="my-8 mt-3 flex items-center gap-2">
            {/* Add color options dynamically if needed */}
            <div className="h-5 w-5 rounded border border-gray-900 bg-blue-gray-600 "></div>
            <div className="h-5 w-5 rounded border border-blue-gray-100 "></div>
            <div className="h-5 w-5 rounded border border-blue-gray-100 bg-gray-900 "></div>
          </div>
          <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
            <Button color="gray" className="w-52">
              Add to Cart
            </Button>
            <IconButton color="gray" variant="text" className="shrink-0">
              <HeartIcon className="h-6 w-6" />
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
