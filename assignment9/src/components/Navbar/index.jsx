import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon, Logout as LogoutIcon, Pets as PetsIcon } from '@mui/icons-material';
import { logout } from '../../store/store';

const employeeLinks = [
  { label: 'Home',      path: '/' },
  { label: 'Jobs',      path: '/jobs' },
  { label: 'Companies', path: '/companies' },
  { label: 'About',     path: '/about' },
  { label: 'Contact',   path: '/contact' },
];

const adminLinks = [
  { label: 'Employees', path: '/admin/employees' },
  { label: 'Add Job',   path: '/add-job' },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const userType = localStorage.getItem('userType');
  const isAdmin = userType === 'admin';
  const navLinks = isAdmin ? adminLinks : employeeLinks;

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    dispatch(logout());
    navigate('/login');
  };

  const handleNav = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box
            onClick={() => handleNav(isAdmin ? '/admin/employees' : '/')}
            sx={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(108,99,255,0.15)',
              border: '1px solid rgba(108,99,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <PetsIcon sx={{ color: '#6c63ff', fontSize: 17 }} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: isMobile ? 1 : 0, mr: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00d4aa, #6c63ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer',
                fontFamily: '"Space Mono", monospace',
                letterSpacing: '0.05em',
              }}
              onClick={() => handleNav(isAdmin ? '/admin/employees' : '/')}
            >
              JobRabbit
            </Typography>
            {isAdmin && (
              <Chip
                label="Admin"
                size="small"
                sx={{
                  backgroundColor: 'rgba(108,99,255,0.15)',
                  color: '#6c63ff',
                  border: '1px solid rgba(108,99,255,0.3)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.6rem',
                  height: 20,
                }}
              />
            )}
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  sx={{
                    color: location.pathname === link.path ? 'primary.main' : 'text.secondary',
                    fontWeight: location.pathname === link.path ? 600 : 400,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: location.pathname === link.path ? '60%' : '0%',
                      height: '2px',
                      background: '#6c63ff',
                      transition: 'width 200ms ease',
                    },
                    '&:hover': { color: 'text.primary', backgroundColor: 'rgba(108,99,255,0.08)' },
                    '&:hover::after': { width: '60%' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {!isMobile && (
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              size="small"
              sx={{
                borderColor: 'rgba(255,255,255,0.15)',
                color: 'text.secondary',
                '&:hover': { borderColor: '#ff4d6d', color: '#ff4d6d', backgroundColor: 'rgba(255,77,109,0.08)' },
              }}
            >
              Logout
            </Button>
          )}

          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { backgroundColor: '#111118', width: 240, borderLeft: '1px solid rgba(255,255,255,0.08)' },
        }}
      >
        <Box sx={{ pt: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.path} disablePadding>
                <ListItemButton
                  onClick={() => handleNav(link.path)}
                  selected={location.pathname === link.path}
                  sx={{ '&.Mui-selected': { backgroundColor: 'rgba(108,99,255,0.12)', color: 'primary.main' } }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ color: '#ff4d6d' }}>
                <LogoutIcon sx={{ mr: 1, fontSize: 18 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
