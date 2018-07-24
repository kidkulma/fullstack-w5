import PropTypes from 'prop-types'
import React from 'react'
import blogService from '../services/blogs'
import Notification from './Message'
import Error from './Error'

class BlogForm extends React.Component {
  static propTypes = {
    klik: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      author: '',
      title: '',
      url: '',
      message: null,
      error: null,
      newBlog: null,
      klik: this.props.klik
    }
  }

  componentDidMount() {
    console.log('BlogForm did mount: ', this.state)
  }

  setMessage = (newMessage, timeout) => {
    this.setState({ message: newMessage })
    setTimeout(() => { this.setState({ message: null }) }, timeout)
  }

  setError = (newError, timeout) => {
    this.setState({ error: newError })
    setTimeout(() => { this.setState({ error: null }) }, timeout)
  }

  handleFieldChange = (event) => {
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  getNewBlog = () => this.state.newBlog

  Click = async (event) => {
    event.preventDefault()
    const userJSON = window.localStorage.getItem('loggedUser')
    const newBlog = {
      author: this.state.author,
      title: this.state.title,
      url: this.state.url,
      user: JSON.parse(userJSON)
    }
    await this.setState({ author: '', title: '', url: '' })
    await this.setState({ newBlog })
    return this.state.klik()
  }

  createBlog = async (event) => {
    event.preventDefault()
    const userJSON = window.localStorage.getItem('loggedUser')
    const newBlog = {
      author: this.state.author,
      title: this.state.title,
      url: this.state.url,
      user: JSON.parse(userJSON)
    }
    this.setState({ newBlog })
    try {
      await blogService.create(newBlog)
      this.setMessage(`A new blog '${newBlog.title}' by ${newBlog.author} added succesfully!`, 5000)
    } catch (exception) {
      console.log(exception)
      this.setError('Something went wrong...', 5000)
    }
    this.setState({ author: '', title: '', url: '' })
  }

  render() {
    console.log('rendering BlogForm')
    return (
      <div>
        <Notification message={this.state.message} />
        <Error message={this.state.error} />
        <h3>Create new</h3>
        <form onSubmit={this.Click}>
          <div>
            Title
          <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Author
          <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            URL
          <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default BlogForm;