const goToCoApplicant = () => {
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
};

describe("Step 5 – Co-Applicant", () => {
  beforeEach(goToCoApplicant);

  it("shows the co-applicant step", () => {
    cy.contains("Co-Applicant").should("be.visible");
  });

  it("can proceed without a co-applicant (checkbox unchecked)", () => {
    cy.contains("button", "Next").click();
    cy.contains("Address Information").should("be.visible");
  });

  it("shows co-applicant fields when checkbox is ticked", () => {
    cy.get('input[type="checkbox"]').check();
    cy.contains("Full Name").should("be.visible");
    cy.contains("Relationship").should("be.visible");
    cy.contains("Email").should("be.visible");
    cy.contains("Phone").should("be.visible");
  });

  it("shows validation errors if co-applicant enabled but fields empty", () => {
    cy.get('input[type="checkbox"]').check();
    cy.contains("button", "Next").click();
    cy.get("p.error-text").should("exist");
  });

  it("advances with valid co-applicant info", () => {
    cy.get('input[type="checkbox"]').check();
    cy.get('input').eq(1).type("Priya Kumar");
    cy.get('input').eq(2).type("Spouse");
    cy.get('input[type="email"]').type("priya@example.com");
    cy.get('input[type="tel"]').type("9876500000");
    cy.contains("button", "Next").click();
    cy.contains("Address Information").should("be.visible");
  });

  it("Back button goes to Loan Details", () => {
    cy.contains("button", "Back").click();
    cy.contains("Loan Details").should("be.visible");
  });
});
