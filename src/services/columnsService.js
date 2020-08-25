import useAPI from './useAPI';

const useColumnsService = () => {
  const api = useAPI();
  const getAll = async (boardid) => {
    return api.get(`/api/boards/${boardid}/columns`);
  };

  const create = async (column, boardid) => {
    return api.create(`/api/boards/${boardid}/columns`, column);
  };

  const update = async (boardid, column) => {
    return api.update(
      `/api/boards/${boardid}/columns/${column.columnid}`,
      column,
    );
  };

  const remove = async (boardid, columnid) => {
    return api.remove(`/api/boards/${boardid}/columns/${columnid}`);
  };

  return { getAll, create, remove, update };
};

export default useColumnsService;
