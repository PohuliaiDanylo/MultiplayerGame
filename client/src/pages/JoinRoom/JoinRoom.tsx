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
        if (roomData.players && roomData.players?.length < 2) {
            if (!roomData.hasOwnProperty("password")) {
                navigate(`/game/${roomData._id}`);
            } else {
                console.log("password required");
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
                            key={room._id}
                            className=" flex gap-(--regular-gap) items-center justify-between bg-(--text-clr) rounded-(--regular-br) px-8 py-2 mx-(--regular-gap)"
                        >
                            <header className="w-[20%] overflow-hidden whitespace-nowrap text-(--background-clr) font-bold ">
                                <p className={`w-min`}>{room.roomName}</p>
                            </header>
                            <p className="self-start text-(length:--small-fs) text-(--background-clr) font-bold">
                                Owner: {room.ownerUsername}
                            </p>
                            <div className=" flex items-center overflow-hidden justify-end gap-(--regular-gap) w-[20%] min-w-max">
                                <p>{room.players?.length} / 2</p>
                                <Button
                                    type="button"
                                    sx={{
                                        background: "var(--darken-text-clr)",
                                        color: "var(--background-clr)",
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
                        background: "var(--text-clr)",
                        color: "var(--background-clr)",
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
