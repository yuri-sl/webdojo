describe("Validações de alertas em JavaScript", () => {
    beforeEach(() => {
        cy.login();
        cy.goTo("Alertas JS", "JavaScript Alerts");
    });
    it("Deve validar a mensagem de alerta", () => {
        cy.log("todo");
        //cy.on é um listener que vai ficar ouvindo o navegador para uma ação determinada
        cy.on("window:alert", (msg) => {
            expect(msg).to.equal("Olá QA, eu sou uma Alert Box!");
        });
        cy.contains("button", "Mostrar Alert").click();
    });

    it("Deve validar um diálogo e validar a resposta positiva", () => {
        cy.on("window:confirm", (msg) => {
            expect(msg).to.equal("Aperta um botão!");
            return true;
        });
        cy.on("window:alert", (msg) => {
            expect(msg).to.equal("Você clicou em Ok!");
        });
        cy.contains("button", "Mostrar Confirm").click();
    });
    it("Deve validar um diálogo e validar a resposta negativa", () => {
        cy.on("window:confirm", (msg) => {
            expect(msg).to.equal("Aperta um botão!");
            return false;
        });
        cy.on("window:alert", (msg) => {
            expect(msg).to.equal("Você cancelou!");
        });
        cy.contains("button", "Mostrar Confirm").click();
    });
    it("Deve validar um prompt e validar a resposta", () => {
        cy.window().then((win) => {
            cy.stub(win, "prompt").returns("Fernando"); //Simula o preenchimento
        });
        cy.on("window:alert", (msg) => {
            expect(msg).to.equal("Olá Fernando! Boas vindas ao WebDojo!");
        });
    });
});