import React, { Component } from 'react'
import axios from 'axios';

import BarChart from './components/BarChart'
import './App.css'



class App extends Component {
  state = {
    data: [],
    message: null,
    intervalIsSet: false,
  };

  render() {
    return (
      <div>
        <BarChart class="big_bar"/>
      </div>
    )
  }
}

export default App
