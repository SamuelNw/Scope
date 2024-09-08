import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Register } from "../../src/pages/auth";
import { it, expect, describe } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("Register Component", () => {
    it("should render the form correctly", () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        expect(screen.getByText(/Create An Account/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();

        // Get all elements labeled 'Password'
        const passwordFields = screen.getAllByLabelText(/Password/i);
        expect(passwordFields.length).toBeTruthy();
        expect(screen.getByText(/CREATE ACCOUNT/i)).toBeInTheDocument();
    });

    it("should show a loading message when creating an account", async () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText("Password-box"), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByText(/CREATE ACCOUNT/i));

        // Verify loading message appears
        expect(screen.getByText(/Creating.../i)).toBeInTheDocument();
    });
});
