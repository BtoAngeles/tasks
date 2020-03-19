import * as React from "react";
import * as d3 from "d3";

class SimplePieChart extends React.Component{
    height = 600;
    width = 600;
    pie = null;
    constructor(props) {
        super(props);
        this.pie = d3.pie()(props.data);
  }

  render() {
    return (
        <svg height={this.height} width={this.width}>
          <g transform={`translate(${this.width / 2},${this.height / 2})`}>
            <Slice pie={this.pie} />
          </g>
        </svg>
      );
    };
  }

const Slice = props => {
  let { pie } = props;

  let arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(200);

  let interpolate = d3.interpolateRgb("#eaaf79", "#bc3358");

  return pie.map((slice, index) => {
    let sliceColor = interpolate(index / (pie.length - 1));

    return (<path d={arc(slice)} fill={sliceColor} key={'pie'+index} />);
  });
};

export default SimplePieChart;
