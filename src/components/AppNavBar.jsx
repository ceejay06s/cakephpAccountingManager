import React from 'react'
import { Outlet, useParams } from "react-router-dom";
import {
    Divider,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Drawer,
    Menu,
    MenuItem,
    Link,
    Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserContext } from './App';
import NavDrawer from './NavBar/NavDrawer';
import WalletIcon from '@mui/icons-material/Wallet';
const drawerWidth = 240;
const navItems = ['Login', 'SignUp'];
const navItemsAuth = ['Home'];
export default function AppNavBar(props) {
    const { name } = useParams();
    const { authdata, setAuthdata } = React.useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { window } = props;

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none', } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <WalletIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {(name ? name : "Wallet.Theologic")}
                    </Typography>
                    {
                        (authdata) ?
                            <>
                                <Box display={{ xs: 'none', md: 'flex' }}>
                                    {navItemsAuth.map((page) => (
                                        <Button
                                            href={"/#/".page}
                                            key={page}
                                            //onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'flex' } }}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </Box>
                                <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <Avatar
                                            alt={(authdata ? authdata.User.first_name : 'N/A')}
                                            src="/static/images/avatar/1.jpg"

                                        />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem>{authdata.User.first_name} {authdata.User.last_name}</MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <Link href="/users/logout" sx={{ color: 'inherit', textDecoration: 'none' }}>
                                            <MenuItem>  Logout </MenuItem>
                                        </Link>
                                    </Menu>
                                </Box>
                            </> :
                            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                <Button href="/#/Login" color="inherit">Login</Button>
                                <Button href="/#/SignUp" color="inherit">SignUp</Button>
                            </Box>

                    }
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <NavDrawer
                        handleClose={handleClose}
                        handleMenu={handleMenu}
                        handleDrawerToggle={handleDrawerToggle}
                        navItems={navItems}
                        navItemsAuth={navItemsAuth}
                    />
                </Drawer>
            </nav>
            <Outlet />
        </Box >
    )
}
