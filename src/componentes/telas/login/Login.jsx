import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Alerta from '../../comuns/Alerta';
import Carregando from '../../comuns/Carregando';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { signInWithGithub } from '../../../firebaseConfig';

function Login() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [carregando, setCarrengando] = useState(false);

    let navigate = useNavigate();

    const handleGitHubLogin = async () => {
        try {
            setCarrengando(true);
            await signInWithGithub();
            navigate("/"); // Redireciona para a página principal após login com sucesso
        } catch (err) {
            setAlerta({ status: "error", message: err.message });
        } finally {
            setCarrengando(false);
        }
    };

    return (
        <div>
            <Carregando carregando={carregando}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login de Usuário
                        </Typography>
                        <Alerta alerta={alerta} />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleGitHubLogin}
                        >
                            Efetuar Login com GitHub
                        </Button>
                    </Box>
                </Container>
            </Carregando>
        </div>
    )
}

export default Login;
