import React from 'react';
import ScrollableTabsButtonPrevent  from './components/tabs/tabs';
import { get } from './utils/api';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  //Se realiza la llamada del servicio que obtiene la lista de todas las tareas
  getAll = async() => {
    await get('all')
      .then((resp) => {
        const { data } = resp;
        this.setState({data: data});
      })
      .catch((error)=> {
        console.log("Error ->", error);
      })
  }

  async componentDidMount() {
    this.getAll();
  }
  //Metodo de renderizado en donde mandamos llamar el componente de los tabs
  render() {
    return (
      <div className="App">
        { this.state.data && <ScrollableTabsButtonPrevent data={this.state.data} />}
      </div>
    );
  }
}

export default App;
