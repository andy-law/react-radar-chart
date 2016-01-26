import React from 'react';
import ReactDOM from 'react-dom';
import ReactRadarChart from '../src/react-radar-chart';

let lineValues = [
  {
    className: 'line-blue',
    lineType: 'dotted/dashed/solid',
    lineStyle: '',
    values: {
      stamina: 2,
      strength: 2,
      suppleness: 3,
      speed: 1,
      skill: 2,
      psychology: 2
    }
  }
];

let keys = ['psychology', 'stamina', 'skill', 'strength', 'speed', 'suppleness'];

ReactDOM.render(
  <ReactRadarChart
    svgSize='500px'
    keys={ keys }
    values={ lineValues }
    innerRadius={ 30 }
    dataMax={ 10 }
    dataStep={ 1 }
  />,
  document.getElementById('app-container')
)
