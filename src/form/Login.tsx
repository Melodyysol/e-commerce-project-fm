import { useContext, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaLock, FaUnlock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import type { FormData } from "../types/form";
import { supabase } from "../lib/supabase";
import { ToastContext } from "../hooks/useToast";
import Toast from "../components/Toast";

export const Login = () => {
  const [isLock, setIsLock] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const toastContext = useContext(ToastContext);

  if (!toastContext) {
    throw new Error("toastContext must be provided");
  }

  const {
    register,
    // setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        // setError("password", {
        //   type: "manual",
        //   message: error.message,
        // });
        const newToast = {
          id: crypto.randomUUID(),
          message: error.message,
        };

        toastContext.dispatch({
          type: "error",
          payload: newToast,
        });
        throw error;
      }
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 m-auto w-10/12 max-w-96 shadow-xl hover:shadow-2xl rounded-md p-4 flex flex-col gap-8 py-10"
      >
        <h1 className="text-center text-2xl text-base-content font-extrabold">
          Login
        </h1>

        <div>
          <label htmlFor="email" className="label mb-2">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="input input-lg bg-base-300 w-full pr-8"
              {...register("email", {
                required: "Email is require",
              })}
            />
            <button
              type="button"
              className="absolute top-3.5 right-2 cursor-pointer text-base-context hover:opacity-70"
            >
              <MdEmail />
            </button>
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-error">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="label mb-2">
            Password
          </label>
          <div
            className="relative tooltip tooltip-bottom"
            data-tip={isLock ? "Show password" : "Hide password"}
          >
            <input
              type={isLock ? "password" : "text"}
              id="password"
              className="input input-lg bg-base-300 w-full pr-8"
              {...register("password", {
                required: "Password is require",
              })}
            />
            <button
              type="button"
              onClick={() => setIsLock((prev) => !prev)}
              className="absolute top-3.5 right-2 cursor-pointer text-base-context hover:opacity-70"
            >
              {isLock ? <FaLock /> : <FaUnlock />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error">{errors.password.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className={`btn btn-block btn-primary btn-lg ${isSubmitting ? "btn-disabled" : ""}`}
        >
          {isSubmitting ? "Login..." : "Login"}
        </button>
        <button type="button" className="btn btn-secondary">
          Guest
        </button>

        <p className="text-center">
          Don't have an account.{" "}
          <Link
            to="/register"
            className="link link-primary no-underline hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
      <div className=" gap-4 flex flex-col fixed top-5 left-0 right-0 pointer-events-none">
        {toastContext.toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => {
              toastContext.dispatch({
                type: "removeToast",
                payload: { id: toast.id },
              });
            }}
          />
        ))}
      </div>
    </main>
  );
};
