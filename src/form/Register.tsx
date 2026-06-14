import { useContext, useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaLock, FaRegUser, FaUnlock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabase";
import type { FormData } from "../types/form";
import { ToastContext } from "../hooks/useToast";
import Toast from "../components/Toast";
export const Register = () => {
  const navigate = useNavigate();
  const [isLock, setIsLock] = useState(true);

  const toastContext = useContext(ToastContext);

  useEffect(() => {
    document.title = "Register";
  }, []);

  if (!toastContext) {
    throw new Error("toastContext must be provided");
  }

  const {
    handleSubmit,
    register,
    // setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (value) => {
    try {
      const username = value.fname.trim().split(" ")[0];

      const { error } = await supabase.auth.signUp({
        email: value.email,
        password: value.password,
        options: {
          data: { username },
        },
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
        return;
      }
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-200 m-auto w-10/12 max-w-96 shadow-xl hover:shadow-2xl rounded-2xl p-8 flex flex-col gap-5"
      >
        <h1 className="text-center text-2xl text-base-content font-extrabold">
          Register
        </h1>

        <div>
          <label htmlFor="fname" className="label mb-1">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="fname"
              className="input input-lg bg-base-300 w-full pr-8"
              {...register("fname", {
                required: "Full Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            <button
              type="button"
              className="absolute top-3.5 right-2 cursor-pointer text-base-context hover:opacity-70"
            >
              <FaRegUser />
            </button>
          </div>
          {errors.fname && (
            <p className="text-error mt-1 text-sm">{errors.fname.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="label mb-1">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="input input-lg bg-base-300 w-full pr-8"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
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
            <p className="text-error mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="label mb-1">
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
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be 8+ characters with uppercase, lowercase, numbers, and symbols.",
                },
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
            <p className="text-error mt-1 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="btn btn-block btn-primary btn-lg"
        >
          {isSubmitting ? "Registering" : "Register"}
        </button>

        <p className="text-center">
          Already have an account.{" "}
          <Link
            to="/login"
            className="link link-primary no-underline hover:underline"
          >
            Sign in
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
