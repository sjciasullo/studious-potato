// Sources:
// -- https://hackernoon.com/building-d3-components-with-react-7510e4743288
// -- https://bl.ocks.org/mbostock/3884955

import React, { Component } from 'react';
import * as d3 from 'd3';

class ExperimentGraph extends Component {
  //test data
  data = [{
    "datapoint number": "0",
    "heartrate": "80"
  }, {
    "datapoint number": "1",
    "heartrate": "85"
  }, {
    "datapoint number": "2",
    "heartrate": "90"
  }, {
    "datapoint number": "3",
    "heartrate": "100"
  }, {
    "datapoint number": "4",
    "heartrate": "50"
  }, {
    "datapoint number": "5",
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
      /*
      .append('g') // are we appending a graph on the svg canvas after setting the svg attrs?
      .attr('transform', `translate(150, 150)`); // what does this transform do?
      */
  }

  drawAxes(context) {
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