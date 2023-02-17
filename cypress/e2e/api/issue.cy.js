import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
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
  })

  it('successfully create issue', () => {
    cy.api_createIssue(issue)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.title).to.equal(issue.title)
        expect(response.body.description).to.equal(issue.description)
      })
  })
})