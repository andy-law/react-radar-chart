import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactRadarChartLine from './react-radar-chart-line';

describe('React Radial Chart Line', () => {

  let component;

  it('Should render a path and shape elements within a line', () => {
    
  });

  it('Should add classnames correctly to each line based on the config passed in', () => {
    component = TestUtils.renderIntoDocument(
      <ReactRadarChartLine
        className='radar-chart-line-test'
      />
		);
    let element = TestUtils.findRenderedDOMComponentWithClass(component, 'radar-chart-line-test');
    expect(element).not.toBeUndefined();
  });

  it('Should render line with the correct colour based on config passed in', () => {

  });

  it('Should fire back an event containing the point\'s data when rolled over', () => {

  });
});
