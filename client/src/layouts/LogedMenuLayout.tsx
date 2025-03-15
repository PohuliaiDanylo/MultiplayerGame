import { Outlet } from "react-router";

export default function LogedMenuLayout() {
    return (
        <div className=" bg-(--background-clr) min-h-screen overflow-hidden flex items-center justify-center">
            <Outlet />
        </div>
    );
}
