import React, {Component} from 'react';
import * as d3 from "d3";

class Graphs extends Component {
    data = [12, 5, 6, 6, 9, 10];
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        
        const w = 500;
        const h = 400;

        const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("margin-left", 100);
        
        svg.selectAll("rect")
            .data(this.data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green");
        }

    render() {
        return (
            <>
            <div id={"#" + this.props.id}></div>
            </>
        )
      }
}

export default Graphs;