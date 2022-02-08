import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import DiscussionList from './components/DiscussionList.js'

class App extends Component {
  state = {
    discussion: {},
    loaded: false
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/discussions/')
      .then(response => {
        const discussion = response.data.message.result[0]
        const newState = Object.assign({}, this.state, {
          discussion,
          loaded: true
        })

        // store the new state object in the component's state
        this.setState(newState)
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <DiscussionList
          discussion={this.state.discussion}
          loaded={this.state.loaded}
        />
      </div>
    )
  }
}

export default App
