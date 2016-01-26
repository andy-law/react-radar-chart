import React from 'react';
import d3 from 'd3-scale';

import ReactRadarChartLine from './react-radar-chart-line';

import './react-radar-chart.scss';

class ReactRadarChart extends React.Component {

  constructor(props) {
    super(props);
    this._radiusScale = d3.scaleLinear();
    this._angleScale = d3.scaleLinear()
      .range([0, Math.PI * 2]);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.keys && nextProps.keys.length && nextProps.keys.length !== this.props.keys.length) {
      this.setScaleDomain(this._angleScale, 0, nextProps.keys.length);
    }
  }

  dataUpdatedHandler() {
    if (this.props.outerRadius) {
      const outerRadius = (this.props.outerRadius || this.refs['radar-svg'].offsetWidth);
      this._radiusScale
        .domain([this.props.innerRadius, outerRadius]);
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
        ref='radar-svg'
        width={ this.props.svgSize }
        height={ this.props.svgSize }
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

ReactRadarChart.defaultProps = {
  svgSize: '100%',
  innerRadius: 0
};

export default ReactRadarChart;
