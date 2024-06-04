import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../context/store";
import { useDispatch } from "react-redux";
import { logoutUser } from "../context/user/userActions";

const HomeActionButtons = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { email } = useSelector((state: RootState) => state.user);

    const handleSignout = async () => {
        try {
            await dispatch(logoutUser());

            // redirect user to landing page:
            navigate("/");
        } catch (e) {
            console.error("Error while trying to logout: ", e);
        }
    };
    return (
        <Box>
            {!email ? (
                <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    <Button
                        sx={{
                            color: "inherit",
                            border: "1px solid white",
                            outline: "none !important",
                        }}
                    >
                        Login
                    </Button>
                </Link>
            ) : (
                <Button
                    variant="contained"
                    type="button"
                    onClick={handleSignout}
                    sx={{
                        color: "inherit",
                        border: "1px solid white",
                        outline: "none !important",
                    }}
                >
                    Sign Out
                </Button>
            )}
        </Box>
    );
};

export default HomeActionButtons;
