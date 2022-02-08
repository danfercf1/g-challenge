import { Component } from 'react'
import Discussion from './Discussion.js'

class DiscussionList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {
          <Discussion
            key={this.props.discussion._id}
            subject={this.props.discussion.subject}
            user={this.props.discussion.user}
            id={this.props.discussion._id}
            comments={this.props.discussion.comments}
            loaded={this.props.loaded}
          />
        }
      </div>
    )
  }
}

export default DiscussionList
