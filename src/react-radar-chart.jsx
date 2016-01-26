import React from 'react';
import d3_scale from 'd3-scale';

import ReactRadarChartLine from './react-radar-chart-line';

import './react-radar-chart.scss';

class ReactRadarChart extends React.Component {

  constructor(props) {
    super(props);
    this._defaultSize = '100%';
    this._radiusScale = d3_scale.linear();
    this._angleScale = d3_scale.linear()
      range([0, Math.PI * 2]);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.keys && nextProps.keys.length && nextProps.keys.length !== this.props.keys.length) {
      this.setScaleDomain(this._angleScale, 0, nextProps.keys.length);
    }
  }

  dataUpdatedHandler() {
    if (this.props.outerRadius) {
      this._radiusScale
        .domain()
    }
    if (this.props.keys && this.props.keys.length) {
      this._angleScale.domain([0, this.props.keys.length]);
    }
  }

  getLineElems() {
    if (!this.props.values) {
      return '';
    }

    return this.props.values.map((d, i) => {
      return <ReactRadarChartLine key={ i } />;
    });
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

ReactRadarChart.propTypes = {
  svgSize: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  keys: React.PropTypes.array,
  values: React.PropTypes.array,
  innerRadius: React.PropTypes.number,
  outerRadius: React.PropTypes.number
};

export default ReactRadarChart;
