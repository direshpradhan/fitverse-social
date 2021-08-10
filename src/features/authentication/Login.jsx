import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "./authSlice";

export const Login = () => {
  const { token } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (event) => {
    event.preventDefault();
    if ((username !== "" || email !== "") && password !== "") {
      dispatch(loginUser({ email, username, password }));
    }
  };

  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);

  return (
    <div className="flex flex-col w-11/12 md:w-1/2 lg:w-1/3 pt-52 mx-auto h-screen">
      <h2 className="font-bold text-3xl text-center mb-4">
        Login to Fitverse Social
      </h2>
      <form className="flex flex-col" onSubmit={(event) => loginHandler(event)}>
        <input
          type="text"
          placeholder="Email/Username"
          value={email ? email : username}
          onChange={(event) =>
            event.target.value.includes("@")
              ? setEmail(event.target.value)
              : setUsername(event.target.value)
          }
          className="mt-4 py-2 px-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-4 py-2 px-4 border rounded-md "
        />
        <button
          type="submit"
          className="mt-6 bg-black text-white py-2 rounded-md"
        >
          Login
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-600">
          Signup
        </a>
      </p>
    </div>
  );
};
