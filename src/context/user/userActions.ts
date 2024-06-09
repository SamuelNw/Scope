import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return userCredentials.user.email;
        } catch (error) {
            // Ensure the error message is a string
            const errorMessage = (error as Error).message || "Failed to login.";
            return rejectWithValue(errorMessage);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
        } catch (error) {
            // Ensure the error message is a string
            const errorMessage =
                (error as Error).message || "Failed to logout the user.";
            return rejectWithValue(errorMessage);
        }
    }
);
