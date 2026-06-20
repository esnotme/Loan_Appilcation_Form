const goToEmployment = () => {
  cy.visit("/");
  cy.get('input[type="radio"][value="personal"]').check();
  cy.contains("button", "Next").click();
  // Fill personal info
  cy.get('input').first().type("Ravi Kumar");
  cy.get('input[type="date"]').type("1990-05-15");
  cy.get('input[type="email"]').type("ravi@example.com");
  cy.get('input[type="tel"]').type("9876543210");
  cy.get('input[placeholder="ABCDE1234F"]').type("ABCDE1234F");
  cy.get('input[placeholder="12-digit number"]').type("123456789012");
  cy.contains("button", "Next").click();
};

describe("Step 3 – Employment Information", () => {
  beforeEach(goToEmployment);

  it("shows the employment form", () => {
    cy.contains("Employment Information").should("be.visible");
  });

  it("shows validation error when submitting empty form", () => {
    cy.contains("button", "Next").click();
    cy.get("p.text-red-600").should("exist");
  });

  it("requires employment type selection", () => {
    cy.get('input[placeholder*="employer"], input').first().type("TechCorp");
    cy.contains("button", "Next").click();
    cy.contains("Employment type is required").should("be.visible");
  });

  it("advances to Loan Details with valid data", () => {
    cy.get("select").select("Salaried");
    cy.get('input').eq(0).type("TechCorp Ltd");
    cy.get('input').eq(1).type("Software Engineer");
    cy.get('input[type="number"]').eq(0).type("75000");
    cy.get('input[type="number"]').eq(1).type("3");
    cy.contains("button", "Next").click();
    cy.contains("Loan Details").should("be.visible");
  });

  it("Back button goes to Personal Info", () => {
    cy.contains("button", "Back").click();
    cy.contains("Personal Information").should("be.visible");
  });
});
