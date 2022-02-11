import axios from "axios";
import { Component } from 'react'

import constants from '../constants'
class AddReply extends Component {
  constructor(props) {
    super(props)
    this.state = { reply: '', discussionId: this.props.discussion, commentId: this.props.comment, savedReply: '' }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="DiscussionReplyForm">
        <textarea
          name="text"
          autoFocus
          onChange={this.onChange}
          placeholder="Write your question"
          className="DiscussionReplyForm-area"
          value={this.state.reply}
          id="comment-text-area"
        ></textarea>
        <input
          type="submit"
          value="Comment"
          className="DiscussionReplyForm-submit"
        />
      </form>
    )
  }

  onChange = e => {
    this.setState({ reply: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    this._saveComment()
  }

  _saveComment = () => {
    const data = {
      discussion: this.state.discussionId,
      parent: this.state.commentId,
      text: this.state.reply
    }
    axios
      .post(`${constants.apiUrl}/api/comments/`, data)
      .then(response => {
        this.setState({
          savedReply:  (!response.error) ? response.data.message.result : ''
        })
        this.setState({
          reply: ''
        })
      })
      .catch(error => console.log(error))
  }
}

export default AddReply
