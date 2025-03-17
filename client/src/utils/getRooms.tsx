export type Room = {
    _id?: string;
    roomName: string;
    password?: string;
    ownerId: string;
    ownerUsername: string;
    status: string;
    players?: string[];
};

export function getRooms(
    setFunction: React.Dispatch<React.SetStateAction<Room[]>>
) {
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    fetch(`${API_URL}/api/room/getAll`, {
        method: "get",
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.rooms) {
                alert(data.message);
                return;
            }
            setFunction(data.rooms);
        })
        .catch((err) => {
            alert("Error, try later");
        });
}
