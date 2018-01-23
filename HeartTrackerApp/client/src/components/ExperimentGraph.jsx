// Sources:
// -- https://hackernoon.com/building-d3-components-with-react-7510e4743288
// -- https://bl.ocks.org/mbostock/3884955

import React, { Component } from 'react';
import * as d3 from 'd3';

class ExperimentGraph extends Component {
  render() {
    return(
      <div ref='graph'></div>
    )
  }
}