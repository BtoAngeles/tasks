import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { post, deleteTask, patch } from '../../utils/api';
import SimpleAlerts from '../../components/alert/alert';
import FullScreenDialog from '../dialog/dialog';
import { Edit, Delete, Search, Clear, AddBox, FirstPage, LastPage, ChevronLeft, ChevronRight, SaveAlt , Check } from "@material-ui/icons";

class TableData extends React.Component {
    //Iconos que se le asigana al componente de la tabla
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

    //Acciones que puede tener la tabla (Agregar, actualizar y borrar una tarea)
    editable = {
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
            this.updateTask(newData);
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
            this.deteleTask(oldData);
            setTimeout(() => {
              resolve();
              this.setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      };

    constructor(props){
        super(props);
        this.state = {
            title: props.title,
            isEditable: props.isEditable,
            //Columnas que tiene la tabla
            columns: [
                { title: 'Titulo', field: 'title',headerStyle: {backgroundColor: '#039be5'}},
                { title: 'Descripción', field: 'description',headerStyle: {backgroundColor: '#039be5'} },
                { title: 'Duracion', field: 'time', type: 'numeric',headerStyle: {backgroundColor: '#039be5'} },
                { title: 'Completado', field: 'isComplete',headerStyle: {backgroundColor: '#039be5'}}
              ],
            data: props.data,
            selectedRow: null,
            type: "",
            message: "",
            alertFlag: false,
            fullScreen: false
        };
    }

    //oculta el alert de mensajes (Exitos, error) solo se muestra 6 seg. y se cierra
    closeAlert = () => {
        setTimeout(()=>{
            this.setState({alertFlag: false});
        }, 6000);
    }

    //Lamada de servicio para agregar una nueva tarea
    /*
    *   RequestBody
    *
    *   title: ""
    *   description: ""
    *   time: ""
    *   isComplete: false o true
    * 
    * */
    addTask = async (request) => {
        await post('add', request)
            .then((resp) => {
                this.setState({type: "success", message: "Tarea agregada correctamente", alertFlag: true});
                this.closeAlert();
            })
            .catch((error)=> {
                this.setState({type: "error", message: "Ocurrio un error al agregar la tarea", alertFlag: true});
                this.closeAlert();
            });
    }

    // Llamada de servicio de eliminar tarea
    /*
    *   RequestParam
    *   
    *   id: 1
    */
    deteleTask = async (request) => {
        await deleteTask('delete?id='+request.id)
            .then((resp) => {
                this.setState({type: "success", message: "Tarea borrada correctamente", alertFlag: true});
                this.closeAlert();
            })
            .catch((error) => {
                this.setState({type: "error", message: "Ocurrio un error al borrar la tarea", alertFlag: true});
                this.closeAlert();
            });
    }

        //Lamada de servicio para modificar una nueva tarea
    /*
    *   RequestBody
    *
    *   title: ""
    *   description: ""
    *   time: ""
    *   isComplete: false o true
    * 
    * */
    updateTask = async (request) => {
        await patch('update?id='+request.id, request)
            .then((resp) => {
                this.setState({type: "success", message: "Tarea modificada correctamente", alertFlag: true});
                this.closeAlert();
            })
            .catch((error)=> {
                this.setState({type: "error", message: "Ocurrio un error al modificar la tarea", alertFlag: true});
                this.closeAlert();
            })
    }

    //Metodo para cerrar la pantalla completa de descripcion de la tarea
    closeFull = () => {
        this.setState({fullScreen: false});
    }

    render() {
        return (
            <>
            { this.state.alertFlag && <SimpleAlerts type={this.state.type} message={this.state.message} />}
            <MaterialTable
              icons={this.tableIcon}
              title={this.state.title}
              columns={this.state.columns}
              data={this.state.data}
              onRowClick={((evt, selectedRow) => {
                this.setState({ selectedRow:selectedRow});
                this.setState({fullScreen: true})
              })}
              options={{
                rowStyle: rowData => ({
                  backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
              }}
              editable={this.state.isEditable ? this.editable : null}
            />

            { this.state.fullScreen &&<FullScreenDialog active={this.state.fullScreen} data={this.state.selectedRow} closeFull={this.closeFull}/>}

            </>
          );
    }
}

export default TableData;