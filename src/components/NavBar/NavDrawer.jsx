import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WalletIcon from '@mui/icons-material/Wallet';
import { UserContext } from '../App';

export default function NavDrawer(navMenu) {
    const { authdata, setAuthdata } = React.useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
        <Box onClick={navMenu.handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                {
                    (authdata) ?
                        <Box>
                            <Button
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-drawer"
                                //aria-haspopup="true"
                                onClick={navMenu.handleMenu}
                                color="inherit"
                            >

                                <List dense>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={(authdata ? authdata.User.first_name : 'N/A')}
                                                src="/static/images/avatar/1.jpg"
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={(authdata ? authdata.User.first_name + ' ' + authdata.User.last_name : '')} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText inset primary={(authdata ? '@' + authdata.User.username : '')} />
                                    </ListItem>
                                </List>
                            </Button>

                        </Box>
                        :
                        <Box>
                            <WalletIcon sx={{ mr: 1 }} />
                            <Typography>Wallet.Theologic</Typography>
                        </Box>
                }


            </Typography>
            <Divider />
            <List>
                {(authdata) ?
                    <Box>
                        {navMenu.navItemsAuth.map((item) => (
                            <Link key={item} href={'#/' + item} style={{ color: 'inherit', textDecoration: 'none' }}>
                                <ListItem key={item} disablePadding>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                        <Link href={'/users/logout'} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <ListItem disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={'Logout'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </Box>
                    :
                    <Box>
                        {navMenu.navItems.map((item) => (
                            <Link key={item} href={'#/' + item} style={{ color: 'inherit', textDecoration: 'none' }}>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ textAlign: 'center' }}>
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}

                    </Box>
                }
            </List>
        </Box>
    )
}
