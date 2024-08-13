import { NavLink, Outlet } from 'react-router-dom';
import LogoIfsul from '../imagens/logo512.png';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { logout, auth, signInWithGithub } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function MenuPrincipal() {
  const [user, loading, error] = useAuthState(auth);
  const [anchorElMenuManutencoes, setAnchorElMenuManutencoes] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/'); // Redireciona para a página inicial após login
    }
  }, [user, loading, navigate]);

  const handleOpenMenuManutencoes = (event) => {
    setAnchorElMenuManutencoes(event.currentTarget);
  };

  const handleCloseMenuManutencoes = () => {
    setAnchorElMenuManutencoes(null);
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

  const handleLogOut = () => {
    logout();
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              alt="Logo IFSUL"
              src={LogoIfsul}
            />
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Meus Livros
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
                {user && (
                  <>
                    <MenuItem onClick={handleOpenMenuManutencoes}>
                      <Typography textAlign="center">Manutenções</Typography>
                    </MenuItem>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-manutencoes"
                      anchorEl={anchorElMenuManutencoes}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={anchorElMenuManutencoes}
                      onClose={handleCloseMenuManutencoes}
                    >
                      <MenuItem
                        onClick={handleCloseMenuManutencoes}
                        component={NavLink}
                        to="livros"
                      >
                        <Typography textAlign="center">Meus livros</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )}
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={NavLink}
                  to="sobre"
                >
                  <Typography textAlign="center">Sobre...</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Avatar
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
              alt="Logo IFSUL"
              src={LogoIfsul}
            />
            <Typography
              variant="h5"
              noWrap
              component={NavLink}
              to="/"
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
              Meus Livros
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {user && (
                <>
                  <Button
                    onClick={handleOpenMenuManutencoes}
                    sx={{
                      my: 2,
                      color: 'white',
                      display: 'block',
                      textTransform: 'unset !important',
                    }}
                  >
                    Manutenções
                  </Button>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-manutencoes"
                    anchorEl={anchorElMenuManutencoes}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElMenuManutencoes)}
                    onClose={handleCloseMenuManutencoes}
                  >
                    <MenuItem
                      onClick={handleCloseMenuManutencoes}
                      component={NavLink}
                      to="livros"
                    >
                      <Typography textAlign="center">Meus livros</Typography>
                    </MenuItem>
                  </Menu>
                </>
              )}
              <Button
                onClick={handleCloseNavMenu}
                component={NavLink}
                to="sobre"
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'unset !important',
                }}
              >
                Sobre...
              </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Typography>
                {' '}
                {user ? user.displayName : 'Fazer login'}
              </Typography>
              <Tooltip title="Abrir configurações">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user ? (
                    <img
                      alt="Foto de perfil"
                      src={user.photoURL}
                      style={{ width: '40px', borderRadius: '100px' }}
                    />
                  ) : (
                    <Avatar />
                  )}
                </IconButton>
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
                {user ? (
                  <>
                    <MenuItem onClick={handleLogOut}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={signInWithGithub}>
                      <Typography textAlign="center">
                        Login com GitHub
                      </Typography>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
}

export default MenuPrincipal;
