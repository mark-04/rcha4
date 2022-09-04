import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GlobalContext } from "../App";
import styles from "./ProductList.module.css";

function fetchProductInfo(stateCb) {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((res) => {
      const accumulator = new Map();
      const products = res.reduce(
        (acc, next) => acc.set(next.id, next),
        accumulator
      );
      stateCb(products);
    });
}

export function ProductList() {
  const [productInfo, setProductInfo] = useState(new Map());

  useEffect(() => {
    fetchProductInfo(setProductInfo);
  }, []);

  let products = [];
  for (const [, prod] of productInfo) {
    products.push(prod);
  }

  return (
    <div className={styles.product_list}>
      {products.map((productProps) => (
        <Product {...productProps} key={productProps.id} />
      ))}
    </div>
  );
}

function Product(props) {
  const { glob, setGlob } = useContext(GlobalContext);

  return (
    <div className={styles.product}>
      <img src={props.image} className={styles.product_image} />
      <div className={styles.product_info_container}>
        {/**Should be a <Link> */}
        <a className={styles.product_title}>
          {props.title.length > 20
            ? props.title.slice(0, 20) + "..."
            : props.title}
        </a>
        <div className={styles.product_price_container}>
          <span className={styles.product_price}>{"$" + props.price}</span>
          <button
            className={styles.add_to_cart_button}
            onClick={(event) => {
              event.preventDefault();

              tryAddToCart(glob, setGlob, {
                id: props.id,
                quantity: 1,
                price: props.price,
              });
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

function tryAddToCart(glob, setGlob, product) {
  if (glob.isUserLogedIn) {
    const updatedCart = addToCard(glob.cart, product);

    setGlob({ ...glob, cart: updatedCart });
  } else {
    setGlob({ ...glob, showLoginPrompt: true });
  }
}

function addToCard(cart, { id, quantity: addQuantity, price }) {
  const prodKey = String(id);
  if (prodKey in cart) {
    const { quantity: currentQuantity } = cart[prodKey];
    const newQuantity = currentQuantity + addQuantity;
    const newTotalCost = newQuantity * price;

    return {
      ...cart,
      [prodKey]: { quantity: newQuantity, price, totalCost: newTotalCost },
    };
  } else {
    const totalPrice = addQuantity * price;

    return { ...cart, [prodKey]: { quantity: addQuantity, price, totalPrice } };
  }
}
