import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CustomizedSwitches from '../switches/switches';
import Timer from '../timer/timer';
import { patch } from '../../utils/api';
import SimpleAlerts from '../../components/alert/alert';
import './dialog.css';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const { closeFull } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.active);
  const [dataTask, setDataTask] = React.useState(props.data);
  const [alertFlag, setAlertFlag] = React.useState(false);
  const [type, setType] = React.useState("success");
  const [message, setMessage] = React.useState("");

  const handleClose = () => {
    setOpen(false);
    closeFull();
  };

  const closeAlert = () => {
    setTimeout(()=>{
        setAlertFlag(false);
    }, 6000);
    }

    //Metodo que cambia el valor del estatus completado o faltante
    
  const changeStatus = async (status) => {
      dataTask.isComplete = status;
      setDataTask(dataTask);
      
    await patch('update?id='+dataTask.id, dataTask)
    .then((resp) => {
        setAlertFlag(true);
        setType("success");
        setMessage("Tarea "+ (status ? "terminada correctament" : "falta por concluir"));
        closeAlert();
    })
    .catch((error)=> {
        setAlertFlag(true);
        setType("error");
        setMessage("Ocurrio un error al cambiar el estatus de la tarea");
        closeAlert();
    })
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {dataTask.title}
            </Typography>
            <div className="contentTimer">
            <Timer />
            </div>
          </Toolbar>
        </AppBar>
        { alertFlag && <SimpleAlerts type={type} message={message} />}
        <List>
          <ListItem button>
            <ListItemText primary="Titulo" secondary={dataTask.title} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Descripción" secondary={dataTask.description} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Tiempo" secondary={dataTask.time} />
          </ListItem>
        </List>
        <List>
            <ListItem>
                <CustomizedSwitches  isComplete={dataTask.isComplete} changeStatus={changeStatus} />
            </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
