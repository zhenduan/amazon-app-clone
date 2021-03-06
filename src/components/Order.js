import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ id, amount, amountShipping, items, timestamp, images }) {
  return (
    <div className="relative rounded-xl border text-gray-600 bg-gray-200">
      <p className="text-xs pt-5 pl-5 overflow-x-auto">Order ID: {id}</p>
      <div className="flex items-center space-x-10 p-5  text-sm ">
        <div>
          <p className="font-bold text-xs">Order Placed</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>
        <div>
          <p className="font-bold text-xs">Total</p>
          <p>
            <Currency quantity={amount} /> - Shipping fee{" "}
            <Currency quantity={amountShipping} />
          </p>
        </div>
        <div>
          <p className="font-bold text-xs">Shipping fee:</p>
          <p>
            {amountShipping == null ? (
              "Free"
            ) : (
              <Currency quantity={amountShipping} />
            )}
          </p>
        </div>

        <p className="text-sm whitespace-nowrap sm:text-base self-end flex-1 text-right text-gray-900">
          {items?.length} Items
        </p>

        {/* <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          Order <b># {id}</b>
        </p> */}
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images &&
            images?.map((image) => (
              <img
                className="rounded-lg h-20 object-cover lg:h-32 mr-1"
                src={image}
                loading="lazy"
                alt=""
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
