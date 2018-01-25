// Sources:
// -- https://hackernoon.com/building-d3-components-with-react-7510e4743288
// -- https://bl.ocks.org/mbostock/3884955
// -- https://bl.ocks.org/pstuffa/26363646c478b2028d36e7274cedefa6

import React, { Component } from 'react';
import * as d3 from 'd3';

class ExperimentGraph extends Component {
  //test data
  data = [{
    "datapoint number": "1",
    "heartrate": "80"
  }, {
    "datapoint number": "2",
    "heartrate": "85"
  }, {
    "datapoint number": "3",
    "heartrate": "90"
  }, {
    "datapoint number": "4",
    "heartrate": "100"
  }, {
    "datapoint number": "5",
    "heartrate": "50"
  }, {
    "datapoint number": "6",
    "heartrate": "80"
  }]

  //when component mounts, set the context of an svg file that d3 will create
  componentDidMount() {
    const context = this.setContext();
  }

  // called when component mounts to give d3 a canvas (svg file) to draw on
  // -- sets attributes for the svg file
  setContext() {
    return d3.select(this.refs.graph).append('svg')
      .attr('height', '300px')
      .attr('width', '500px')
      .attr('id', 'graph')
      .append('g') // are we appending a graph on the svg canvas after setting the svg attrs?
      .attr('transform', `translate(10, 20)`); // what does this transform do?
  }

  drawAxes(context) {
    // source: 
    // https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935
    
    //constants for scaling
    const WIDTH = 500;
    const HEIGHT = 300;
    const MARGINS = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 30
    }

    //sets the scale of drawable range (x and y axis)
    // -- domains are hard coded will need to be adjusted
    const xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,7])
    const yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([40,110])
    const xAxis = context.axis().scale(xScale);
    const yAxis = context.axis().scale(yScale);

    context.append("svg:g").call(xAxis);

    return context.append('path')
      .datum({ })
  }

  render() {
    return(
      <div ref='graph' className='experiment-graph'></div>
    )
  }
}

export default ExperimentGraph;