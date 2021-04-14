import React from 'react'
import { defaults, Bar } from 'react-chartjs-2'
import data from "../ticker_data.json"

import '../Chart.css' 

import App from '../App.js'


defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const ticks = data;

// const sub_names = ['Investing', 'SecurityAnalysis', 'Finance', 'WallStreetBets', 'Options', 'Stocks', 'StockMarket'];
// const time_filters_list = ['hour','day','week','month','year','all'];

class BarChart extends React.Component {

  // sub = sub_names[3];
  // time = time_filters_list[5];

  constructor(props) {
    super(props);
    this.state = {
      mongodb_data: [],
      filtered_mongodb_data: [],
      data_arr: [],
      intervalIsSet: false,
      label_arr: ["MSFT", "PLTR", "TSLA", "AAPL", "TWTR", "NFLX", "BABA", "DIS", "AMC",
                  "GME", "NIO", "SNDL", "AMZN"],
      sub_name: "WallStreetBets",
      sub_time_period: "Today"
    }
    this.change0 = this.change0.bind(this);
    this.change1 = this.change1.bind(this);
    this.change2 = this.change2.bind(this);
    this.change3 = this.change3.bind(this);
    this.change4 = this.change4.bind(this);
  }

  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
    // console.log(this.state.data_arr);
    this.change1();
    
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
      .then((res) => this.setState({ mongodb_data: res.data }))
  }

  // initialChange() {
  //   this.setState({ })
  // }

  change0() {
    var res = getSubAndTime("Investing", "all");
    this.setState({ data_arr: res[2] , sub_name: res[0], sub_time_period: res[1] })
    // console.log(res[0]);
  }

  change1() {
    var res = getSubAndTime("WallStreetBets", "all");
    this.setState({ data_arr: res[2] , sub_name: res[0], sub_time_period: res[1] })
    // console.log(res[0]);
    // console.log(this.state.mongodb_data);
  }

  change2() {
    var res = getSubAndTime("Stocks", "all");
    this.setState({ data_arr: res[2] , sub_name: res[0], sub_time_period: res[1] })
    // console.log(res[0]);
  }

  change3() {
    var sub = document.getElementById('sub_name').value;
    var time = document.getElementById('time_period').value;
    var res = getSubAndTime(sub, time);
    this.setState({ data_arr: res[2], sub_name: res[0], sub_time_period: res[1] });
  }

  change4() {
    var sub = document.getElementById('sub_options').value;
    var time = document.getElementById('time_options').value;
    var res = getSubAndTime(sub, time);
    this.setState({ data_arr: res[2], sub_name: res[0], sub_time_period: res[1] })
  }
  
  render() {
    if (this.state.mongodb_data.length != 0) {
      var new_data_arr = new Array(13);
      for (var i = 0; i < this.state.mongodb_data.length; i++) {
        new_data_arr[i] = this.state.mongodb_data[i].count;
      }
      // console.log(new_data_arr);
    }
    return (
      <div>
        <Bar class="my_bar" 
          data={{
            labels: this.state.label_arr,
            datasets: [
              {
                label: 'Tickers',
                data: new_data_arr,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderWidth: 2,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            legend: {
              display: false
            },
            maintainAspectRatio: true,
            tooltips: {
              enabled: true,
              mode: 'index'
            },
            responsive: false,
            title: {
              display: true,
              text: "r/" + this.state.sub_name + " (Today)",
              fontSize: 25,
              fontFamily: 'Cambria',
              fontColor: 'black'
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Tickers'
                  }
                }
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: '# Mentions',
                  },
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                boxWidth: 0,
                fontSize: 0,
              },
            },
          }}
        /> 
        <p> Tool for keeping track of how many times a ticker has been mentioned on the 
          r/WallStreetBets subreddit today.
        </p>
      </div>
    )    
  }
}

function getSubAndTime(input_subreddit, input_time_period){
  var ticker_mentions = [];
  for (let i = 0; i < ticks.tickers.length; i++){
    if (ticks.tickers[i].time_period === input_time_period && ticks.tickers[i].subreddit === input_subreddit){
      ticker_mentions.push(ticks.tickers[i].mentions);
    }
  }
  return [input_subreddit,input_time_period,ticker_mentions];  
}

export default BarChart