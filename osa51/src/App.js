import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Message'
import Error from './components/Error'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      message: null,
      error: null,
      blogform: null,
      newBlog: null,
      blogformtoggle: null,
    }
  }

  componentDidMount = async () => {
    const blogs = await this.getAll()
    await this.setState({ blogs })
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      await this.setState({ user })
      await blogService.setToken(user.token)
    }
    console.log('did mount', this.state)
  }

  getAll = async () => {
    let blogs = await blogService.getAll()
    return blogs.sort((a, b) => (b.likes - a.likes))
  }

  setMessage = (newMessage, timeout) => {
    this.setState({ message: newMessage })
    setTimeout(() => { this.setState({ message: null }) }, timeout)
  }

  setError = (newError, timeout) => {
    this.setState({ error: newError })
    setTimeout(() => { this.setState({ error: null }) }, timeout)
  }

  createBlog = async () => {
    await this.setState({ newBlog: this.blogform.getNewBlog() })
    console.log(this.state.newBlog)
    try {
      await blogService.create(this.state.newBlog)
      this.setMessage(`A new blog '${this.state.newBlog.title}' by ${this.state.newBlog.author} added succesfully!`, 5000)
    } catch (exception) {
      console.log(exception)
      this.setError('Something went wrong...', 5000)
    }
    this.setState({ newBlog: null })
    const blogs = await this.getAll()
    await this.setState({ blogs })
    this.blogformtoggle.toggleVisibility()
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    this.setState({ username: '', password: '', user: null, message: null })
    console.log('user logged out: ', this.state)
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      console.log('user logged in: ', this.state)
      this.setMessage(`Welcome ${this.state.user.name}!`, 5000)
    } catch (exception) {
      console.log(exception)
      this.setError('wrong username or password', 5000)
    }
  }

  remove = (id) => {
    return async () => {
      const ind = this.state.blogs.findIndex(function (x) { return x.id === id })
      let blog = this.state.blogs[ind]
      if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
        try {
          blogService.remove(id)
          let blogs = await this.getAll()
          await this.setState({ blogs })
        } catch (exception) {
          console.log(exception)
        }
      }
    }
  }

  like = (blog) => {
    return async () => {
      const ind = this.state.blogs.findIndex(function (x) { return x.id === blog.id })
      let likes = this.state.blogs[ind].likes + 1

      let blogs = [...this.state.blogs];
      let blogi = { ...blogs[ind] };
      blogi.likes = likes;
      blogs[ind] = blogi;
      await this.setState({ blogs });

      try {
        const newBlog = {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          user: blog.user[0] === undefined ? undefined : blog.user[0].id,
          likes
        }
        await blogService.update(newBlog, blog.id)
        this.setMessage(`Liked ${blog.title}`, 2000)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  handleLoginFieldChange = (event) => {
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  blogForm = () => {
    return (
      <div>
        <Notification message={this.state.message} />
        <Error message={this.state.error} />
        <h2>Blogs</h2>
        <p>{this.state.user.name} logged in <button onClick={this.logout}>Logout</button></p>
        <Togglable buttonLabel='Add new blog' ref={component => this.blogformtoggle = component}>
          <BlogForm
            klik={this.createBlog}
            ref={component => this.blogform = component}
          />
        </Togglable>
        {this.state.blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            like={this.like(blog)}
            remove={this.remove(blog.id)}
            user={this.state.user}
          />
        )
        )}
      </div>
    )
  }

  loginForm = () => (
    <div>
      <Notification message={this.state.message} />
      <Error message={this.state.error} />
      <Togglable buttonLabel="Login">
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    </div>
  )

  render() {
    console.log('rendering')
    return (
      <div>
        {this.state.user === null ?
          this.loginForm() :
          this.blogForm()
        }
      </div>
    )
  }
}

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input
            value={username}
            onChange={handleChange}
            name="username"
          />
        </div>
        <div>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default App;
