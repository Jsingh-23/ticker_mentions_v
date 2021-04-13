import React from 'react'
import { defaults, Bar } from 'react-chartjs-2'
import data from "../ticker_data.json"

import '../Chart.css' 


defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'

const ticks = data;
const sub_names = ['Investing', 'SecurityAnalysis', 'Finance', 'WallStreetBets', 'Options', 'Stocks', 'StockMarket'];
const time_filters_list = ['hour','day','week','month','year','all'];

class BarChart extends React.Component {

  sub = sub_names[3];
  time = time_filters_list[5];

  constructor(props) {
    super(props);
    this.state = {
      data_arr: [],
      label_arr: ["MSFT", "PLTR", "TSLA", "AAPL", "TWTR", "NFLX", "BABA", "DIS"],
      sub_name: "",
      sub_time_period: ""
    }
    this.change0 = this.change0.bind(this);
    this.change1 = this.change1.bind(this);
    this.change2 = this.change2.bind(this);
    this.change3 = this.change3.bind(this);
    this.change4 = this.change4.bind(this);
  }

  componentDidMount() {
    this.change1();
  }

  change0() {
    var res = getSubAndTime("Investing", "all");
    this.setState({ data_arr: res[2] , sub_name: res[0], sub_time_period: res[1] })
    console.log(res[0]);
  }

  change1() {
    var res = getSubAndTime("WallStreetBets", "all");
    this.setState({ data_arr: res[2] , sub_name: res[0], sub_time_period: res[1] })
    console.log(res[0]);
  }

  change2() {
    var res = getSubAndTime("Stocks", "all");
    this.setState({ data_arr: res[2] , sub_name: res[0], sub_time_period: res[1] })
    console.log(res[0]);
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
    return (
      <div>
        <Bar
          data={{
            labels: this.state.label_arr,
            datasets: [
              {
                label: '# of Mentions',
                data: this.state.data_arr,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: true,
            responsive: false,
            title: {
              display: true,
              text: "r/" + this.state.sub_name + " (" + this.state.sub_time_period + ")",
              fontSize: 25
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                boxWidth: 0,
                fontSize: 15,
              },
            },
          }}
        />

        {/* <button onClick={this.change0}>Investing/all</button>
        <button onClick={this.change1}>WallStreetBets/all</button>
        <button onClick={this.change2}>Stocks/all</button>
        <br></br>
        <br></br>

        <form>
          <label htmlFor="sub_name">Subreddit: </label><br></br>
          <input type="text" id="sub_name" name="sub_name" defaultValue="Investing"></input><br></br>
          <label htmlFor="time_period">Time Period: </label><br></br>
          <input type="text" id="time_period" name="time_period" defaultValue="all"></input><br></br>
          <button id="submit_button" type="button" onClick={this.change3}></button>
        </form> */}

        <br></br>
        <br></br>

        <form id="drop_down_form"> 



          <div id="choose_sub" >

          <label htmlFor="sub_options">Choose a subreddit: </label>
          <select id="sub_options" name="sub_options">
            <option value="Investing">Investing</option>
            <option value="SecurityAnalysis">SecurityAnalysis</option>
            <option value="Finance">Finance</option>
            <option value="WallStreetBets">WallStreetBets</option>
            <option value="Options">Options</option>
            <option value="Stocks">Stocks</option>
            <option value="StockMarket">StockMarket</option>
          </select>
          </div>


          <div id="choose_time" >
          <label htmlFor="time_options">Choose a time period: </label>
          <select id="time_options" name="time_options">
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="all">All</option>
          </select>
          </div>
          


          <button id="submit_button" type="button" onClick={this.change4}>Rerender</button>
        </form>

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