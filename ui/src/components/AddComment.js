import axios from "axios";
import { Component } from 'react'
// import "./AddComment.css";

class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = { reply: '', discussionId: this.props.discussion, savedReply: '' }
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
          value={this.props.name}
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
    console.log(e.target.value)
    this.setState({ reply: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    this._saveComment()
  }

  _saveComment = () => {
    const data = {
      discussion: this.state.discussionId,
      text: this.state.reply
    }
    axios
      .post('http://localhost:3000/api/comments/', data)
      .then(response => {
        this.state.savedReply = (!response.error) ? response.data.message.result : ''
      })
      .catch(error => console.log(error))
  }
}

export default AddComment
