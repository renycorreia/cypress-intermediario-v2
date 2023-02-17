import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('Project', () => {

  const project = {
    name: `project-${faker.commerce.product()}`,
    description: faker.commerce.productDescription()
  }

  beforeEach(() => {
    cy.api_deleteAllProjects()
    cy.login()
    cy.visit('/')
  })

  it('successfully create project', options, () => {
    cy.gui_createProject(project)

    cy.get('.qa-project-name').should('contain.text', project.name)
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name.toLowerCase()}`)
  })
})