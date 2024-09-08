import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import { Header } from "../../src/components";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../src/context/user/userReducer";

// Create a mock store for testing
const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

describe("Header", () => {
    it("should show a logo with the project name", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        const projectName = "Scope";

        const links = screen.getAllByRole("link");
        const logo = links.find((link) => link.textContent === projectName);

        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("href", "/");
    });

    it("should have a button with text login, when the user is not logged in", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/Login/i);
    });
});
