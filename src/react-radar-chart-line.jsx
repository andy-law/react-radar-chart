import React from 'react';

class ReactRadarChartLine extends React.Component {

  getLine() {
    
  }

  getPoints() {

  }

  render() {
    return (<g className={ 'react-radar-chart-line ' + (this.props.className || '') }>
      { this.getLine() }
      <g className='react-radar-chart-line__points'>
        { this.getPoints() }
      </g>
    </g>);
  }
}

export default ReactRadarChartLine;
