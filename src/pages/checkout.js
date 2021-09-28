import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Currency from "react-currency-formatter";
import CheckoutProduct from "../components/CheckoutProduct";
import { selectTotalItems } from "../slices/basketSlice";

const stripePromise = loadStripe(process.env.stripe_public_key);

function checkout() {
  const items = useSelector(selectItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotal);
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    // const allCategories = items.map(item => item.category)
    // const unique = [...new Set(allCategories)]
    // setCategorys(unique)
  }, [items]);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    // Redirect

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex flex-col  m-5 shadow-sm checkoutBanner">
          {/* <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
            alt="checkout Page Banner Image"
          /> */}

          <div className="flex-grow p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Busket is Empty"
                : "Shopping Busket"}
            </h1>

            {!!items.length &&
              items.map((item, index) => (
                <CheckoutProduct key={item.id} {...item} />
              ))}
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md checkoutBanner">
          <h2 className="whitespace-nowrap">
            Subtotal ({totalItems} items) :
            <span className="font-bold">
              <Currency quantity={totalPrice} />
            </span>
          </h2>
          {items.length == 0 ? (
            <button className="button mt-2" onClick={() => router.push("/")}>
              Shop Now
            </button>
          ) : (
            <button
              role="link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                `cursor-not-allowed from-gray-300 to-gray-500 text-gray-300`
              }`}
            >
              {!session ? "Sign in to checkout" : "Proceed to checkout"}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
