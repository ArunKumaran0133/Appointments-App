import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

const initialCommentList = []

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentList: initialCommentList}

  getUserName = event => {
    const userName = event.target.value
    this.setState({name: userName})
  }

  renderCommandList = () => {
    const {commentList} = this.state

    return commentList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        eachComment={eachComment}
        deleteComment={this.deleteComment}
        toggleIsLiked={this.toggleIsLiked}
      />
    ))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  getComment = event => {
    const userComment = event.target.value
    this.setState({comment: userComment})
  }

  addComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    if (name.length > 0 && comment.length > 0) {
      const getIndex = Math.ceil(
        Math.random() * initialContainerBackgroundClassNames.length - 1,
      )
      const backgroundColor = initialContainerBackgroundClassNames[getIndex]

      const newComment = {
        id: uuidv4(),
        name,
        comment,
        date: new Date(),
        isLiked: false,
        backgroundColor,
      }

      this.setState(prevState => ({
        commentList: [...prevState.commentList, newComment],
        name: '',
        comment: '',
      }))
    }
  }

  deleteComment = commentId => {
    const {commentList} = this.state

    this.setState({
      commentList: commentList.filter(
        eachComment => eachComment.id !== commentId,
      ),
    })
  }

  render() {
    const {commentList, name, comment} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="comment-image-container">
          <form onSubmit={this.addComment}>
            <p className="about-ccbp-para">
              Say Something about 4.0 technologies
            </p>
            <input
              type="text"
              className="input-text"
              placeholder="Your Name"
              value={name}
              onChange={this.getUserName}
            />
            <br />
            <textarea
              rows="6"
              className="input-text-area"
              placeholder="Your Comment"
              onChange={this.getComment}
              value={comment}
            />
            <br />
            <button type="submit" className="submit-button">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="image-comment"
          />
        </div>
        <hr className="hr-line" />
        <div>
          <button className="comment-count" type="button">
            {commentList.length}
          </button>
          <span className="comments">Comments</span>
        </div>
        <ul className="list-container">{this.renderCommandList()}</ul>
      </div>
    )
  }
}

export default Comments
