import { Button } from "@mui/material";

import { useAuth } from "../../context/AuthContext";

export default function Menu() {
    const { user, logout } = useAuth();

    return (
        <div className=" bg-(--background-clr) min-h-screen overflow-hidden flex items-center justify-center">
            <div className=" items-start text-(--text-clr) flex flex-col gap-(--regular-gap)">
                <div className=" w-full flex justify-between items-center">
                    <p>{user?.username}</p>
                    <Button
                        sx={{
                            background: "var(--text-clr)",
                            color: "var(--background-clr)",
                            fontFamily: "var(--regular-ff)",
                            fontSize: "var(--small-fs)",
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
                </div>
                <h1 className=" text-(length:--large-fs) font-bold leading-(--large-fs)">
                    Lobby
                </h1>
                <div className=" flex flex-col gap-(--regular-gap)">
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
                        onClick={() => {}}
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
                        onClick={() => {}}
                        size="medium"
                    >
                        Join Room
                    </Button>
                </div>
            </div>
        </div>
    );
}
