import { createContext } from "react";

type Toast = {
  message: string;
  type: "success" | "error";
  id: string;
};

type ToastContextType = {
  toasts: Toast[];
  dispatch: React.ActionDispatch<[action: ToastAction]>;
};
type ToastAction =
  | { type: "error"; payload: { id: string; message: string } }
  | { type: "success"; payload: { id: string; message: string } }
  | { type: "removeToast"; payload: { id: string } };

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const toastReducer = (state: Toast[], action: ToastAction) => {
  switch (action.type) {
    case "error":
    case "success":
      return [
        ...state,
        {
          type: action.type,
          id: action.payload.id,
          message: action.payload.message,
        },
      ];

    case "removeToast":
      return state.filter((toast) => toast.id !== action.payload.id);
    default:
      return state;
  }
};
