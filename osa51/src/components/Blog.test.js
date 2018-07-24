import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'
import { isRegExp } from 'util';

describe('<Blog />', () => {
  let testBlog = {
    title: 'test-title',
    author: 'Kimmo K',
    url: 'localhost:3003',
    likes: 5,
    user: [{ _id: 'a1b2c3', name: 'Matti Luukkainen', username: 'mluukkai' }]
  }
  let testUser = { id: 'a1b2c3', name: 'Kimmo K', username: 'kidkulma' }

  let testComponent
  let mockHandler1
  let mockHandler2

  beforeEach(() => {
    mockHandler1 = jest.fn()
    mockHandler2 = jest.fn()
    testComponent = shallow(
      <Blog blog={testBlog} like={mockHandler1} remove={mockHandler2} user={testUser} />
    )
  })
  //jostain syystä, kun tein useamman testin se skippasi ne, joten päädyin tekemään kaiken yhteen testiin
  test('renders only title and author before clicking and details after clicking, like- and delete-buttons work properly', () => {
    let titleAuthorDiv = testComponent.find('.titleAuthor')
    let detailsDiv = testComponent.find('.details')

    //renders only title and author before clicking
    expect(detailsDiv.getElement().props.style.display).toEqual('none')
    expect(titleAuthorDiv.getElement().props.style.display).toEqual('')
    expect(titleAuthorDiv.text()).toContain(testBlog.title)
    expect(titleAuthorDiv.text()).toContain(testBlog.author)

    const show = titleAuthorDiv.find('.show')
    show.simulate('click')

    const button = detailsDiv.find('button')
    button.at(0).simulate('click')
    button.at(1).simulate('click')

    //like- and delete-buttons work
    expect(mockHandler1.mock.calls.length).toBe(1)
    expect(mockHandler2.mock.calls.length).toBe(1)

    titleAuthorDiv = testComponent.find('.titleAuthor')
    detailsDiv = testComponent.find('.details')

    //shows details after clicking show
    expect(detailsDiv.getElement().props.style.display).toEqual('')
    expect(titleAuthorDiv.getElement().props.style.display).toEqual('none')

  })

})