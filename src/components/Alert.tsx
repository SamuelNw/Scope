import { Box } from "@mui/material";

interface AlertProps {
    type: string;
    message: string;
}

export default function CustomAlert({ type, message }: AlertProps) {
    return (
        <Box
            sx={{
                p: 1.5,
                mb: 1,
                textAlign: "center",
                border:
                    type === "success"
                        ? "1px solid #dff0d8"
                        : "1px solid #f2dede",
                borderRadius: "5px",
                backgroundColor: type === "success" ? "#dff0d8" : "#f2dede",
                color: type === "success" ? "darkgreen" : "darkred",
            }}
        >
            {message}
        </Box>
    );
}
