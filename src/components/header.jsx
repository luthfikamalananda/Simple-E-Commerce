import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'

import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Card, CardContent, CardMedia, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import reactImg from '../assets/react.png'
import { useTheme } from '@emotion/react';
import { CartContext } from '../context/CartProvider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const pages = [
    {
        name: 'Products',
        link: '/products'
    },
    {
        name: 'Checkout',
        link: '/checkout'
    }
];



function ResponsiveAppBar() {
    const cartGlobal = useContext(CartContext)

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        handleOpenNavMenu
        localStorage.removeItem('credential')
        navigate('/login')
    }

    const btnAddQuantity = (id) => {
        cartGlobal.addQuantityCart(id);
    }

    const btnSubtractQuantity = (id) => {
        cartGlobal.subtractQuantityCart(id);
    }

    const btnRemoveProduct = (id) => {
        cartGlobal.removeFromCart(id);
    }

    const DrawerList = (
        <Box sx={{ width: { xl: 600, lg: 600, md: 500, sm: 400, xs: 250 } }} role="presentation">
            {cartGlobal.cart.map((data) => (
                <div className="row mb-3 mb-4 p-4 bt-2 border-bottom cart-container">
                    <div className="col-auto align-self-center">
                        <img src={data.image} style={{width:'70px', height:'100px', objectFit:'contain'}} alt="product image" className='img-fluid productCart-image' />
                    </div>
                    <div className="col p-0">
                        <h2 className='productCart-text'>{data.title}</h2>
                        <h3 className='productCart-text'>${data.price * data.quantity} </h3>
                        <div className="row">
                            <div className="col-auto">
                            {data.quantity > 1 ? <button className='btn btn-light cart-button' onClick={() => btnSubtractQuantity(data.id)}>-</button> : ''}
                            </div>
                            <div className="col-auto fw-bold align-self-center justify-content-center cart-quantity" >
                                {data.quantity}
                            </div>
                            <div className="col-auto">
                                <button className='btn btn-light cart-button' onClick={() => btnAddQuantity(data.id)}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-auto text-center align-self-center p-0">
                        <button className='btn btn-danger p-2 cart-button' style={{fontSize:'24px', width:'50px'}} onClick={() => btnRemoveProduct(data.id)}>X</button>    
                    </div>
                </div>
            ))}
            <h4 className='d-flex justify-content-center'>TOTAL: ${Math.floor(cartGlobal.cart.reduce((accumulator,curr) => accumulator + (curr.price*curr.quantity), 0) * 100)/100}</h4>
             <div className="d-flex justify-content-center align-self-center ">

                    <Link to={'/checkout'}><button className='btn btn-danger fs-2 fw-bold'>CHECKOUT NOW</button></Link>
                  </div>
        </Box>
    );

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        component={Link}
                        to={'/products'}
                    >
                        FSA Store
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" sx={{color: 'black', display: 'block', textDecoration:'none',}} component={Link} to={page.link}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                            <MenuItem key='LogOut' onClick={handleCloseNavMenu}>
                                <Typography textAlign="center" component={Link} sx={{color: 'black', display: 'block', textDecoration:'none',}} >LogOut</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        FSA
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', textDecoration:'none',}}
                                component={Link} to={page.link}
                            >
                                {page.name}
                            </Button>
                        ))}
                        <Button
                            key='LogOut'
                            onClick={handleLogout}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            component={Link}
                        >
                            LogOut
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>

                        <Tooltip title="Open Cart">
                            <IconButton onClick={toggleDrawer(true)} color='inherit' ><ShoppingCartIcon /></IconButton>
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                {DrawerList}
                            </Drawer>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;