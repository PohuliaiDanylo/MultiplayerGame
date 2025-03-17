import { Button } from "@mui/material";
import { useNavigate } from "react-router";

import { useAuth } from "../../context/AuthContext";

export default function Menu() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <main className=" items-start text-(--text-clr) flex flex-col gap-(--regular-gap) w-screen max-w-[250px]">
            <header className=" w-full flex justify-between items-center">
                <p>{user?.username}</p>
                <Button
                    sx={{
                        background: "var(--text-clr)",
                        color: "var(--background-clr)",
                        fontFamily: "var(--regular-ff)",
                        fontSize: "var(--medium-fs)",
                        fontWeight: 700,
                        textTransform: "none",
                    }}
                    variant="contained"
                    disableElevation
                    onClick={logout}
                    size="small"
                >
                    Sign out
                </Button>
            </header>
            <h1 className=" text-(length:--large-fs) font-bold leading-(--large-fs)">
                Lobby
            </h1>
            <div className=" flex flex-col gap-(--regular-gap) w-full">
                <Button
                    sx={{
                        background: "var(--text-clr)",
                        color: "var(--background-clr)",
                        fontFamily: "var(--regular-ff)",
                        fontSize: "var(--big-fs)",
                        fontWeight: 700,
                        textTransform: "none",
                    }}
                    variant="contained"
                    disableElevation
                    onClick={() => {
                        navigate("/create-room");
                    }}
                    size="medium"
                >
                    Create Room
                </Button>
                <Button
                    sx={{
                        background: "var(--text-clr)",
                        color: "var(--background-clr)",
                        fontFamily: "var(--regular-ff)",
                        fontSize: "var(--big-fs)",
                        fontWeight: 700,
                        textTransform: "none",
                    }}
                    variant="contained"
                    disableElevation
                    onClick={() => {
                        navigate("/join-room");
                    }}
                    size="medium"
                >
                    Join Room
                </Button>
            </div>
        </main>
    );
}
