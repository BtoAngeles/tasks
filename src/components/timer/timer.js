import React from "react";
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';

import "./styles.css";

class Timer extends React.Component {
    constructor (props) {
      super(props)
      this.state = {count: 1}
    }
    componentWillUnmount () {
      clearInterval(this.timer)
    }
    tick () {
      this.setState({count: (this.state.count + 1)})
    }
    startTimer () {
      clearInterval(this.timer)
      this.timer = setInterval(this.tick.bind(this), 1000)
    }
    pauseTimer () {
      clearInterval(this.timer)
    }
    render () {
      return (
        <div className='timer'>
          <h1>{this.state.count}</h1>
          <div className="controles">
            <PlayArrow className="sizeIcon" onClick={this.startTimer.bind(this)}>Iniciar</PlayArrow>
            <Pause className="sizeIcon" onClick={this.pauseTimer.bind(this)}>Pausar</Pause>
          </div>
        </div>
      )
    }
  }
  
export default Timer;