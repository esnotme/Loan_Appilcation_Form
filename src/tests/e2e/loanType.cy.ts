describe("Step 1 – Loan Type", () => {
  beforeEach(() => cy.visit("/"));

  it("shows the loan type step on load", () => {
    cy.contains("Select Loan Type").should("be.visible");
  });

  it("shows an error if Next is clicked with no selection", () => {
    cy.contains("button", "Next").click();
    cy.contains("Please select a loan type").should("be.visible");
  });

  it("advances to Personal Info after selecting Personal", () => {
    cy.get('input[type="radio"][value="personal"]').check();
    cy.contains("button", "Next").click();
    cy.contains("Personal Information").should("be.visible");
  });

  it("advances to Personal Info after selecting Home", () => {
    cy.get('input[type="radio"][value="home"]').check();
    cy.contains("button", "Next").click();
    cy.contains("Personal Information").should("be.visible");
  });

  it("advances to Personal Info after selecting Business", () => {
    cy.get('input[type="radio"][value="business"]').check();
    cy.contains("button", "Next").click();
    cy.contains("Personal Information").should("be.visible");
  });
});
