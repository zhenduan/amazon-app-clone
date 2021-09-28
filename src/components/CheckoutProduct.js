import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import { removeFromBasket } from "../slices/basketSlice";
import QuantityCount from "./QuantityCount";

const MAX_RATING = 5;
const MIN_RITING = 1;

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  quantity,
}) {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const dispatch = useDispatch();
  //   remove product from basket
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RITING + 1)) + MIN_RITING
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 bg-white box-border p-6 rounded-lg shadow-lg">
      {/* image */}
      <div className="rounded-lg checkoutImageWrapper shadow-xl">
        <img src={image} className="productCheckOutImage rounded-lg " />
      </div>
      {/* description */}
      <div className="lg:col-span-3 xl:col-span-3 mx-5 sm:mx-3">
        <h4 className="font-bold my-2 line-clamp-1">{title}</h4>
        <p className="text-lg mb-1 text-gray-800 font-medium">id: {id}</p>

        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4"
                fill="#FBBF24"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
        </div>

        <p className="text-xs text-gray-500 my-4 line-clamp-3">{description}</p>
        {quantity > 1 ? (
          <div className="font-extrabold">
            <Currency quantity={price} /> {" * "} {quantity} {" = "}
            <Currency quantity={price * quantity} />
          </div>
        ) : (
          <div className="font-extrabold">
            <Currency quantity={price} />
          </div>
        )}

        {hasPrime && (
          <div className="flex space-x-2 items-center">
            <img
              className="w-12 h-12"
              src="https://links.papareact.com/fdw"
              alt="primeimage"
            />
            <p className="text-sm font-semibold text-gray-500">
              FREE Next-day Delivery
            </p>
          </div>
        )}
      </div>
      {/* button group */}
      <div className="flex flex-col justify-center">
        <QuantityCount
          id={id}
          dispatch
          setQuantity={setItemQuantity}
          quantity={itemQuantity}
        />

        <button className="button mt-3" onClick={removeItemFromBasket}>
          REMOVE FROM BUSKETS
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
