import React, { Component } from 'react'
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import './App.css'
import Discussion from './components/Discussion'

TimeAgo.addDefaultLocale(en)

class App extends Component {
  state = {
    discussion: {},
    comments: [],
    loaded: false
  }

  constructor(props) {
    super(props)
    this.state = {
      discussion: {},
      comments: [],
      loaded: false
    }
    this.updateComments = this.updateComments.bind(this)
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/discussions/')
      .then(response => {
        const discussion = response.data.message.result[0]
        const comments = discussion.comments
        const newState = Object.assign({}, this.state, {
          discussion,
          comments,
          loaded: true
        })

        // store the new state object in the component's state
        this.setState(newState)
      })
      .catch(error => console.log(error))
  }

  updateComments(comment) {
    let comments = this.state.comments
    comments.push(comment)
    const newState = Object.assign({}, this.state, {
      comments
    })
    this.setState(newState)
  }

  render() {
    const { loaded, discussion, comments } = this.state
    if (loaded) {
      return (
        <div className="App center">
          <Discussion
            discussion={discussion}
            comments={comments}
            updateComments={this.updateComments}
          />
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default App
