/// <reference types="Cypress"/>

import { faker } from '@faker-js/faker';

beforeEach(() => {
    cy.visit('/');
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
    cy.login()
  })
  
describe('Verify limit caracter', () => {  
    it('Limit 30 caracter', () => {
        cy.get('#mat-select-value-7').click()
        cy.get('[data-testid="btnNovoFunil"]').click()
        cy.get('[data-testid="inputNome"]')
            .type('test-30 caracteres no input de funil')
            .should('have.attr', 'maxlength', '30')
    })

    it('Create funil - Message fail input none', () => {
        cy.get('#mat-select-value-7').click()
        cy.get('[data-testid="btnNovoFunil"]').click()
        cy.get('[data-testid="btnSalvar"]').click()
        cy.get('#mat-error-4').should('have.text', 'Este campo é obrigatório')
    })

    it('Create new funil and verify board', () => {
        cy.createFunil()
        cy.get('#mat-select-value-9 > .mat-select-value-text > .mat-select-min-line').should('have.text', 'Todo período')
       
        cy.get('[cdkdroplistgroup=""] > :nth-child(1) > .stage-container')
            .should('contain.text', 'Em aberto')
        cy.get('[cdkdroplistgroup=""] > :nth-child(1) > .stage-container span.help-text')
            .should('have.text', ' Oportunidades criadas nesse funil aparecerão aqui. ')
        
        cy.get(':nth-child(2) > .stage-container span.stage-name')
            .should('contain.text', 'Em andamento')
        cy.get(':nth-child(2) > .stage-container span.help-text')
            .should('have.text', ' Mova as oportunidades para essa etapa após concluir a etapa anterior. ')
        
        cy.get('.cdk-drag-disabled > .stage-container span.stage-name')
            .should('contain.text', 'Concluída')
        cy.get('.cdk-drag-disabled > .stage-container span.help-text')
            .should('have.text', ' Mova as oportunidades concluídas para essa etapa. ')
        
        cy.get(':nth-child(4) > .stage-container span.stage-name')
            .should('contain.text', 'Perdida')
        cy.get(':nth-child(4) > .stage-container span.help-text')
            .should('have.text', ' Mova as oportunidades perdidas para essa etapa. ')
        
        cy.deleteFunil()
    })

    it('Limit funil', () => {
        cy.get('#mat-select-value-7').click()
        cy.get('#mat-select-6-panel')
            .find('mat-option')
            .should('have.length.lte', 13)
    })

    it('Delete funil', () => {
        cy.createFunil()
        cy.deleteFunil()
    })

    it('Edited funil', () => {
        cy.createFunil()
        cy.get('#mat-select-value-7').click()
        cy.get('mat-option')
            .last()
            .realHover();
        cy.get('.edit-btn')
            .last()
            .should('be.visible')
            .click()
        cy.get('[data-testid="inputNome"]').clear().type('Test Funil Edited')
        cy.get('[data-testid="btnSalvar"]').click()
        cy.get('#mat-select-value-7').click()
        cy.get('mat-option .text-ellipsis')
            .last()
            .should('have.text', ' Test funil edited ')
            .click()
        cy.deleteFunil()
    })

    it('Create funil and opportunity', () => {
        const text = faker.lorem.text(2)

        cy.get('.mat-raised-button').click()
        cy.get('.mat-form-field-infix input.mat-input-element')
            .type(text)
            .should('have.attr', 'maxlength', '40')
        cy.get('.mat-form-field-infix textarea.mat-input-element').type('test description opportunity')
        cy.get('.mat-dialog-actions .mat-raised-button').click().wait(3000)
        cy.get('.crm-card-content .crm-card-title').first().click()
    })

    it('Create opportunity', () => {
       cy.createOpportunity() 
    })

    it('Delete Opportunity Complet', () => {
        cy.deleteOpportunity() 
    })

    it('Create Rotulo', () => {
        cy.createRotulo() 
    })

    it('Delete Rotulo', () => {
        cy.deleteRotulo() 
    })

    it('Edited Rotulo', () => {
        cy.get('.mat-raised-button').click()
        cy.get('.rotulo-select').click()
        cy.get('.rotulos-scroller .rotulo')
            .last()
            .realHover();
        cy.get('.rotulos-scroller .rotulo .mat-button-base').last().click()
        cy.get('form.ng-pristine > .mat-dialog-content input')
            .clear()
            .type('Test rotulo edited')
        cy.get('.mat-dialog-actions > .mat-raised-button').click()
    
        cy.get('.mat-simple-snack-bar-content').should('have.text', 'Rótulo editado com sucesso!')
        cy.get('.rotulo-name').should('have.text', 'Test rotulo edited')
    })

    it('Add Paciente in opportunity', () => {
        cy.get('.mat-raised-button').click()
        cy.get('.mat-slide-toggle-bar').click()
        cy.get('input[aria-label="Paciente"]')
            .should('be.visible')
            .focus()
            .type('test')
            .wait(2000)
        cy.get('#mat-autocomplete-0 .mat-option').first().click()
        cy.get('.sd-pacientes-celular > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex').should('be.visible')
    })

    it('Add Opportunity Complet', () => {
        cy.createOpportunityComplet()
    })  
})
