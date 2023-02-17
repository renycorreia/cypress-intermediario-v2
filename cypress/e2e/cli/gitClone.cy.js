import { faker } from '@faker-js/faker'

describe('git clone', () => {
    const project = {
        name: `project-${faker.commerce.product()}`,
        description: faker.commerce.productDescription()
    }

    beforeEach(() => {
        cy.api_deleteAllProjects()
        cy.api_createProject(project)
    })

    it('successfully', () => {
        cy.cloneViaSSH(project)

        cy.readFile(`cypress/downloads/${project.name}/README.md`)
            .should('contain', `# ${project.name}`)
            .and('contain', project.description)
    })
})