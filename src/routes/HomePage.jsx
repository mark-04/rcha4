import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import LoginPrompt from "../LoginPrompt/LoginPrompt";

export default function HomePage() {
  const { glob, setGlob } = useContext(GlobalContext);
  const navigate = useNavigate();

  function showLoginPrompt(e) {
    setGlob({ ...glob, showLoginPrompt: true });
  }

  function logOut(e) {
    setGlob({ ...glob, isUserLogedIn: false });
    navigate("/");
  }

  if (glob.showLoginPrompt) {
    document.querySelector("body").style.overflow = "hidden";
  } else {
    document.querySelector("body").style.overflow = "auto";
  }

  return (
    <>
      {glob.showLoginPrompt && <LoginPrompt />}
      <nav className="navigation">
        <Link to="/">Home page</Link>
        <Link to="/about">About our store</Link>
        {glob.isUserLogedIn ? (
          <a href="#" onClick={logOut}>
            Log out
          </a>
        ) : (
          <a href="#" onClick={showLoginPrompt}>
            Log in
          </a>
        )}
        {glob.isUserLogedIn && <Cart />}
      </nav>
      <Outlet />
    </>
  );
}

function Cart() {
  const { glob } = useContext(GlobalContext);
  const { cart } = glob;
  let totalItems = 0,
    totalCost = 0;

  for (let prodId in cart) {
    totalItems += cart[prodId].quantity;
    totalCost += cart[prodId].quantity * cart[prodId].price;
  }

  return (
    <p
      style={{
        marginLeft: "4em",
        backgroundColor: "#5c5cc7",
        borderRadius: "5px",
        color: "#fff",
        padding: ".2em .4em .5em",
      }}
    >{`You have ${totalItems} items in your cart. Total: $${(
      Math.floor(totalCost * 100) / 100
    ).toFixed(2)}`}</p>
  );
}
