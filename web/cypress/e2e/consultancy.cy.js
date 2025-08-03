import consultancyData from "../fixtures/consultancy.json";
import { personal, company } from "../fixtures/consultancy.json";

describe("Formulário de consultoria", () => {
  before(() => {
    cy.log("Essa execução será feita");
  });
  beforeEach(() => {
    cy.login();
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

    it("Deve testar os campos ao tentar submeter um formulário sem validar", () => {
      cy.contains("button", "Enviar formulário").click();

      /*
                                                              cy.contains("label", "Nome Completo")
                                                                .parent()
                                                                .find("p")
                                                                .should("be.visible")
                                                                .should("have.text", "Campo obrigatório")
                                                                .and("have.class", "text-red-400")
                                                                .and("have.css", "color", "rgb(248,113,113)");
                                                              cy.contains("label", "Email").parent();
                                                              */
    });
  });
  afterEach(() => {
    cy.log("Isso acontece depois de cada teste");
  });
  after(() => {
    cy.log("Isso acontece depois de todos os testes uma única vez");
  });
});
