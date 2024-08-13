import { useState, useEffect } from 'react';
import LivrosContext from './LivrosContext';
import { auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  deleteLivroFirebase,
  addLivroFirebase,
  updateLivrosFirebase,
  getLivrosUIDFirebase,
} from '../servicos/LivroService';
import { Navigate } from 'react-router-dom';

function LivrosProvider({ children }) {
  const [user, loading, error] = useAuthState(auth);

  const [alerta, setAlerta] = useState({ status: '', message: '' });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    id: '',
    titulo: '',
    autor: '',
    editora: '',
    comentario: '',
    ano_publicao: '',
    usuario: user?.displayName,
    uid: user?.uid,
  });
  const [carregando, setCarregando] = useState(true);
  const [abreDialogo, setAbreDialogo] = useState(false);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: '', message: '' });
    setObjeto({
      id: '',
      titulo: '',
      autor: '',
      editora: '',
      comentario: '',
      ano_publicao: '',
      usuario: user?.displayName,
      uid: user?.uid,
    });
    setAbreDialogo(true);
  };

  const editarObjeto = async (objeto) => {
    setObjeto(objeto);
    setAbreDialogo(true);
    setEditar(true);
    setAlerta({ status: '', message: '' });
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    if (editar) {
      try {
        const newObjeto = await updateLivrosFirebase(objeto);
        //  setListaObjetos((objetos) => [...objetos, newObjeto]);

        setAlerta({
          status: 'success',
          message: 'Post atualizado com sucesso',
        });
      } catch (err) {
        setAlerta({
          status: 'error',
          message: 'Erro ao atualizar o livro:' + err,
        });
      }
    } else {
      // novo
      try {
        const newObjeto = await addLivroFirebase(objeto);
        // setListaObjetos((objetos) => [...objetos, newObjeto]);
        setAlerta({ status: 'success', message: 'Post criado com sucesso' });
      } catch (err) {
        setAlerta({ status: 'error', message: 'Erro ao criar o livro:' + err });
      }
    }
    setAbreDialogo(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const remover = async (objeto) => {
    if (window.confirm('Remover este objeto?')) {
      try {
        await deleteLivroFirebase(objeto);
        // setListaObjetos((objetos) =>
        //   objetos.filter((obj) => obj.id !== objeto.id)
        // );
        setAlerta({
          status: 'success',
          message: 'Livro removido com sucesso!',
        });
      } catch (err) {
        setAlerta({ status: 'error', message: 'Erro ao  remover: ' + err });
      }
    }
  };

  useEffect(() => {
    setCarregando(true);
    if (user?.uid != null) {
      const uid = user?.uid;
      getLivrosUIDFirebase(uid, setListaObjetos);
    }
    setCarregando(false);
  }, [user]);

  return (
    <LivrosContext.Provider
      value={{
        alerta,
        setAlerta,
        listaObjetos,
        setListaObjetos,
        remover,
        objeto,
        setObjeto,
        editarObjeto,
        novoObjeto,
        acaoCadastrar,
        handleChange,
        abreDialogo,
        setAbreDialogo,
      }}
    >
      {children}
    </LivrosContext.Provider>
  );
}

export default LivrosProvider;
