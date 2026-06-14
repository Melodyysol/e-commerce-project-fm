import { FaTimes } from "react-icons/fa";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const Toast = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}) => {
  const [duration, setDuration] = useState<number>(100);

  const intervalRef = useRef<number>(100);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDuration((prev) => prev - 0.1);
    }, 10);

    return () => clearInterval(intervalRef.current);
  }, []);

  // useEffect(() => {
  //   if (isPause) {
  //     return () => clearInterval(intervalRef.current!);
  //   } else {
  //     intervalRef.current = setInterval(() => {
  //       setDuration((prev) => prev - 500);
  //     }, 500);
  //   }
  // }, [isPause]);

  if (duration <= 0) {
    onClose();
  }

  return (
    <motion.div
      initial={{opacity: 0, y: -40}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.35, ease: "easeInOut"}}
      onMouseEnter={() => {
        clearInterval(intervalRef.current);
      }}
      onMouseLeave={() => {
        intervalRef.current = setInterval(() => {
          setDuration((prev) => prev - 0.1);
        }, 10);

        return () => clearInterval(intervalRef.current);
      }}
      className="w-70 rounded bg-base-100 shadow-md mx-auto pointer-events-auto"
    >
      <div className="relative items-center flex gap-4 py-4 pl-3 rounded border border-neutral-content">
        <div
          className={`${type === "error" ? "bg-error " : "bg-success "} h-5 w-5 rounded-full text-base-100 text-center`}
        >
          !
        </div>
        <p>{message}</p>
        <FaTimes
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer text-neutral-content hover:text-base-content transition-all duration-500"
        />
        <motion.div
          className={`h-1 ${type === "error" ? "bg-error " : "bg-success "} absolute bottom-0 left-0 rounded-bl`}
          style={{width: `${duration}%`}}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default Toast;
