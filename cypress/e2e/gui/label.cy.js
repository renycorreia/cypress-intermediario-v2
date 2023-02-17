import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Label', () => {
    const issue = {
        title: `issue-${faker.commerce.product()}`,
        description: faker.commerce.productDescription(),
        project: {
            name: `project-${faker.commerce.product()}`,
            description: faker.commerce.productDescription()
        }
    }

    const label = {
        name: `label-${faker.word.adjective()}`,
        color: '#fcffaa'
    }

    beforeEach(() => {
        cy.api_deleteAllProjects()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createLabel(response.body.project_id, label)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })

    it('successfully set label on issue', options, () => {
        cy.gui_setLabelOnIssue(label)

        cy.get('.issue-details').click()
        cy.get('.qa-labels-block').should('contain', label.name)
        cy.get('.qa-labels-block span').should('have.attr', 'style', `background-color: ${label.color}; color: #333333;`)
    })
})