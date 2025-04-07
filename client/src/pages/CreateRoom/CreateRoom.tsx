import { Formik } from "formik";
import { useNavigate } from "react-router";
import { TextField, Button } from "@mui/material";
import { createRoomValidation } from "../../validations/createRoomValidation";
import { useAuth } from "../../context/AuthContext";
import { socket } from "../../utils/socket";

export default function CreateRoom() {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const onSubmit = async (formData: Record<string, string>) => {
        if (user?.id) {
            try {
                const response = await socket.emitWithAck(
                    "createRoom",
                    formData.roomName,
                    formData.password,
                    user.id,
                    user.username
                );
                console.log(response);
                if (!response.room) {
                    alert(response.message);
                    return;
                }
                navigate(`/game/${response.room._id}`);
            } catch (error) {
                alert("Error, try later");
            }
        } else {
            logout();
        }
    };

    return (
        <main className=" flex flex-col gap-(--regular-gap)">
            <h1 className="text-(length:--large-fs) text-(--text-clr) font-bold leading-(--large-fs)">
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
