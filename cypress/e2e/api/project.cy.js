import { faker } from '@faker-js/faker'

describe('Create Project', () => {

  const project = {
    name: `project-${faker.commerce.product()}`,
    description: faker.commerce.productDescription()
  }

  beforeEach(() => {
    cy.api_deleteAllProjects()
  })

  it('successfully create project', () => {
    cy.api_createProject(project)
      .then(response => {
        expect(response.status).to.equal(201)
        expect(response.body.name).to.equal(project.name)
        expect(response.body.description).to.equal(project.description)
      })
  })

})