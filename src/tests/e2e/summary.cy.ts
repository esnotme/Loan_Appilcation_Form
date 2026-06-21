// Full happy-path helper to reach Review step (step 8)
const goToReview = () => {
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
  cy.get('input[type="number"]').eq(0).type("100000");
  cy.get('input[type="number"]').eq(1).type("12");
  cy.contains("button", "Next").click();
  // Co-applicant step — submit without enabling co-applicant
  cy.contains("Co-Applicant Information").should("be.visible");
  cy.contains("button", "Next").click();
  cy.get('input[placeholder="Enter street"]').type("123 Main Street");
  cy.get('input[placeholder="Enter postal code"]').type("400001");
  cy.contains("button", "Next").click();
  cy.contains("button", "Next").click(); // skip document upload
  cy.get('input[placeholder="Type your full name"]').type("Ravi Kumar");
  cy.get('input[type="checkbox"]').check();
  cy.contains("button", "Next").click();
};

describe("Step 9 – Review", () => {
  beforeEach(goToReview);

  it("shows review step with all sections", () => {
    cy.contains("Review Your Information").should("be.visible");
    cy.contains("Personal Info").should("be.visible");
    cy.contains("Employment").should("be.visible");
    cy.contains("Address").should("be.visible");
    cy.contains("Loan Details").should("be.visible");
  });

  it("displays the entered personal info", () => {
    cy.contains("Ravi Kumar").should("be.visible");
    cy.contains("ravi@example.com").should("be.visible");
  });

  it("displays the entered employment info", () => {
    cy.contains("TechCorp Ltd").should("be.visible");
    cy.contains("Software Engineer").should("be.visible");
  });

  it("displays the entered address", () => {
    cy.contains("123 Main Street").should("be.visible");
    cy.contains("Mumbai").should("be.visible");
  });

  it("displays the loan amount", () => {
    cy.contains("100000").should("be.visible");
  });

  it("advances to Pre-Approval Summary on Next", () => {
    cy.contains("button", "Next").click();
    cy.contains("Pre").should("be.visible");
  });

  it("shows Pre-Approval Summary with EMI calculation", () => {
    cy.contains("button", "Next").click();
    cy.contains("Estimated EMI").should("be.visible");
    cy.contains("Ravi Kumar").should("be.visible");
  });

  it("Back button goes to Signature step", () => {
    cy.contains("button", "Back").click();
    cy.contains("Signature & Agreement").should("be.visible");
  });
});
