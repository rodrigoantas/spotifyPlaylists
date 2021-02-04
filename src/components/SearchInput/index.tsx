import React from 'react'


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';


interface SearchByNameInputProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const SearchInput: React.FC<SearchByNameInputProps> = ({setSearch}) => {
  const classes = useStyles();

  return (
    <>
    <div className={`${classes.root} searchInput`}>
        <TextField 
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          name='name' 
          id="outlined-basic" 
          label="Procure uma playlist" 
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
             )
            }}
           >
           <SearchIcon/>
          </TextField> 
         
    </div>
    
    </>
  )
}

export default SearchInput