import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch } from "../../config/hooks";
import { login } from "./loginSlice";
import "./Login.css";

import AppForm from "../../../shared/components/form/AppForm";
import { loginForm } from "./loginForm";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    const result: any = await dispatch(login(data));

    if (result.meta.requestStatus === "fulfilled") {
      // store user
      localStorage.setItem("user", JSON.stringify(result.payload));

      toast.success("Login successful");

      // redirect
      navigate("/products", { replace: true });
    } else {
      toast.error(result.payload || "Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <img
            className="img-fluid d-block mx-auto mb-3 login-logo"
            src="https://digitalinnk.com/wp-content/uploads/2021/10/Digital-Innk-2021-Green-black-standard.png"
            alt="logo"
          />
          <div className="card p-4 mt-3 mb-3 shadow">
            <h2 className="text-center">Sign in to account</h2>
            <p className="text-center  mb-4">
              Enter your email &amp; password to login
            </p>
            <AppForm
              submitLabel="Login"
              submitClass="btn btn-theme-primary w-100"
              formConfig={loginForm}
              actiontype="create"
              emitData={handleSubmit}
            />
            <div className="mt-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember password
                </label>
              </div>

              <a
                href="#"
                className="float-end"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Forgot password functionality is not implemented yet");
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
