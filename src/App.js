import React from 'react';
import TableData from './components/table/table';
import { get } from './utils/api';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  getAll = async() => {
    console.log("GETALL");
    await get('all')
      .then((resp) => {
        const { data } = resp;
        console.log("Resp ->", data);
        this.setState({data: data});
      })
      .catch((error)=> {
        console.log("Error ->", error);
      })
  }

  async componentDidMount() {
    this.getAll();
  }
  render() {
    return (
      <div className="App">
          {this.state.data && <TableData data={this.state.data}/>}
      </div>
    );
  }
}

export default App;
