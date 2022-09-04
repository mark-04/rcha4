import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

export default function LoginPrompt() {
  const { glob, setGlob } = useContext(GlobalContext);
  const [loginField, setLoginField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (loginField === "Aladin" && passwordField === "Sezam") {
      setGlob({ ...glob, isUserLogedIn: true, showLoginPrompt: false });
      navigate("/");
    } else {
      setError(true);
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    setGlob({ ...glob, showLoginPrompt: false });
  }

  return (
    <div className="login_prompt_container">
      <div className="login_prompt_modal">
        <h2>Please log in</h2>
        <form className="login_prompt_form">
          <label className="login_prompt_label">
            Login
            <input
              type="email"
              value={loginField}
              onChange={(e) => {
                setError(false);
                setLoginField(e.target.value);
              }}
              className="login_prompt_input"
            />
          </label>
          <label className="login_prompt_label">
            Password
            <input
              type="password"
              value={passwordField}
              onChange={(e) => {
                setError(false);
                setPasswordField(e.target.value);
              }}
              className="login_prompt_input"
            />
          </label>
          <div className="login_prompt_buttons">
            <button className="login_prompt_button" onClick={handleSubmit}>
              Submit
            </button>
            <button className="login_prompt_button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
          {error && (
            <p style={{ color: "red", margin: "0" }}>Wrong email or password</p>
          )}
        </form>
      </div>
    </div>
  );
}
