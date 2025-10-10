// src/authLoader.js
import useAuthStore from "@/stores/auth";
import { redirect } from "react-router";

export const AuthLoader = () => {
  const { session } = useAuthStore.getState();

  if (!session) {
    return redirect("/signin");
  }

  return null;
};
