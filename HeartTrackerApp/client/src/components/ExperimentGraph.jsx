// Sources:
// -- https://hackernoon.com/building-d3-components-with-react-7510e4743288
// -- https://bl.ocks.org/mbostock/3884955

import React, { Component } from 'react';
import * as d3 from 'd3';

class ExperimentGraph extends Component {

  //when component mounts, set the context of an svg file that d3 will create
  componentDidMount() {
    this.setContext();
  }

  // called when component mounts to give d3 a canvas (svg file) to draw on
  // -- sets attributes for the svg file
  setContext() {
    return d3.select(this.refs.graph).append('svg')
      .attr('height', '300px')
      .attr('width', '500px')
      .attr('id', 'graph')
      .append('g') // are we appending a graph on the svg canvas after setting the svg attrs?
      .attr('transform', `translate(150, 150)`); // what does this transform do?
  }

  render() {
    return(
      <div ref='graph' className='experiment-graph'></div>
    )
  }
}

export default ExperimentGraph;