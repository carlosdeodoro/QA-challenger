/// <reference types="Cypress"/>

import { faker } from '@faker-js/faker';

Cypress.Commands.add("login", () => {
    cy.get('input[type="email"]').focus().wait(2000).type(Cypress.env('user_email'))
    cy.get('input[type="password"]').focus().wait(2000).type(Cypress.env('user_password'))
    cy.get('.layout-margin-top > .mat-focus-indicator').click({force: true}).wait(3000)
    cy.get('mat-card').last().click().wait(6000)
    cy.get('#onetrust-accept-btn-handler').click()
    cy.get(':nth-child(4) > .mat-list-item-content').click().wait(5000)
})

Cypress.Commands.add("createFunil", () => {
    const funilName = 'Test-funil'+ faker.number.int(100);

    cy.get('#mat-select-value-7').click()
    cy.get('[data-testid="btnNovoFunil"]').click()
    cy.get('[data-testid="inputNome"]').type(funilName)
    cy.get('[data-testid="btnSalvar"]').click()
    cy.get('.mat-select-min-line.ng-tns-c55-12.ng-star-inserted').should('have.text', funilName) 
})

Cypress.Commands.add("deleteFunil", () => {
    cy.get('#mat-select-value-7').click()
    cy.get('mat-option')
        .last()
        .realHover()
    cy.get('.edit-btn')
        .last()
        .should('be.visible')
        .click()
    cy.get('[data-testid="btnExcluir"]').click()
    cy.get('.cdk-global-overlay-wrapper mat-dialog-container sd-delete-pipeline-dialog h2')
        .should('have.text', 'Excluir funil')
    cy.get('.cdk-global-overlay-wrapper mat-dialog-container sd-delete-pipeline-dialog [data-testid="btnExcluir"]')
        .click()
    cy.get('.mat-simple-snack-bar-content').should('have.text', 'Funil excluído com sucesso')
})

Cypress.Commands.add("createOpportunity", () => {
    const opportunityName = 'Test opportunity'+ faker.number.int(100);

    cy.get('.mat-raised-button').click()
    cy.get('.mat-form-field-infix input.mat-input-element')
        .type(opportunityName)
    cy.get('.mat-form-field-infix textarea.mat-input-element').type('test description opportunity')
    cy.get('.mat-dialog-actions .mat-raised-button').click().wait(3000)
    cy.get('.crm-card-content .crm-card-title').first().click()
    cy.get('[fxlayout="column"] > h2').should('have.text', opportunityName) 
})

Cypress.Commands.add("createRotulo", () => {
    const rotuloName = 'Test rotulo'+ faker.number.int(100);

    cy.get('.mat-raised-button').click()
    cy.get('.rotulo-select').click()
    cy.get('.layout-fill-width > .mat-button-wrapper').click()
    cy.get('form.ng-pristine > .mat-dialog-content input').type(rotuloName)
    cy.get('.rotulo-selector > sd-rotulo-icon > .rotulo-icon').click()
    cy.get('sd-popover sd-rotulo-icon').should('have.length', 15)
    cy.get('sd-popover sd-rotulo-icon').first().click()
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.get('.rotulo-name').should('have.text', rotuloName)

    cy.get('.mat-simple-snack-bar-content').should('have.text', 'Rótulo cadastrado com sucesso!')
})

Cypress.Commands.add("deleteRotulo", () => {
    cy.get('.mat-raised-button').click()
    cy.get('.rotulo-select').click()
    cy.get('.rotulos-scroller .rotulo')
        .last()
        .realHover()
    cy.get('.rotulos-scroller .rotulo .mat-button-base').last().click()
    cy.get('.mat-warn').click()
    cy.get('.mat-dialog-container .sd-notification h2').should('have.text', 'Excluir rótulo')
    cy.get('[data-testid="btnPrimaryAction"]').click()

    cy.get('.mat-simple-snack-bar-content').should('have.text', 'Rótulo excluído com sucesso!')
})

Cypress.Commands.add("createOpportunityComplet", () => {
    const opportunityName = 'Test opportunity'+ faker.number.int(100);
    const rotuloName = 'Test rotulo'+ faker.number.int(100);

    cy.get('.mat-raised-button').click()
    cy.get('.mat-form-field-infix input.mat-input-element')
        .type(opportunityName)
    cy.get('.mat-form-field-infix textarea.mat-input-element').type('test description opportunity')

    cy.get('.rotulo-select').click()
    cy.get('.layout-fill-width > .mat-button-wrapper').click()
    cy.get('form.ng-pristine > .mat-dialog-content input').type(rotuloName)
    cy.get('.rotulo-selector > sd-rotulo-icon > .rotulo-icon').click()
    cy.get('sd-popover sd-rotulo-icon').should('have.length', 15)
    cy.get('sd-popover sd-rotulo-icon').first().click()
    cy.get('.mat-dialog-actions > .mat-raised-button').click()
    cy.get('.rotulo-name').should('have.text', rotuloName)

    cy.get('.mat-simple-snack-bar-content').should('have.text', 'Rótulo cadastrado com sucesso!')

    cy.get('.mat-slide-toggle-bar').click()
    cy.get('input[aria-label="Paciente"]')
        .should('be.visible')
        .focus()
        .type('test')
        .wait(2000)
    cy.get('#mat-autocomplete-0 .mat-option').first().click()
    cy.get('.sd-pacientes-celular > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').should('be.visible')

    cy.get('.mat-dialog-actions .mat-raised-button').click().wait(3000)
    cy.get('.crm-card-content .crm-card-title').first().click()
    cy.get('[fxlayout="column"] > h2').should('have.text', opportunityName) 
})

Cypress.Commands.add("deleteOpportunity", () => {
    cy.get('.crm-card-content .crm-card-title').first().click()
    cy.get('.mat-warn > .mat-button-wrapper').click()
    cy.get('.mat-dialog-container .sd-notification h2').should('have.text', 'Excluir oportunidade')
    cy.get('[data-testid="btnPrimaryAction"]').click()
    cy.get('.mat-simple-snack-bar-content').should('have.text', 'Oportunidade excluída com sucesso!')
})
