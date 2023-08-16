import React from "react";
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoginAuth from "../layout/LoginAuth";

const HomePage = ({values, setFieldValue}) => {
    //const {userName} = props

   
return (
        <> 
         <h1 className="homeHead"> My Book Store</h1>
         <div className="search"> 
         <TextField variant='outlined' label='search' className='text'  name='search' ></TextField> 
         <Button variant='contained' type='submit'><SearchIcon></SearchIcon></Button>
         </div>
         <div className="homeImg"></div>
        </> 
        
        );
      };    

export default LoginAuth(HomePage);