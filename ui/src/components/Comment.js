import { Component } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from 'react-time-ago'

import CommentList from './CommentList'

// import "./Comment.css";
TimeAgo.addDefaultLocale(en)

class Comment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="comment">
        <div id="comment-user">{this.props.user} * <ReactTimeAgo date={this.props.createdTime} locale="en-US"/></div>
        <div id="comment-text">{this.props.text}</div>
        <div id="comment-upvote">
          <div>
            <a href="">Upvote: {this.props.upvote}</a>
          </div>
          <div>
            {/* <CommentList comments={this.props.comments}/> */}
          </div>
        </div>
        <div>
          <button type="button" value={this.props.id}>Reply</button>
        </div>
      </div>
    )
  }
}

export default Comment
