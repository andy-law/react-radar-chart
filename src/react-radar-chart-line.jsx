import React from 'react';

class ReactRadarChartLine extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.model) {
      this.onModelUpdated();
    }
  }

  componentDidUpdate(lastProps, lastState) {
    if (this.props.model && !lastProps.model) {
      this.onModelUpdated();
    }
  }

  onModelUpdated() {
    className
  lineType: R
  lineStyle:
  pointType:
    pointSize
  }

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

ReactRadarChartLine.propTypes = {
  model: React.PropTypes.object,
  valueKeys: React.PropTypes.array,
  radiusScale: React.PropTypes.array,
  angleScale: React.PropTypes.array
}

export default ReactRadarChartLine;
