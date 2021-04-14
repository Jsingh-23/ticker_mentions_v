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

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data })); 
  };

  render() {
    return (
      <div>
        <BarChart />
      </div>
    )
  }


}

// const App = () => {
//   return (
//     <div>
//       <BarChart />
//     </div>
//   )
// }

export default App
