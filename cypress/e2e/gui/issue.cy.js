import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Issue', () => {
  const issue = {
    title: `issue-${faker.commerce.product()}`,
    description: faker.commerce.productDescription(),
    project: {
      name: `project-${faker.commerce.product()}`,
      description: faker.commerce.productDescription()
    }
  }

  beforeEach(() => {
    cy.api_deleteAllProjects()
    cy.api_createProject(issue.project)
    cy.login()
  })

  it('successfully create issue', options, () => {
      cy.gui_createIssue(issue)
  
      cy.get('.issue-details')
        .should('contain', issue.title)
        .and('contain', issue.description)
    })
})