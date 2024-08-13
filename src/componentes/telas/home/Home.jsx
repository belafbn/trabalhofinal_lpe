import React, { useContext, useMemo } from 'react';
import LivrosContext from '../../../contextos/LivrosContext';
import { MaterialReactTable } from 'material-react-table';
import Typography from '@mui/material/Typography';
import { getLivrosFirebase } from '../../../servicos/LivroService';

function Home() {
  const [livrosLista, setLivrosLista] = React.useState([]);
  console.log(livrosLista);

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

  React.useEffect(() => {
    (async () => {
      await getLivrosFirebase(setLivrosLista);
    })();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4">Livros</Typography>
      {livrosLista && livrosLista.length === 0 && (
        <Typography variant="h4">Nenhum livro encontrado</Typography>
      )}
      {livrosLista && livrosLista.length > 0 && (
        <MaterialReactTable
          enableGlobalFilter={true}
          showColumnFilters={true}
          columns={columns}
          data={livrosLista}
          enableColumnFilters={true}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              header: 'Ações',
              enableColumnFilter: false,
            },
          }}
          enableRowActions
        />
      )}
    </div>
  );
}

export default Home;
