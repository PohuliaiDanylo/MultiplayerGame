import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
    username: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
});
