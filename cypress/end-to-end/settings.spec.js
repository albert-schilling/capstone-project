describe('Edit settings', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
  })

  const email = 'cypress@ciceroic.com'
  const password = 'CypressCypress'
  const firstName = 'Cypress Master FirstName'
  const lastName = 'Cypress Master LastName'
  const about = 'Hi, I am Cypress and my purpose is to test this application.'

  it('log in user', () => {
    cy.wait(2000)
      .get('button[type=submit]')
      .click()
      .get('form')
      .contains('Please, enter your email address.')
      .focused()
      .type(email)
      .get('form')
      .submit()
      .get('form')
      .contains('Please, enter your password.')
      .focused()
      .type(password)
      .get('form')
      .submit()
      .wait(2000)
  })

  it.only('accesses user settings, changes the about text/bio text, uploads and deletes a new user portrait', () => {
    cy.get('[data-cy=profile]')
      .click()
      .get('[data-cy=editAbout]')
      .click()
      .get('[data-cy=settings]')
      .contains('Done')
      .get('[data-cy=inputAbout]')
      .clear()
      .type(about)
      .get('button[data-cy=updateAbout]')
      .click()
      .get('[data-cy=about]')
      .contains(about)
      .get('[data-cy=portrait]')
      .click()
      .get('[data-cy=settings]')
      .contains('Upload')
      .attach_file('test-image.jpg', 'image/jpg')
      .trigger('change', { force: true })
      .wait(2000)
      .get('[data-cy=closeLightbox')
      .click()
      .get('[data-cy=closeSettings]')
      .click()
  })
  it.skip('signs out', () => {
    cy.get('[data-cy=signOut]')
      .click()
      .wait(2000)
      .get('form')
      .contains('Login')
  })
})
