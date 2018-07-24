import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SimpleBlog from './SimpleBlog'
import { isRegExp } from 'util';

describe('<SimpleBlog />', () => {
  let testBlog = {
    title: 'test-title',
    author: 'Kimmo K',
    url: 'localhost:3003',
    likes: 5
  }
  let testBlogComponent
  let mockHandler

  beforeEach(() => {
    mockHandler = jest.fn()
    testBlogComponent = shallow(<SimpleBlog blog={testBlog} onClick={mockHandler} />)
  })

  it('renders title, author and likes', () => {
    const titleAuthorDiv = testBlogComponent.find('.titleAuthor')
    const likesDiv = testBlogComponent.find('.likes')

    expect(titleAuthorDiv.text()).toContain(testBlog.author)
    expect(titleAuthorDiv.text()).toContain(testBlog.title)
    expect(likesDiv.text()).toContain(testBlog.likes)
  })

  it('like-button calls the click-function two times when clicked twice'), () => {
    const button = testBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  }

})