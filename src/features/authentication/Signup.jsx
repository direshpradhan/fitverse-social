import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Alert } from "../../components/alert/Alert";
import { signupUser } from "./authSlice";

export const Signup = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, authStatus, error } = useSelector((state) => state.auth);

  const signupHandler = (event) => {
    event.preventDefault();
    dispatch(signupUser({ firstName, lastName, username, email, password }));
  };

  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);

  return (
    <div className="flex flex-col w-11/12 md:w-1/2 lg:w-1/3 pt-36 mx-auto">
      <h2 className="font-bold text-3xl text-center mb-4">
        Sign up for Fitverse Social
      </h2>
      {authStatus === "error" && <Alert message={error} />}
      <form
        onSubmit={(event) => signupHandler(event)}
        className="flex flex-col"
      >
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="First Name"
            required
            onChange={(event) => setFirstName(event.target.value)}
            className="mt-4 py-3 pl-4 w-1/2 mr-1 border rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            onChange={(event) => setLastName(event.target.value)}
            className="mt-4 py-3 pl-4 w-1/2 ml-1 border rounded-md"
          />
        </div>
        <input
          type="text"
          placeholder="Username"
          required
          onChange={(event) => setUsername(event.target.value)}
          className="mt-4 py-3 px-4 border rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(event) => setEmail(event.target.value)}
          className="mt-4 py-3 px-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(event) => setPassword(event.target.value)}
          className="mt-4 py-3 px-4 border rounded-md"
        />
        <button
          type="submit"
          className="mt-6 bg-black text-white py-2 text-lg rounded-md"
        >
          {authStatus === "loading" ? "Signing up. Please wait..." : "Signup"}
        </button>
      </form>
      <p className="text-center mt-4 text-lg">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </a>
      </p>
    </div>
  );
};
