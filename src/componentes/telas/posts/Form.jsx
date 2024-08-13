import { useContext } from 'react';
import Alerta from '../../comuns/Alerta';
import LivrosContext from '../../../contextos/LivrosContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import CampoSelect from '../../comuns/CampoSelect';
import CampoEntradaTexto from '../../comuns/CampoEntradaTexto';
import Dialogo from '../../comuns/Dialogo';
import { MenuItem } from '@mui/material';

function Form() {
  const {
    objeto,
    handleChange,
    acaoCadastrar,
    alerta,
    abreDialogo,
    setAbreDialogo,
  } = useContext(LivrosContext);

  return (
    <>
      <Dialogo
        id="modalEdicao"
        titulo="Organização"
        open={abreDialogo}
        setOpen={setAbreDialogo}
        acaoCadastrar={acaoCadastrar}
        idform="formulario"
        maxWidth="sm"
      >
        <Alerta alerta={alerta} />
        <CampoEntrada
          id="txtID"
          label="ID"
          tipo="text"
          name="id"
          value={objeto.id}
          onchange={handleChange}
          requerido={false}
          readonly={true}
        />

        <CampoEntrada
          id="txtTitulo"
          label="Título"
          tipo="text"
          name="titulo"
          value={objeto.titulo}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={50}
          msgvalido="Titulo OK"
          msginvalido="Informe o título"
        />

        <CampoEntrada
          id="txtAutor"
          label="Autor"
          tipo="text"
          name="autor"
          value={objeto.autor}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={50}
          msgvalido="Autor OK"
          msginvalido="Informe o autor"
        />

        <CampoEntrada
          id="txtEditora"
          label="Editora"
          tipo="text"
          name="editora"
          value={objeto.editora}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={50}
          msgvalido="Editora OK"
          msginvalido="Informe o editora"
        />

        <CampoEntrada
          id="txtAno"
          label="Ano publicação"
          tipo="text"
          name="ano_publicacao"
          value={objeto.ano_publicacao}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={4}
          msgvalido="Ano de Lançamento OK"
          msginvalido="Informe o ano de lançamento"
        />

        <CampoEntradaTexto
          id="txtComentario"
          label="Comentario"
          rows={5}
          tipo="text"
          name="comentario"
          value={objeto.comentario}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={100}
          msgvalido="Comentário OK"
          msginvalido="Informe o comentario"
        />
      </Dialogo>
    </>
  );
}

export default Form;
