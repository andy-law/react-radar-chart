import React from 'react';

import ReactRadarChartLine from './react-radar-chart-line';

import './react-radar-chart.scss';

class ReactRadarChart extends React.Component {

  constructor(props) {
    super(props);
    this._defaultSize = '100%';
  }

  getLineElems() {
    if (!this.props.values) {
      return <g></g>;
    } else {
      return this.props.values.map((d, i) => {
        return <ReactRadarChartLine key={ i } />;
      });
    }
  }

  render() {
    return (
      <svg
        className='react-radar-chart'
        width={ this.props.svgSize || this._defaultSize }
        height={ this.props.svgSize || this._defaultSize }
      >
        { this.getLineElems() }
      </svg>
    );
  }
}

export default ReactRadarChart;
