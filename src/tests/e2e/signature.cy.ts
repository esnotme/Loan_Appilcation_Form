const goToSignature = () => {
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
  cy.contains("button", "Next").click(); // skip co-applicant
  cy.get('input[placeholder="Enter street"]').type("123 Main Street");
  cy.get('input[placeholder="Enter postal code"]').type("400001");
  cy.contains("button", "Next").click();
  cy.contains("button", "Next").click(); // skip document upload
};

describe("Step 8 – Signature & Agreement", () => {
  beforeEach(goToSignature);

  it("shows the signature step", () => {
    cy.contains("Signature & Agreement").should("be.visible");
  });

  it("Next button is disabled with no signature and no checkbox", () => {
    cy.contains("button", "Next").should("be.disabled");
  });

  it("Next button is disabled with signature but no agreement checkbox", () => {
    cy.get('input[placeholder="Type your full name"]').type("Ravi Kumar");
    cy.contains("button", "Next").should("be.disabled");
  });

  it("Next button is disabled with checkbox but no signature", () => {
    cy.get('input[type="checkbox"]').check();
    cy.contains("button", "Next").should("be.disabled");
  });

  it("Next button is enabled when both signature and checkbox are filled", () => {
    cy.get('input[placeholder="Type your full name"]').type("Ravi Kumar");
    cy.get('input[type="checkbox"]').check();
    cy.contains("button", "Next").should("not.be.disabled");
  });

  it("advances to Review step when complete", () => {
    cy.get('input[placeholder="Type your full name"]').type("Ravi Kumar");
    cy.get('input[type="checkbox"]').check();
    cy.contains("button", "Next").click();
    cy.contains("Review Your Information").should("be.visible");
  });

  it("Back button goes to Document Upload", () => {
    cy.contains("button", "Back").click();
    cy.contains("Document Upload").should("be.visible");
  });
});
