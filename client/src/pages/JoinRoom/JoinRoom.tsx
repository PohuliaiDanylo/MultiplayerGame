import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Room, getRooms } from "../../utils/getRooms";
import { socket } from "../../utils/socket";

export default function JoinRoom() {
    const [rooms, setRooms] = useState<Room[]>([]);

    const navigate = useNavigate();
    const onUpdate = () => {
        getRooms(setRooms);
    };

    const onJoin = (roomData: Room) => {
        if (JSON.parse(roomData.players).length < 2) {
            if (!roomData.hasOwnProperty("password")) {
                navigate(`/game/${roomData.roomId}`);
            } else {
                alert("password required");
            }
        } else {
            alert("room is full");
        }
    };

    useEffect(() => {
        onUpdate();

        socket.on("roomsUpdated", (updatedRooms) => {
            setRooms(updatedRooms);
        });
    }, []);

    return (
        <div className="flex flex-col gap-(--regular-gap)">
            <h1 className=" text-(length:--large-fs) text-(--text-clr) font-bold line leading-(--large-fs)">
                Join Room
            </h1>
            <main className=" h-screen max-h-[30.5rem] w-screen max-w-[60rem] bg-(--accent-clr) rounded-(--regular-br) flex flex-col gap-(--regular-gap) py-(--regular-gap) overflow-scroll overflow-x-hidden">
                {rooms.map((room) => {
                    const hasPassword = room.hasOwnProperty("password");
                    return (
                        <div
                            key={room.roomId}
                            className=" flex gap-(--regular-gap) items-center justify-between bg-(--second-background-clr) rounded-(--regular-br) px-8 py-2 mx-(--regular-gap)"
                        >
                            <header className="w-[20%] overflow-hidden whitespace-nowrap text-(--second-text-clr) font-bold ">
                                <p className={`w-min`}>{room.roomName}</p>
                            </header>
                            <p className="self-start text-(length:--small-fs) text-(--darken-text-clr) font-bold">
                                Owner: {room.ownerUsername}
                            </p>
                            <div className=" flex items-center overflow-hidden justify-end gap-(--regular-gap) w-[20%] min-w-max">
                                <p className="text-(--second-text-clr)">{JSON.parse(room.players).length} / 2</p>
                                <Button
                                    type="button"
                                    sx={{
                                        background: "var(--background-clr)",
                                        color: "var(--darken-text-clr)",
                                        fontFamily: "var(--regular-ff)",
                                        fontSize: "var(--medium-fs)",
                                        fontWeight: 700,
                                        textTransform: "none",
                                    }}
                                    variant="contained"
                                    disableElevation
                                    size="small"
                                    onClick={() => onJoin(room)}
                                >
                                    Join
                                </Button>
                                <img
                                className=" invert"
                                    src={
                                        hasPassword
                                            ? "/password/required.png"
                                            : "/password/unrequired.png"
                                    }
                                    alt="is password required icon"
                                />
                            </div>
                        </div>
                    );
                })}
            </main>
            <div className="flex gap-(--regular-gap)">
                <Button
                    type="submit"
                    sx={{
                        background: "var(--second-background-clr)",
                        color: "var(--second-text-clr)",
                        fontFamily: "var(--regular-ff)",
                        fontSize: "var(--medium-fs)",
                        fontWeight: 700,
                        textTransform: "none",
                    }}
                    variant="contained"
                    disableElevation
                    size="small"
                    onClick={() => navigate("/menu")}
                >
                    Back
                </Button>
            </div>
        </div>
    );
}
