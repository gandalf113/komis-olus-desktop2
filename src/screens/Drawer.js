import React from 'react';
import {
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import { Breadcrumbs, Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import PrintIcon from '@mui/icons-material/Print';
import ListItemText from '@mui/material/ListItemText';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { useDispatch, useSelector } from 'react-redux';
import { setClientModal, setContractModal, setSaleModal } from '../redux/modalSlice';

// Sales
import SalesScreen from './sales/SalesScreen';
import MonthlySales from './sales/MonthlySales';
import DailySales from './sales/DailySales';
import AllSales from './sales/AllSales';

// Clients
import ClientsScreen from './clients/ClientsScreen';
import ClientDetailScreen from './clients/ClientDetailScreen';

// Contracts
import ContractsScreen from './contracts/ContractsScreen';
import ContractDetailScreen from './contracts/ContractDetailScreen';
import ContractPrint from './contracts/ContractPrint';

// Returns
import ReturnsScreen from './returns/ReturnsScreen';
import ReturnPrint from './returns/ReturnPrint';

import "../global.css";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(2),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const { path } = useSelector(state => state.screen);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleGoBack = () => {
        navigate(-1);
    }

    const handlePrint = () => {
        window.printer.print();
    }

    const breadcrumbs = path.split('\\');

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" color='success' open={open} className='no-print'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 0, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleGoBack}
                        color="inherit">
                        <KeyboardReturnIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {/* Komis OLUŚ */}
                        <Breadcrumbs aria-label="breadcrumb">
                            {breadcrumbs.map((p, index) => (
                                <Typography key={p} color={index === breadcrumbs.length - 1 ? 'white' : 'lightgray'}>
                                    {p}
                                </Typography>
                            ))}
                        </Breadcrumbs>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton onClick={handlePrint} size="large" aria-label="show 4 new mails" color="inherit">
                            <PrintIcon />
                        </IconButton>
                    </Box>
                </Toolbar>

            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                className='no-print'
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/clients')}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Klienci" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/contracts')}>
                            <ListItemIcon>
                                <ReceiptIcon />
                            </ListItemIcon>
                            <ListItemText primary="Umowy" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/sales')}>
                            <ListItemIcon>
                                <PointOfSaleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sprzedaż" />
                        </ListItemButton>
                    </ListItem>

                    {/* <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/sales/all')}>
                            <ListItemIcon>
                                <PointOfSaleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cała sprzedaż" />
                        </ListItemButton>
                    </ListItem> */}

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/returns')}>
                            <ListItemIcon>
                                <AssignmentReturnIcon />
                            </ListItemIcon>
                            <ListItemText primary="Zwroty" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Routes>
                    <Route path="/" element={<ClientsScreen />} exact />
                    <Route path="/clients" element={<ClientsScreen />} />
                    <Route path="/clients/:id" element={<ClientDetailScreen />} />

                    <Route path="/contracts" element={<ContractsScreen />} />
                    <Route path='/contracts/:id' element={<ContractDetailScreen />} />
                    <Route path='/contracts/:id/print' element={<ContractPrint />} />

                    <Route path="/sales/all" element={<AllSales />} />
                    <Route path="/sales" element={<SalesScreen />} />
                    <Route path="/sales/:date" element={<MonthlySales />} />
                    <Route path="/sales/:date/:day" element={<DailySales />} />

                    <Route path="/returns" element={<ReturnsScreen />} />
                    <Route path="/returns/:id/print" element={<ReturnPrint />} />
                </Routes>
            </Main>
        </Box>
    );
}