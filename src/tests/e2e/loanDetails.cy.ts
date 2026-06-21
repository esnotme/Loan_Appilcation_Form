// Helper: navigate through steps 0-2 to reach Loan Details (step 3)
const goToLoanDetails = () => {
  cy.visit("/");
  cy.get('input[type="radio"][value="personal"]').check();
  cy.contains("button", "Next").click();
  cy.get('input').first().type("Ravi Kumar");
  cy.get('input[type="date"]').type("1990-05-15");
  cy.get('input[type="email"]').type("ravi@example.com");
  cy.get('input[type="tel"]').type("9876543210");
  cy.get('input[placeholder="ABCDE1234F"]').type("ABCDE1234F");
  cy.get('input[placeholder="12-digit number"]').type("123456789012");
  cy.contains("button", "Next").click();
  cy.get("select").select("Salaried");
  cy.get('input').eq(0).type("TechCorp Ltd");
  cy.get('input').eq(1).type("Software Engineer");
  cy.get('input[type="number"]').eq(0).type("75000");
  cy.get('input[type="number"]').eq(1).type("3");
  cy.contains("button", "Next").click();
};

describe("Step 4 – Loan Details", () => {
  beforeEach(goToLoanDetails);

  it("shows the loan details form", () => {
    cy.contains("Loan Details").should("be.visible");
  });

  it("shows error when loan amount is missing", () => {
    cy.contains("button", "Next").click();
    cy.contains("Loan amount is required").should("be.visible");
  });

  it("calculates and shows EMI when amount and tenure are entered", () => {
    cy.get('input[type="number"]').eq(0).type("100000");
    cy.get('input[type="number"]').eq(1).type("12");
    // EMI should appear and be a non-zero number
    cy.get("p.text-lg").invoke("text").should("match", /\d+\.\d{2}/);
  });

  it("advances to Co-Applicant step with valid data", () => {
    cy.get('input[type="number"]').eq(0).type("100000");
    cy.get('input[type="number"]').eq(1).type("12");
    cy.get('input[placeholder="Enter purpose"]').type("Home renovation");
    cy.contains("button", "Next").click();
    cy.contains("Co-Applicant").should("be.visible");
  });

  it("Back button goes to Employment step", () => {
    cy.contains("button", "Back").click();
    cy.contains("Employment Information").should("be.visible");
  });
});
