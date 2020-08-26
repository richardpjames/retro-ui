import { LexoRank } from 'lexorank';
import useColumnsService from '../../../services/columnsService';

const useColumnsController = (data) => {
  const columnsService = useColumnsService();

  const addColumn = async (column) => {
    // Generate the rank based on the number of columns
    if (data.columns.length > 0) {
      const highestRank = data.columns[data.columns.length - 1].rank;
      const highestLexoRank = LexoRank.parse(highestRank);
      column.rank = highestLexoRank.genNext().toString();
    } else {
      column.rank = LexoRank.middle().toString();
    }
    // Get the new column from the service
    const newColumn = await columnsService.create(column, data.board.boardid);
    // Now add to the existing columns
    const _columns = [...data.columns];
    _columns.push(newColumn);
    data.setColumns(_columns);
  };

  const renameColumn = async (column) => {
    // Rename the column in the service
    columnsService.update(data.board.boardid, column);
    // Rename the column in the list
    const _columns = [...data.columns];
    const updatedColumn = _columns.find((c) => c.columnid === column.columnid);
    updatedColumn.title = column.title;
    data.setColumns(_columns);
  };

  const deleteColumn = async (column) => {
    // Remove the column from the service
    columnsService.remove(data.board.boardid, column.columnid);
    // Remove the column from the list
    const _columns = data.columns.filter((c) => c.columnid !== column.columnid);
    data.setColumns(_columns);
    // Remove any cards
    const _cards = data.cards.filter((c) => c.columnid !== column.columnid);
    data.setCards(_cards);
  };

  return { addColumn, renameColumn, deleteColumn };
};

export default useColumnsController;
