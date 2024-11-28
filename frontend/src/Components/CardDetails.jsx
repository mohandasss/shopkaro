import React from "react";

const CardDetails = ({ id, name, image, description, price }) => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
          Product list
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <a
            key={id}
          
            className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
          >
            <div className="">
              <img
                src={image} // Use the 'image' prop here
                alt={`${name} image`} // Updated alt text for better accessibility
                className="w-full aspect-square rounded-2xl object-cover"
              />
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                  {name} {/* Use the 'name' prop */}
                </h6>
                <h6 className="font-semibold text-xl leading-8 text-indigo-600">
                  {price} {/* Use the 'price' prop */}
                </h6>
              </div>
              <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                {description} {/* Use the 'description' prop */}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CardDetails;
