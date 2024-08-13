import { useState, useEffect } from 'react';
import LivrosContext from '../../../contextos/LivrosContext';
import Tabela from './Tabela';
import Form from './Form';
import Carregando from '../../comuns/Carregando';
import { auth } from '../../../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  deleteLivroFirebase,
  addLivroFirebase,
  updateLivrosFirebase,
  getLivrosUIDFirebase,
} from '../../../servicos/LivroService';
import { Navigate } from 'react-router-dom';

function Livros() {
  const [user, loading, error] = useAuthState(auth);

  const [listaObjetos, setListaObjetos] = useState([]);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    if (user?.uid != null) {
      const uid = user?.uid;
      getLivrosUIDFirebase(uid, setListaObjetos);
    }
    setCarregando(false);
  }, [user]);

  if (user) {
    return (
      <>
        <Carregando carregando={carregando}>
          <Tabela />
        </Carregando>
        <Form />
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default Livros;
