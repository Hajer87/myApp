import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Date({data, setData}) {
  const classes = useStyles();
const handleChange=(e)=>{
  setData({...data, [e.target.name]: e.target.value})
}
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="new window.Date()"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
         
        }}
        name="date"
        onChange={handleChange}
      />
    </form>
  );
}

