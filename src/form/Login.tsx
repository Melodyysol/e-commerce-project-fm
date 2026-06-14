import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaLock, FaUnlock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import type { FormData } from "../types/form";
import { supabase } from "../lib/supabase";

export const Login = () => {
  const [isLock, setIsLock] = useState(true);
  const [showTootlips, setShowTootLips] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    setError,
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
        setError("password", {
          type: "manual",
          message: error.message,
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
          <div className="relative">
            <input
              type={isLock ? "password" : "text"}
              id="password"
              className="input input-lg bg-base-300 w-full pr-8"
              {...register("password", {
                required: "Password is require",
              })}
            />
            <button
              onMouseEnter={() => {
                setTimeout(() => {
                  setShowTootLips(true);
                }, 2500);
              }}
              onMouseLeave={() => setShowTootLips(false)}
              type="button"
              onClick={() => setIsLock((prev) => !prev)}
              className="absolute top-3.5 right-2 cursor-pointer text-base-context hover:opacity-70"
            >
              {isLock ? <FaLock /> : <FaUnlock />}
            </button>
            {showTootlips && (
              <span className="absolute text-xs bg-base-300 -bottom-5 -right-5 p-1 rounded-md whitespace-nowrap">
                {isLock ? "Toggle to show" : "Toggle to hide"}
              </span>
            )}
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
    </main>
  );
};
