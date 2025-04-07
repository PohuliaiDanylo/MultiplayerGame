import * as Yup from "yup";

export const createRoomValidation = Yup.object().shape({
    roomName: Yup.string().required("This field is required"),
    password: Yup.string().notRequired(),
});
