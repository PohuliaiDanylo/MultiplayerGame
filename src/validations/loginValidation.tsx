import * as Yup from "yup";

export const loginValidation = () => {
    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .min(5, "5 charachters minimum")
            .required("This field is required"),
        password: Yup.string().required("This field is required"),
    });
    return loginSchema;
};
