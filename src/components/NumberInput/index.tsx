import React from 'react'


import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface NumberInputProps {
  changed(e: any): void;
  placeholder?: string;
  filter: {
    id: string;
    name: string;
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const NumberInput: React.FC<NumberInputProps> = ({changed, filter, placeholder}) => {

  const classes = useStyles();

  const numberInputChanged = (e: any) => {
    changed(e.target.value);
}

  return (
    <div className={classes.root}>
      <TextField
          placeholder={placeholder}
          onChange={numberInputChanged}
          id={filter.id}
          label={filter.name}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
   
    </div>
    
    
  )
}

export default NumberInput