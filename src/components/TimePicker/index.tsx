import React from 'react'
import { TextField } from '@material-ui/core'

interface TimeInputProps {
  changed(e: any): void;
   filter: {
     id: string;
     name: string;
   }
}

const TimePicker: React.FC<TimeInputProps> = ({changed, filter}) => {

  const dropdownChanged = (e: any) => {
    changed(e.target.value);
}


  return (
    <div>
          <TextField
            label={filter.name}
            id={filter.id}
            name={filter.id}
            type="datetime-local"
            onChange={(e) => dropdownChanged(e)}
            InputLabelProps={{
              shrink: true,
            }}
            />
    </div>
    
  )
}

export default TimePicker