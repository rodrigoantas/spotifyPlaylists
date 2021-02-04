import React from 'react';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";



interface IDropdownProps {
  options: Array<IDropdownDataItem>
  changed(e: any): void;
  selectedValue: string;
  filter: IDropwdownFilter
}

interface IDropdownDataItem {
  value: string;
  name: string;
}

interface IDropwdownFilter {
  id: string;
  name: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

const Dropdown: React.FC<IDropdownProps> = ({options, changed, selectedValue, filter}) => { 
  
  const classes = useStyles();

  const dropdownChanged = (e: any) => {
    changed(e.target.value);
}

    return (
        <>
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id={filter.id}>{filter.name} </InputLabel>
            <Select label={filter.name} labelId={filter.id} value={selectedValue} onChange={dropdownChanged} defaultValue={''}>
                <MenuItem value={''}>
                  None
                </MenuItem>
              {options.map((item, idx) => <MenuItem key={idx} value={item.value}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>
            
            
          </div>
        </>
    );
}

export default Dropdown;