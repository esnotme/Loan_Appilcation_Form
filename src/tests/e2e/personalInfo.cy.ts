const goToPersonalInfo = () => {
  cy.visit("/");
  cy.get('input[type="radio"][value="personal"]').check();
  cy.contains("button", "Next").click();
};

describe("Step 2 – Personal Information", () => {
  beforeEach(goToPersonalInfo);

  it("shows the personal info form", () => {
    cy.contains("Personal Information").should("be.visible");
  });

  it("shows validation errors when submitting empty form", () => {
    cy.contains("button", "Next").click();
    cy.contains("Full name is required").should("be.visible");
  });

  it("rejects invalid email", () => {
    cy.get('input[type="email"]').type("notanemail");
    cy.contains("button", "Next").click();
    cy.contains("Invalid email").should("be.visible");
  });

  it("rejects short phone number", () => {
    cy.get('input[type="tel"]').type("123");
    cy.contains("button", "Next").click();
    cy.contains("Phone number must be at least 10 digits").should("be.visible");
  });

  it("rejects invalid PAN format", () => {
    cy.get('input[placeholder="ABCDE1234F"]').type("INVALIDPAN");
    cy.contains("button", "Next").click();
    cy.get("p.text-red-600").should("exist");
  });

  it("rejects non-12-digit Aadhaar", () => {
    cy.get('input[placeholder="12-digit number"]').type("123456");
    cy.contains("button", "Next").click();
    cy.get("p.text-red-600").should("exist");
  });

  it("advances to Employment with valid data", () => {
    cy.get('input[placeholder*="Full Name"], input').first().type("Ravi Kumar");
    cy.get('input[type="date"]').type("1990-05-15");
    cy.get('input[type="email"]').type("ravi@example.com");
    cy.get('input[type="tel"]').type("9876543210");
    cy.get('input[placeholder="ABCDE1234F"]').type("ABCDE1234F");
    cy.get('input[placeholder="12-digit number"]').type("123456789012");
    cy.contains("button", "Next").click();
    cy.contains("Employment Information").should("be.visible");
  });

  it("Back button goes to Loan Type step", () => {
    cy.contains("button", "Back").click();
    cy.contains("Select Loan Type").should("be.visible");
  });
});
