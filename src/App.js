import './App.css';
import BooksList from './components/BooksList';
import HomePage from './components/HomePage';
import {BrowserRouter, Routes, Route, NavLink,} from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Form from './components/Form';
import Login from './pages/Login';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {
  const name = "Fenil";

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "green",
          }
        }
      }    
    }
  });

  return (
    <>  
      {/* <img src={logo} width="200" height="200" alt="logo"  />  */}
      <ThemeProvider theme={theme}>
      <BrowserRouter>
       {/* <div
         style={{
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          
         }}
       > */}
        <div className='navbar'>
          <div className='navTitle'> Book Store  </div>
            <div className='navItem'>
             <NavLink to="/" className='navLink'> Login </NavLink>
             <NavLink to="/home" className='navLink'> Home </NavLink> 
             <NavLink to="/books" className='navLink'> BooksList </NavLink> 
             <NavLink to="/form" className='navLink'> Form </NavLink> 
            </div>     
          </div>
        {/* </div> */}
        <Routes>
           <Route path="/" element={<Login />}></Route>
           <Route path="/home" element={<HomePage userName={name} />}></Route>
           <Route path="/books" element={<BooksList />}></Route>
           <Route path="/form" element={<Form />}></Route>
           <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
