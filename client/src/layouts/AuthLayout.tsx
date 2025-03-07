import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className=" bg-(--background-clr) h-screen flex items-center justify-center">
            <Outlet />
        </div>
    );
}
