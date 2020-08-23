import columnsService from '../../../services/columnsService';
import { LexoRank } from 'lexorank';

const useColumnsController = (board, cards, setCards, columns, setColumns) => {
  const addColumn = async (column) => {
    // Generate the rank based on the number of columns
    if (columns.length > 0) {
      const highestRank = columns[columns.length - 1].rank;
      const highestLexoRank = LexoRank.parse(highestRank);
      column.rank = highestLexoRank.genNext().toString();
    } else {
      column.rank = LexoRank.middle().toString();
    }
    // Get the new column from the service
    const newColumn = await columnsService.create(column, board.boardid);
    // Now add to the existing columns
    const _columns = [...columns];
    _columns.push(newColumn);
    setColumns(_columns);
  };

  const renameColumn = async (column) => {
    // Rename the column in the service
    columnsService.update(board.boardid, column);
    // Rename the column in the list
    const _columns = [...columns];
    const updatedColumn = _columns.find((c) => c.columnid === column.columnid);
    updatedColumn.title = column.title;
    setColumns(_columns);
  };

  const deleteColumn = async (column) => {
    // Remove the column from the service
    columnsService.remove(board.boardid, column.columnid);
    // Remove the column from the list
    const _columns = columns.filter((c) => c.columnid !== column.columnid);
    setColumns(_columns);
    // Remove any cards
    const _cards = cards.filter((c) => c.columnid !== column.columnid);
    setCards(_cards);
  };

  return { addColumn, renameColumn, deleteColumn };
};

export default useColumnsController;
