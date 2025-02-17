import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface AuthFormProps {
    title: string;
    buttonText: string;
    fields: { name: string; type: string; placeholder: string }[];
    onButtonClick: () => void;
    onSubmit: (formData: Record<string, string>) => void;
}

export default function AuthForm({
    title,
    buttonText,
    fields,
    onButtonClick,
    onSubmit,
}: AuthFormProps) {
    const [formData, setFormData] = useState<Record<string, string>>(
        fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, string>)
    );

    const onChange = (eventTargetValue: string, fieldName: string) => {
        setFormData({
            ...formData,
            [fieldName]: eventTargetValue,
        });
    };

    return (
        <div className=" w-xs">
            <header className=" flex items-center justify-between">
                <h1 className=" text-(--text-clr) text-(length:--large-fs) font-bold">
                    {title}
                </h1>
                <Button
                    sx={{
                        background: "var(--text-clr)",
                        color: "var(--background-clr)",
                        fontFamily: "var(--regular-ff)",
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
            <form className=" flex flex-col gap-(--regular-gap)">
                {fields.map((field) => {
                    return (
                        <TextField
                            key={field.name}
                            fullWidth
                            id={field.name}
                            label={field.name}
                            variant="outlined"
                            type={field.type}
                            value={formData[field.name]}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                onChange(event.target.value, field.name);
                            }}
                        />
                    );
                })}
                <div className=" self-end">
                    <Button
                        onClick={() => {
                            onSubmit(formData);
                        }}
                        sx={{
                            background: "var(--text-clr)",
                            color: "var(--background-clr)",
                            fontFamily: "var(--regular-ff)",
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
        </div>
    );
}
