import React from 'react'
import PropTypes from 'prop-types'
import TogglableButton from './TogglableButton'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      blog: this.props.blog,
      like: this.props.like,
      remove: this.props.remove,
      user: this.props.user,
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
      display: this.state.visible ? 'none' : ''
    }
    const showWhenVisible = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
      display: this.state.visible ? '' : 'none'
    }

    if (this.state.blog.user[0] === undefined) {
      return (
        <div>
          <div style={hideWhenVisible} className='titleAuthor'>
            <a onClick={() => {this.setState({ visible: !this.state.visible })}} className='show'>{this.state.blog.title} {this.state.blog.author}</a><br />
          </div>
          <div style={showWhenVisible} className='details'>
            <a onClick={() => {this.setState({ visible: !this.state.visible })}} className='hide'>{this.state.blog.title} {this.state.blog.author}</a><br />
            URL: <a href={this.state.blog.url}>{this.state.blog.url}</a><br />
            {this.state.blog.likes} likes <button onClick={this.state.like}>Like</button><br />
            Added by anonymous <br />
            <button onClick={this.state.remove}>Delete</button><br />
          </div>
        </div>
      )
    } else {
      const visible = this.state.blog.user[0]._id === this.state.user.id
      return (
        <div>
          <div style={hideWhenVisible} className='titleAuthor'>
            <a onClick={() => {this.setState({ visible: !this.state.visible })}} className='show'>{this.state.blog.title} {this.state.blog.author}</a><br />
          </div>
          <div style={showWhenVisible} className='details'>
            <a onClick={() => {this.setState({ visible: !this.state.visible })}} className='hide'>{this.state.blog.title} {this.state.blog.author}</a><br />
            URL: <a href={this.state.blog.url}>{this.state.blog.url}</a><br />
            {this.state.blog.likes} likes <button onClick={this.state.like}>Like</button><br />
            Added by {this.state.blog.user[0].name}<br />
            <TogglableButton visible={visible}>
              <button onClick={this.state.remove}>Delete</button><br />
            </TogglableButton>
          </div>
        </div>
      )
    }
  }
}


export default Blog