import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { post } from '../../utils/api';
import { Edit, Delete, Search, Clear, AddBox, FirstPage, LastPage, ChevronLeft, ChevronRight, SaveAlt , Check } from "@material-ui/icons";

class TableData extends React.Component {
    tableIcon = {
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt  {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Check:forwardRef((props, ref) => <Check {...props} ref={ref} />),
    }
    constructor(props){
        super(props);
        console.log("DAta ->", props.data);
        this.state = {
            columns: [
                { title: 'Titulo', field: 'title' },
                { title: 'Descripción', field: 'desc' },
                { title: 'Duracion', field: 'time', type: 'numeric' },
                { title: 'Completado', field: 'isComplete'}
              ],
            data: props.data
        };
    }

    addTask = async (request) => {
        await post('add', request)
            .then((resp) => {
                console.log(resp);
            })
            .catch((error)=> {
                console.log(error);
            });
    }
    render() {
        return (
            <MaterialTable
              icons={this.tableIcon}
              title="Tareas"
              columns={this.state.columns}
              data={this.state.data}
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    this.addTask(newData);
                    setTimeout(() => {
                      resolve();
                      this.setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        this.setState(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      this.setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
              }}
            />
          );
    }
}

export default TableData;