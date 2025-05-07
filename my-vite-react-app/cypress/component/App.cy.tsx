// describe('App.cy.tsx', () => {
//   it('playground', () => {
//     // cy.mount()
//   })
// })
import React from "react";
import { mount } from "@cypress/react";
import App from "../../src/App";

describe("App Component", () => {
    it("renders Date Events", () => {
        mount(<App />);
        cy.contains("Date Events").should("exist");
    });
});
