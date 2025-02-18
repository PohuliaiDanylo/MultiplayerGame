import * as Yup from "yup";

export const signinValidation = () => {
    const signinSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "minimum length is 3 characters")
            .required("This field is required"),
        password: Yup.string()
            .min(8, "minimum length is 8 characters")
            .required("This field is required"),
        confirmPassword: Yup.string()
            .min(8, "minimum length is 8 characters")
            .oneOf([Yup.ref("password")], "Your passwords do not match.")
            .required("This field is required"),
    });
    return signinSchema;
};
