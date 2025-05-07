describe("Hello World Page E2E Test", () => {
    beforeEach(() => {
        // Ensure the app is loaded before each test
        cy.visit("/"); // Adjust if your app runs at a different route
    });

    it("checks if Date Events is rendered", () => {
        // Check if the Hello World message is present
        cy.contains("Date Events").should("be.visible");
    });

    // it("checks if DateHeader is rendering correctly", () => {
    //     // Format the expected date and time based on the current mocked date (adjust accordingly)
    //     // const now = new Date(2025, 0, 5, 14, 30, 0); // Mocked date: January 5, 2025, 14:30
    //     const now = new Date();
    //     const formattedDate = `${
    //         now.getMonth() + 1
    //     }/${now.getDate()}/${now.getFullYear()}`;
    //     const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    //     // Check if the formatted Date is visible
    //     cy.contains(`Date: ${formattedDate}`).should("be.visible");
    //     // Check if the formatted Time is visible
    //     cy.contains(`Time: ${formattedTime}`).should("be.visible");
    // });
});
