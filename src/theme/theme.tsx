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
                    },
                    "& .MuiFormLabel-root.Mui-error": {
                        color: "var(--text-clr)",
                    },
                    "& .css-113d811-MuiFormLabel-root-MuiInputLabel-root": {
                        background: "var(--accent-clr)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                    },

                    "& .css-113d811-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                        {
                            color: "var(--accent-clr)",
                            background: "var(--text-clr)",
                        },

                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },

                    "& .css-er619e-MuiFormHelperText-root.Mui-error": {
                        position: "relative",
                        background: "var(--accent-clr)",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        color: "var(--error-clr) !important",
                    },
                },
            },
        },
    },
});

export default theme;
