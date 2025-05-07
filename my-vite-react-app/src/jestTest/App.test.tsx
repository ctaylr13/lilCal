import { render, screen } from "@testing-library/react";
import App from "../App.tsx";

describe("App Component", () => {
    test("renders Date events Text", () => {
        render(<App />);
        const helloElement = screen.getByText(/Date Events/i);
        expect(helloElement).toBeInTheDocument();
    });
});
