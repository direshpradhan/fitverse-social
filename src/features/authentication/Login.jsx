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
    <div className="flex flex-col w-1/3 mt-52 mx-auto">
      <h2 className="font-bold text-2xl">Login</h2>
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
          className="mt-4 py-2 px-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-4 py-2 px-4 border rounded "
        />
        <button type="submit" className="mt-6 bg-black text-white py-2 rounded">
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
