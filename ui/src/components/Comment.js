import axios from "axios";
import { Component } from 'react'
import ReactTimeAgo from 'react-time-ago'

import AddReply from './AddReply'
import CommentList from './CommentList'
import constants from '../constants'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentId: this.props.id,
      upvote: this.props.upvote,
      showReply: false,
      showReplies: true,
      replies: []
    }
  }

  componentDidMount () {
    axios
      .get(`${constants.apiUrl}/api/comments/${this.state.commentId}/replies`)
      .then(response => {
        const replies = response.data.message.result
        const newState = Object.assign({}, this.state, {
          replies
        })
        this.setState(newState)
      })
      .catch(error => console.log(error))
  }

  updateUpvote = (e) => {
    e.preventDefault()
    this._updateVote()
  }
  
  reply = (e) => {
    e.preventDefault()
    this.setState({ showReply: true })
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
          <span className="user-avatar"><img src="./img/avatar1.png" alt="user-avatar"></img></span>
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
        <div id="comment-reply">
          <a href="#" onClick={this.reply}>Reply</a>
          <div>
            {
              this.state.showReply ? (
                <AddReply
                  discussion={this.props.discussion}
                  // updateComments={this.props.updateComments}
                  comment={this.state.commentId}
                />
              ) : (<div></div>)
            }
          </div>
        </div>
        <div className="replies">
          {
            this.state.showReplies ? (
              <CommentList comments={this.state.replies}/>
            ) : (<div></div>)
          }
          </div>
      </div>
    )
  }
}

export default Comment
