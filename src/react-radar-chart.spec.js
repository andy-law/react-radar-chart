import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactRadarChart from './react-radar-chart';

describe('React Radial Chart', () => {

  beforeEach(() => {
  });

  let component;

  it('Should set the container SVG width and height to the correct value based on props', () => {
    component = TestUtils.renderIntoDocument(
      <ReactRadarChart
        svgSize='100'
      />
		);

    let element = TestUtils.findRenderedDOMComponentWithClass(component, 'react-radar-chart');
    let widthAttr = element.getAttribute('width');
    let heightAttr = element.getAttribute('height');
    expect(widthAttr).toBe('100');
    expect(heightAttr).toBe('100');

    component = TestUtils.renderIntoDocument(
      <ReactRadarChart
        svgSize='200'
      />
		);
    element = TestUtils.findRenderedDOMComponentWithClass(component, 'react-radar-chart');
    widthAttr = element.getAttribute('width');
    heightAttr = element.getAttribute('height');
    expect(widthAttr).toBe('200');
    expect(heightAttr).toBe('200');
  });

  it('Should set the container SVG width and height to 100% if none passed in via props', () => {
    component = TestUtils.renderIntoDocument(
      <ReactRadarChart />
		);
    let element = TestUtils.findRenderedDOMComponentWithClass(component, 'react-radar-chart');
    expect(element.getAttribute('width')).toBe('100%');
    expect(element.getAttribute('height')).toBe('100%');
  });
});
