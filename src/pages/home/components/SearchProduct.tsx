import { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { ToastContext } from "../../../hooks/useToast";

export const SearchProduct = () => {
  const toastContext = useContext(ToastContext);
  if (!toastContext) {
    throw new Error("toastContext must be used within ToastProvider");
  }

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<{ search: string }>();
  const onSearch: SubmitHandler<{ search: string }> = (data) => {
    console.log(data.search);
  };

  // useEffect(() => {
  //   if (errors && errors.search) {
  //     const newToast = {
  //       id: crypto.randomUUID(),
  //       message: "Unknown Error",
  //     };

  //     toastContext.dispatch({
  //       type: "error",
  //       payload: newToast,
  //     });
  //     throw errors
  //   }
  //   return
  // }, [errors, toastContext]);

  return (
    <section className="fixed left-0 right-0 z-20 py-10">
      <form
        onSubmit={handleSubmit(onSearch)}
        className="flex gap-2 items-center w-10/12 mx-auto"
      >
        <div className="w-full max-w-70 relative">
          <input
            type="text"
            className="input input-sm input-primary md:input-md"
            placeholder="search"
            {...register("search", { required: "Your search bar is empty" })}
          />

          <button
            type="submit"
            className="absolute right-2 top-2 md:top-3 cursor-pointer tooltip tooltip-bottom"
            data-tip="Search"
          >
            <BiSearch />
          </button>
        </div>
        <button
          type="submit"
          className={`btn btn-primary btn-sm md:btn-md ${isSubmitting && "btn-ghost"}`}
        >
          {isSubmitting ? "Searching" : "Search"}
        </button>
      </form>
    </section>
  );
};
