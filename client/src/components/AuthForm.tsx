import { Button, TextField } from "@mui/material";
import { Formik } from "formik";

import { loginValidation } from "../validations/loginValidation";
import { signinValidation } from "../validations/signinValidation";

interface AuthFormProps {
    title: string;
    buttonText: string;
    fields: { name: string; type: string; placeholder: string }[];
    onButtonClick: () => void;
    onSubmit: (formData: Record<string, string>) => void;
    type: "login" | "signin";
}

export default function AuthForm({
    title,
    buttonText,
    fields,
    onButtonClick,
    onSubmit,
    type,
}: AuthFormProps) {
    return (
        <div className=" w-xs">
            <header className=" flex items-center justify-between">
                <h1 className=" text-(--text-clr) text-(length:--large-fs) font-bold">
                    {title}
                </h1>
                <Button
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
                    onClick={onButtonClick}
                    size="small"
                >
                    {buttonText}
                </Button>
            </header>
            <Formik
                initialValues={fields.reduce((acc, field) => {
                    acc[field.name] = "";
                    return acc;
                }, {} as Record<string, string>)}
                validationSchema={
                    type === "login" ? loginValidation : signinValidation
                }
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <form
                        onSubmit={formik.handleSubmit}
                        className=" flex flex-col gap-(--regular-gap) mt-[8px]"
                    >
                        {fields.map((field) => {
                            return (
                                <TextField
                                    error={
                                        formik.touched[field.name] &&
                                        Boolean(formik.errors[field.name])
                                    }
                                    helperText={
                                        formik.touched[field.name] &&
                                        formik.errors[field.name]
                                    }
                                    key={field.name}
                                    id={field.name}
                                    label={field.placeholder}
                                    variant="outlined"
                                    type={field.type}
                                    {...formik.getFieldProps(field.name)}
                                />
                            );
                        })}
                        <div className=" self-end">
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
                            >
                                Proceed
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
