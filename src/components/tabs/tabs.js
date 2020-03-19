import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PieChart from '@material-ui/icons/PieChart';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import List  from "@material-ui/icons/List";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TableData from '../table/table';
import { get } from '../../utils/api';
import Pie from '../graphs/pieHooks';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

class ScrollableTabsButtonPrevent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          value: 0,
          data: props.data,
          dataComplete: null,
          pieData: null
      }
  }

  //Llamada de la fucion de tareas completadas  y servicio de la graficas
  handleChange = async(event, newValue) => {
    this.setState({value: newValue});
    if (newValue === 1) {
        this.getGraphs();
    } else if (newValue === 2) {
        await get('complete?isComplete=true')
            .then((resp) => {
                this.setState({dataComplete: resp.data});
            })
            .catch((error) => {

            });
    }
  };


  //Metodo para obtener los datos de total, completados y faltantes de las tareas que tenemos en base de datos
  getGraphs = async() => {
    await get('data-graph')
      .then((resp) => {
        const { data } = resp;
        const pieData = [
            {
                date: 0,
                value: data.complete,
                title: "Completados"
            },{
                date: 1,
                value: data.missing,
                title: "Faltantes"
            }
        ];
        this.setState({pieData: pieData});
      })
      .catch((error)=> {
      })
  }

  render() {
    return (
        <div className={{
            flexGrow: 1,
            width: '100%',
            backgroundColor: 'blue',
          }}>
          <AppBar position="static">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              variant="scrollable"
              scrollButtons="off"
              aria-label="scrollable prevent tabs example"
            >
              <Tab label="Tareas" icon={<List />} aria-label="phone" {...a11yProps(0)} />
              <Tab label="Graficas" icon={<PieChart />} aria-label="favorite" {...a11yProps(1)} />
              <Tab label="Historial" icon={<PlaylistAddCheckIcon />} aria-label="person" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
                { this.state.data &&  <TableData data={this.state.data} title={"Tareas"} isEditable={true}/>}
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
             {this.state.pieData && <Pie data={this.state.pieData}      
                    width={400}
                    height={400}
                    innerRadius={120}
                    outerRadius={200}/>}
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
                { this.state.dataComplete &&  <TableData data={this.state.dataComplete} title={"Tareas completadas"} isEditable={false}/>}
          </TabPanel>
        </div>
      );
  }
}

export default ScrollableTabsButtonPrevent;