import { Component } from 'react'
import './Discussion.css'
import AddComment from './AddComment'
import Comment from './Comment'

class Discussion extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.loaded) {
      return (
        <div className="discussion">
          <div>{this.props.subject}</div>
          <div>{this.props.user}</div>
          <div>
            {
              this.props.comments.map(c => (
                <Comment key={c._id} user={c.user} text={c.text} upvote={c.upvote} id={c._id} createdTime={c.createdAt}/>
              ))
            }
          </div>
          <AddComment discussion={this.props.id} />
        </div>
      )
    }
    return (
      <div>Loading....</div>
    )
  }
}

export default Discussion
