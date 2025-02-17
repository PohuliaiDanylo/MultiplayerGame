import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root": {
                        background: "var(--accent-clr)",
                        color: "var(--text-clr)",
                    },
                    "& .MuiFormLabel-root": {
                        color: "var(--text-clr)",
                        opacity: 0.5,
                    },
                    "& .MuiFormLabel-filled": {
                        transform: "translate(14px, 0px) scale(75%)",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                        color: "var(--text-clr)",
                        transform: "translate(14px, 0px) scale(75%)",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                },
            },
        },
    },
});

export default theme;
