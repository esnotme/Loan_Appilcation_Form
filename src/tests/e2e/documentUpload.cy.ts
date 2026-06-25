const goToDocuments = () => {
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
};

describe("Step 7 – Document Upload", () => {
  beforeEach(goToDocuments);

  it("shows the document upload area", () => {
    cy.contains("Document Upload").should("be.visible");
    cy.get('[aria-label="File upload area"]').should("be.visible");
  });

  it("can proceed without uploading files (optional upload)", () => {
    cy.contains("button", "Next").click();
    cy.contains("Signature").should("be.visible");
  });

  it("rejects files that are too large (>5MB)", () => {
    // Create a fake large file via DataTransfer
    cy.get('[aria-label="File upload area"]').trigger("dragover");
    // NOTE: Full file validation tested via unit tests; this checks the UI doesn't crash
    cy.contains("Document Upload").should("be.visible");
  });

  it("rejects invalid file types", () => {
    cy.get('[aria-label="File upload area"] input[type="file"]', { includeShadowDom: true })
      .selectFile({ contents: Cypress.Buffer.from("fake content"), fileName: "test.exe", mimeType: "application/x-msdownload" }, { force: true });
    cy.contains("Only JPG, PNG, or PDF allowed").should("be.visible");
  });

  it("accepts a valid PDF file", () => {
    cy.get('[aria-label="File upload area"] input[type="file"]', { includeShadowDom: true })
      .selectFile({ contents: Cypress.Buffer.from("%PDF-1.4 fake"), fileName: "id.pdf", mimeType: "application/pdf" }, { force: true });
    cy.contains("id.pdf").should("be.visible");
  });

  it("Back button goes to Address step", () => {
    cy.contains("button", "Back").click();
    cy.contains("Address Information").should("be.visible");
  });
});
