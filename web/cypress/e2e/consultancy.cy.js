import consultancyData from "../fixtures/consultancy.json";
import { personal, company } from "../fixtures/consultancy.json";

describe("Formulário de consultoria", () => {
    before(() => {
        cy.log("Essa execução será feita");
    });
    beforeEach(() => {
        cy.login(true);
        cy.goTo("Formulários", "Consultoria");

        //cy.fixture("consultancy").as("consultancyData"); -> Força a usar function padrão
    });
    it("Deve solicitar consultoria individual", () => {
        //ArrowHead function não consegue identificar o this de objetos que foram definidos em outras funções.
        //const personal = this.consultancyData.personal;
        cy.fillConsultancyForm(personal);
        cy.submitConsultancyForm();
        cy.validadeConsultancyModal();
    });
    it("Deve solicitar consultoria InCompany", () => {
        cy.fillConsultancyForm(company);
        cy.submitConsultancyForm();
        cy.validadeConsultancyModal();
    });
    it("Deve testar os campos ao tentar submeter um formulário sem validar", () => {
        cy.submitConsultancyForm();

        const requiredFields = [
            { label: "Nome Completo", message: "Campo obrigatório" },
            { label: "Email", message: "Campo obrigatório" },
            {
                label: "termos de uso",
                message: "Você precisa aceitar os termos de uso",
            },
        ];
        requiredFields.forEach(({ label, message }) => {
            cy.contains("label", label)
                .parent()
                .find("p")
                .should("be.visible")
                .should("have.text", message)
                .and("have.class", "text-red-400")
                .and("have.css", "color", "rgb(248, 113, 113)");
        });
    });
    afterEach(() => {
        cy.log("Isso acontece depois de cada teste");
    });
    after(() => {
        cy.log("Isso acontece depois de todos os testes uma única vez");
    });
});