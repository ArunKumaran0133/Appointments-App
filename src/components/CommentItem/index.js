import './index.css'

import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {eachComment, deleteComment, toggleIsLiked} = props
  const {id, name, comment, date, isLiked, backgroundColor} = eachComment
  const postedTime = formatDistanceToNow(date)

  const likeText = isLiked ? 'liked-text' : 'like-text'
  const imageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const firstLetter = name[0]
  const onDeleteBtn = () => {
    deleteComment(id)
  }

  const isLikedButton = () => {
    toggleIsLiked(id)
  }

  return (
    <li className="item-container">
      <div className="comment-name-container">
        <div className={`name-first-letter ${backgroundColor}`}>
          <p>{firstLetter}</p>
        </div>
        <div>
          <div className="name-container">
            <h1 className="name">{name}</h1>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <img
            src={imageUrl}
            alt="like"
            className="like-logo"
            onClick={isLikedButton}
          />
          <button className={likeText} onClick={isLikedButton} type="button">
            Like
          </button>
        </div>
        <button
          type="button"
          className="delete-icon"
          onClick={onDeleteBtn}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </li>
  )
}

export default CommentItem
