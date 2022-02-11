import { Component } from 'react'
import CommentReply from './CommentReply.js'

class CommentList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.comments.map(c => (
          <CommentReply
            key={c._id}
            user={c.user}
            text={c.text}
            upvote={c.upvote}
            id={c._id}
            createdTime={c.createdAt}
          />
        ))}
      </div>
    )
  }
}

export default CommentList
