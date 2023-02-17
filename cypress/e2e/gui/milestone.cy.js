import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Milestone', () => {
    const issue = {
        title: `issue-${faker.commerce.product()}`,
        description: faker.commerce.productDescription(),
        project: {
            name: `project-${faker.commerce.product()}`,
            description: faker.commerce.productDescription()
        }
    }

    const milestone = {
        title: `milestone-${faker.word.adjective()}`
    }

    beforeEach(() => {
        cy.api_deleteAllProjects()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createMilestone(response.body.project_id, milestone)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })

    it('successfully set milestone on issue', options, () => {
        cy.gui_setMilestoneOnIssue(milestone)

        cy.get('.issue-details').click()
        cy.get('.block.milestone').should('contain', milestone.title)
    })
})