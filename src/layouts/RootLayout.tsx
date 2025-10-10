import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
}
