import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from '../components/Blog'
jest.mock('../services/blogs')
import blogService from '../services/blogs'
jest.mock('../services/login')
import loginService from '../services/login'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä ei ole kirjautuneena
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      let blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(0)
    })
  })

  describe('when user is logged', () => {
    beforeEach( async () => {
      // luo sovellus siten, että käyttäjä on kirjautuneena
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja',
        id: '123'
      }
  
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      app = await mount(<App />)
    })

    it('all blogs are rendered', () => {
      app.update()
      let blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(5)
    })
  })
})