import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios'
import './App.css';

import { simpleAction } from './actions/SimpleAction'

class App extends Component {
  constructor () {
    super()
    this.state = {
      stockValue: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }
  simpleAction = (event) => {
    this.props.simpleAction();
  }
  handleClick () {
    axios.get('https://api.iextrading.com/1.0/stock/aapl/quote')
      .then(response => console.log(response.data.latestPrice))
  }

  render() {
    return (
      <div>
        <div className='button__container'>
          <button onClick={this.handleClick} className='button'>Click Me</button>
        </div>
        <pre>
          { JSON.stringify(this.props) }
        </pre>
        <button onClick={this.simpleAction}>Test redux action</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);