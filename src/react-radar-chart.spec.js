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

  it('Should render a <g/> element with class \'react-radar-chart-line\' for each item passed in in the values array', () => {
    let values = [1, 2, 3, 4, 5];
    component = TestUtils.renderIntoDocument(
      <ReactRadarChart
        values={ values }
      />
    );
    let lines = TestUtils.scryRenderedDOMComponentsWithClass(component, 'react-radar-chart-line');
    expect(lines.length).toEqual(values.length);

    values = [1, 2, 3, 4, 5, 6, 7, 8];
    component = TestUtils.renderIntoDocument(
      <ReactRadarChart
        values={ values }
      />
    );
    lines = TestUtils.scryRenderedDOMComponentsWithClass(component, 'react-radar-chart-line');
    expect(lines.length).toEqual(values.length);
  });

  it('Should render the correct number of axes based on the keys passed in', () => {

  });

  it('Should render the correct label on each axis', () => {

  });

  it('Should render the correct number of circles based on the values passed in (based on min and max values)', () => {

  });

  it('Should render the correct label on each circle', () => {

  });

  it('Should render a path and shape elements within each line', () => {

  });

  it('Should add classnames correctly to each line based on the config passed in', () => {

  });

  it('Should render each line with the correct colour based on config passed in', () => {

  });

  it('Should fire back an event containing the point\'s data when rolled over', () => {

  });

  it('Should render the correct outer radius based on the svg size and line width', () => {

  });

  it('Should render the correct value for a line in each segment', () => {

  });

});
