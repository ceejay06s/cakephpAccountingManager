import React from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import AppNavBar from './AppNavBar'
import Home from './Home';
import SignInSide from './auth/SignInSide';
import SignUp from './auth/SignUp';
import Spa from './Spa';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const UserContext = React.createContext(null);





export default function App() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const LightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });


    const [authdata, setAuthdata] = React.useState(false);
    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch('/users/checkauth');
            const data = await response.json();
            setAuthdata(data);
            window.sessionStorage.setItem('Auth', data);
        }

        fetchData();
    }, []);

    return (

        <HashRouter>
            <UserContext.Provider value={{ authdata: authdata, setAuthdata: setAuthdata }}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Routes>
                        <Route index path="/Login" element={<SignInSide />} />
                        <Route path="/SignUp" element={<SignUp />} />
                        <Route path="/" element={<AppNavBar />} >
                            <Route path="/home" element={<Home />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </UserContext.Provider>
        </HashRouter>
    )
}
