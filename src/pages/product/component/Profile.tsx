import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../../custom-hooks/useAuth";
import { useShow } from "../../../custom-hooks/useShow";

export const Profile = ({
  userProfile,
  setUserProfile,
}: {
  userProfile: string;
  setUserProfile: (profile: string) => void;
}) => {
  const { user } = useAuth();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const localImage = URL.createObjectURL(selectedFile);

      setUserProfile(localImage);
    }
  };

  const { toggleShow } = useShow();

  return (
    <section className="absolute z-30 w-screen top-15 flex justify-center md:justify-end md:right-5 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-base-200 rounded-md w-11/12 py-5 flex flex-col gap-5 shadow-2xl md:w-84 pointer-events-auto"
        >
          <div className="w-10/12 mx-auto">
            <h1 className="font-extrabold">Profile</h1>
          </div>

          <hr className="border-base-300" />
          <div className="flex justify-between w-10/12 mx-auto items-center flex-col">
            <button
              className="tooltip tooltip-bottom cursor-pointer mx-auto relative group"
              type="button"
              data-tip="Update Profile Image"
            >
              <img
                src={userProfile}
                alt="user-img"
                className="rounded-full w-16 h-16 object-cover"
              />
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </button>
            <p>{user?.email || "demo@gmail.com"}</p>
          </div>
          <div className="w-10/12 mx-auto">
            <button className="btn btn-primary btn-block" onClick={() => toggleShow("profile")}>Save</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
