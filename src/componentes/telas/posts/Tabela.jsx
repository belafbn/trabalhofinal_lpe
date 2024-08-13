import { useContext, useMemo } from 'react';
import LivrosContext from '../../../contextos/LivrosContext';
import Alerta from '../../comuns/Alerta';
import { MaterialReactTable } from 'material-react-table';
import { MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';

function Tabela() {
  const { alerta, listaObjetos, remover, editarObjeto, novoObjeto } =
    useContext(LivrosContext);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'titulo',
        header: 'Título',
      },
      {
        accessorKey: 'autor',
        header: 'Autor',
      },
      {
        accessorKey: 'editora',
        header: 'Editora',
      },
      {
        accessorKey: 'ano_publicacao',
        header: 'Ano Lançamento',
      },
      {
        accessorKey: 'comentario',
        header: 'Comentario',
      },
      {
        accessorKey: 'usuario',
        header: 'Usuário',
      },
      {
        accessorKey: 'uid',
        header: 'UID',
      },
    ],
    []
  );

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Livros</Typography>
      <Alerta alerta={alerta} />
      <Button variant="outlined" onClick={() => novoObjeto()}>
        <AddIcon /> Novo
      </Button>
      {listaObjetos.length === 0 && (
        <Typography variant="h4">Nenhum livro encontrado</Typography>
      )}
      {listaObjetos.length > 0 && (
        <MaterialReactTable
          enableGlobalFilter={true}
          showColumnFilters={true}
          columns={columns}
          data={listaObjetos}
          enableColumnFilters={true}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Ações',
              enableColumnFilter: false,
            },
          }}
          enableRowActions
          renderRowActionMenuItems={({ row }) => (
            <div>
              <MenuItem
                key="editar"
                onClick={() => editarObjeto(row.original)}
                title="Editar"
              >
                <EditIcon />
              </MenuItem>
              <MenuItem
                key="remover"
                onClick={() => remover(row.original)}
                title="Apagar"
              >
                <DeleteIcon />
              </MenuItem>
            </div>
          )}
        />
      )}
    </div>
  );
}

export default Tabela;
