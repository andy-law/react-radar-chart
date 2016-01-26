import React from 'react';
import d3 from 'd3-scale';

import ReactRadarChartLine from './react-radar-chart-line';
import ReactRadarChartAxes from './react-radar-chart-axes';

import './react-radar-chart.scss';

class ReactRadarChart extends React.Component {

  constructor(props) {
    super(props);
    this._radiusScale = d3.scaleLinear();
    this._angleScale = d3.scaleLinear()
      .range([0, 360]);
    this.state = {
      svgSize: 0
    };
  }

  /**
   * React lifecycle method. Set internal svgSize state (based on the ref, not props as props could be px or % value)
   * @return {void}
   */
  componentDidMount() {
    console.log(this.refs.radarSvg);
    this.setState({
      svgSize: this.refs.radarSvg.offsetWidth
    });
    this.dataUpdatedHandler();
  }

  /**
   * Initial data received or data updated via props. Set internal scale values for radius and angles
   * @return {[type]} [description]
   */
  dataUpdatedHandler() {
    if (this.props.values) {
      // if no outerradius specifically set, reduce size by 20 due to text size
      const outerRadius = (this.props.outerRadius || (this.refs.radarSvg.offsetWidth - 20) * 0.5);
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

  /**
   * Get the axes (circles for indicating the values and lines for showing the keys)
   * @return {ReactRadarChartAxes} JSX object representing an svg g attribute
   */
  getRadarAxes() {
    return (
      <ReactRadarChartAxes
        radiusScale={ this._radiusScale }
        angleScale={ this._angleScale }
        svgSize={ this.state.svgSize }
        dataMin={ this.props.dataMin }
        dataStep={ this.props.dataStep }
        valueKeys={ this.props.keys }
      />
    );
  }

  getLineElems() {
    if (!this.props.values) {
      return '';
    }

    return this.props.values.map((d, i) => {
      return (
        <ReactRadarChartLine
          key={ i }
          model={ d }
          valueKeys={ this.props.keys }
          radiusScale={ this._radiusScale }
          angleScale={ this._angleScale }
          svgSize={ this.state.svgSize }
        />
      );
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
        <g className='react-radar-chart__lines'>
          { this.getLineElems() }
        </g>
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
