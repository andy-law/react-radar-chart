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
    this._svgSize = 0;
  }

  componentDidMount() {
    this._svgSize = this.refs.radarSvg.offsetWidth;
    this.dataUpdatedHandler();
  }

  dataUpdatedHandler() {
    if (this.props.outerRadius) {
      const outerRadius = (this.props.outerRadius || this.refs.radarSvg.offsetWidth);
      const flattenedValues = this.props.values.reduce(
        (prev, curr) => prev.concat(
          Object.keys(curr.values).map(k => curr.values[k])
        ),
        []
      );
      const max = (this.props.dataMax || Math.max.apply(null, flattenedValues));
      this._radiusScale
        .domain([this.props.dataMin, max])
        .range([this.props.innerRadius, outerRadius]);
    }
    if (this.props.keys && this.props.keys.length) {
      this._angleScale.domain([0, this.props.keys.length]);
    }
  }

  getRadarAxes() {
    const radiusDomain = this._radiusScale.domain();
    const numCircles = 1 + (Math.abs(radiusDomain[1] - radiusDomain[0]) / this.props.dataStep);
    console.log(this._svgSize);
    const circTranslate = this._svgSize * 0.5;
    return (<g className='react-radar-chart__axes'>
      <g className='react-radar-chart__axis-circles'>
        {
          Array.from({length: numCircles}, (d, i) => this.props.dataMin + (this.props.dataStep * i) ).map( d => {
            return (
              <circle key={ d }
                className='react-radar-chart__axis-circle'
                r={ this._radiusScale(d) }
                transform={ 'translate(' + circTranslate + ', ' + circTranslate + ')' }
              />);
          }, this )
        }
      </g>
      <g className='react-radar-chart__lines'>

      </g>
    </g>);
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
        ref='radarSvg'
        width={ this.props.svgSize }
        height={ this.props.svgSize }
      >
        { this.getRadarAxes() }
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
  outerRadius: React.PropTypes.number,
  dataMin: React.PropTypes.number,
  dataMax: React.PropTypes.number,
  dataStep: React.PropTypes.number
};

ReactRadarChart.defaultProps = {
  svgSize: '100%',
  innerRadius: 0,
  dataMin: 0,
  dataStep: 1
};

export default ReactRadarChart;
