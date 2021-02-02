import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const updateBoardData = (boardData, setBoardData) => ({
  addCard(card) {
    const changedBoardData = { ...boardData };
    const { columns } = changedBoardData;

    const column = columns.find(({ _id: elemId }) => elemId === card.columnId);
    column.cards.push(card);

    setBoardData(changedBoardData);
  },
  updateCard(card) {
    const changedBoardData = { ...boardData };
    const { columns } = changedBoardData;
    const { _id: cardId } = card;

    const column = columns.find(({ _id: elemId }) => elemId === card.columnId);

    const { cards } = column;
    const cardIndex = cards.findIndex(({ _id: elemId }) => elemId === cardId);

    cards[cardIndex] = card;
    setBoardData(changedBoardData);
  },
  deleteCard(card) {
    const changedBoardData = { ...boardData };
    const { columns } = changedBoardData;
    const { _id: cardId } = card;

    const column = columns.find(({ _id: elemId }) => elemId === card.columnId);
    const { cards } = column;

    const cardIndex = cards.findIndex(({ _id: elemId }) => elemId === cardId);
    cards.splice(cardIndex, 1);

    setBoardData(changedBoardData);
  },
  addColumn(column) {
    const changedBoardData = { ...boardData };
    changedBoardData.columns.push(column);
    setBoardData(changedBoardData);
  },
  updateColumn(column) {
    const changedBoardData = { ...boardData };
    const { columns } = changedBoardData;
    const { _id: columnId } = column;

    const columnIndex = columns.findIndex(({ _id: elemId }) => elemId === columnId);
    const previouseValue = columns[columnIndex];
    columns[columnIndex] = { ...previouseValue, ...column };

    setBoardData(changedBoardData);
  },
  updateColumns(columnsData) {
    const changedBoardData = { ...boardData };
    changedBoardData.columns = columnsData;
    setBoardData(changedBoardData);
  },
  deleteColumn(columnId) {
    const changedBoardData = { ...boardData };
    const { columns } = changedBoardData;

    const columnIndex = columns.findIndex(({ _id: elemId }) => elemId === columnId);
    columns.splice(columnIndex, 1);

    setBoardData(changedBoardData);
  },
});

const BoardDataContext = createContext();

const BoardDataContextProvider = ({ boardData, setBoardData, children }) => (
  <BoardDataContext.Provider
    value={{ boardData, updateBoardData: updateBoardData(boardData, setBoardData) }}
  >
    {children}
  </BoardDataContext.Provider>
);

BoardDataContextProvider.propTypes = {
  boardData: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        boardId: PropTypes.string,
        name: PropTypes.string,
        _id: PropTypes.string,
        cards: PropTypes.arrayOf(
          PropTypes.objectOf(PropTypes.string),
        ),
      }),
    ),
    users: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.string),
    ),
  }),
  setBoardData: PropTypes.func,
  children: PropTypes.node,
};

BoardDataContextProvider.defaultProps = {
  boardData: {},
  setBoardData: () => {},
  children: {},
};

export default BoardDataContextProvider;
export { BoardDataContext };
