import { Component } from 'react'

import AddComment from './AddComment'
import Comment from './Comment'

class Discussion extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="discussion">
        <h1>Discussion</h1>
        <div className="discussion-header">
          <div id="discussion-subject">{this.props.discussion.subject}</div>
          <div id="discussion-user">{this.props.discussion.user}</div>
        </div>
        <div>
          {this.props.comments.map(c => (
            <Comment
              key={c._id}
              discussion={this.props.discussion._id}
              user={c.user}
              text={c.text}
              upvote={c.upvote}
              id={c._id}
              createdTime={c.createdAt}
              updateComments={this.props.updateComments}
            />
          ))}
        </div>
        <AddComment
          discussion={this.props.discussion._id}
          updateComments={this.props.updateComments}
        />
      </div>
    )
  }
}

export default Discussion
