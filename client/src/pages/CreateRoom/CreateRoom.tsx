import { Formik } from "formik";
import { useNavigate } from "react-router";
import { TextField, Button } from "@mui/material";
import { createRoomValidation } from "../../validations/createRoomValidation";
import { useAuth } from "../../context/AuthContext";

export default function CreateRoom() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const onSubmit = (formData: Record<string, string>) => {
        if (user?.id) {
            const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
            fetch(`${API_URL}/api/room/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomName: formData.roomName,
                    password: formData.password,
                    ownerId: user.id,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.room) {
                        alert(data.message);
                        return;
                    }
                    console.log(data);
                })
                .catch((err) => {
                    alert("Error, try later");
                });
        } else {
            logout();
        }
    };

    return (
        <main>
            <h1 className="text-(length:--large-fs) text-(--text-clr)">
                Create Room
            </h1>
            <Formik
                initialValues={{ roomName: "", password: "" }}
                validationSchema={createRoomValidation}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col gap-(--regular-gap) w-screen max-w-[350px]"
                    >
                        <TextField
                            key={"roomName"}
                            id={"roomName"}
                            label={"Room Name"}
                            variant="outlined"
                            type={"text"}
                            {...formik.getFieldProps("roomName")}
                        />
                        <TextField
                            key={"password"}
                            id={"password"}
                            label={"Password *"}
                            variant="outlined"
                            type={"password"}
                            {...formik.getFieldProps("password")}
                        />
                        <div className=" flex justify-between">
                            <Button
                                type="button"
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
                                size="small"
                                onClick={() => navigate("/menu")}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
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
                                size="small"
                                disabled={!formik.isValid || !formik.dirty}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </main>
    );
}
