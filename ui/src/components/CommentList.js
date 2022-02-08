import { Component } from 'react'
import Comment from './Comment.js'

class CommentList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.comments.map(c => (
          <Comment key={c.id} text={c.text} upvote={c.upvote} />
        ))}
      </div>
    )
  }
}

export default CommentList
