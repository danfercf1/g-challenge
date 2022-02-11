import axios from "axios";
import { Component } from 'react'
import ReactTimeAgo from 'react-time-ago'

import constants from '../constants'

class CommentReply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentId: this.props.id,
      upvote: this.props.upvote
    }
  }

  updateUpvote = (e) => {
    e.preventDefault()
    this._updateVote()
  }
  
  _updateVote = () => {
    const commentId = this.props.id
    axios
      .patch(`${constants.apiUrl}/api/comments/${commentId}/upvote`)
      .then(response => {
        const comment = (!response.error) ? response.data.message.result : ''
        this.setState({
          upvote: comment.upvote
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="comment">
        <div id="comment-user">
          <span className="user-avatar"><img src="./img/avatar1.png"></img></span>
          <span id="user">{this.props.user}</span> * 
          <span id="time-ago"><ReactTimeAgo date={this.props.createdTime} locale="en-US"/></span>
        </div>
        <div id="comment-text">
          <p>{this.props.text}</p>
          </div>
        <div id="comment-upvote">
          <div>
            <a href="#" onClick={this.updateUpvote}>Upvote: {this.state.upvote}</a>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentReply
