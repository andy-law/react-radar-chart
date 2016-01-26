import React from 'react';

import './react-radar-chart-axes.scss';

class ReactRadarChartAxes extends React.Component {

  /**
   * Map the number of circles that should be rendered (based on the domain of the radius)
   * into an array of JSX elements representing SVG group elements
   * @return {JSX} SVG Group elements contain a circle, rectangle and text element. Rect Overlays the circle so that text is visible
   */
  getAxisCircles() {
    const radiusDomain = this.props.radiusScale.domain();
    const numCircles = 1 + (Math.abs(radiusDomain[1] - radiusDomain[0]) / this.props.dataStep);
    const circTranslate = (this.props.svgSize * 0.5);
    return (
      <g
        className='react-radar-chart-axes__circles'
        transform={ 'translate(' + circTranslate + ', ' + circTranslate + ')' }
      >
      {
        Array.from({length: numCircles}, (d, i) => this.props.dataMin + (this.props.dataStep * i) ).map( d => {
          const yOffset = this.props.radiusScale(d) - 10;
          return (<g key={ d } className='react-radar-chart-axes__value'>
            <circle key={ d }
              className='react-radar-chart-axes__value-circle'
              r={ this.props.radiusScale(d) }
            />
            <rect
              className='react-radar-chart-axes__value-rect'
              width='20'
              height='20'
              transform={ 'translate(-10, ' + yOffset + ')' }
            />
            <text
              className='react-radar-chart-axes__value-text'
              width='20'
              height='20'
              transform={ 'translate(0, ' + yOffset + ')' }
            >{ d }</text>
          </g>);
        }, this )
      }
    </g>);
  }

  /**
   * Map the valueKeys into an array of lines and labels
   * @return {Boolean} [description]
   */
  getAxisLines() {
    const translate = (this.props.svgSize * 0.5);
    return (<g className='react-radar-chart-axes__keys' transform={ 'translate(' + translate + ', ' + translate + ')' }>
      {
        this.props.valueKeys.map( (d, i) => {
          let radiusDomain = this.props.radiusScale.domain();
          return (<g key={ i }
            className='react-radar-chart-axes__key'
            transform={ 'rotate(' + (this.props.angleScale(i + 0.5) + 180) + ')' }
          >
            <line
              className='react-radar-chart-axes__key-line'
              x1='0' x2='0'
              y1={ this.props.radiusScale( radiusDomain[0] ) }
              y2={ this.props.radiusScale( radiusDomain[1] ) }
            />
            <text
              className={ (this.props.angleScale(i) < 180 ? 'react-radar-chart-axes__line-label --align-right' : 'react-radar-chart-axes__line-label') }
              width={ this.props.radiusScale( radiusDomain[1] ) }
              transform={
                (this.props.angleScale(i) < 180 ?
                'rotate(90) translate(' + this.props.radiusScale( radiusDomain[1] ) + ', 0)' :
                'rotate(-90) translate(-' + this.props.radiusScale( radiusDomain[1] ) + ', 0)')
              }
            >{ d }</text>
          </g>);
        })
      }
    </g>);
  }

  render() {
    return (<g className='react-radar-chart-axes'>
      { this.getAxisCircles() }
      { this.getAxisLines() }
    </g>);
  }
}

ReactRadarChartAxes.propTypes = {
  radiusScale: React.PropTypes.func,
  angleScale: React.PropTypes.func,
  svgSize: React.PropTypes.number,
  dataMin: React.PropTypes.number,
  dataStep: React.PropTypes.number,
  valueKeys: React.PropTypes.array
};

export default ReactRadarChartAxes;
