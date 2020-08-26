/* eslint array-callback-return: 0 */
import React, { useEffect, useState } from 'react';

import Board from './Board';
import Modal from '../Common/Modal';
import LoadingSpinner from '../Common/LoadingSpinner';
import CreateColumnModal from './CreateColumnModal';
import BoardTitleBar from './BoardTitleBar';

import useListenersController from './Controllers/useListenersController';
import useBoardsController from './Controllers/useBoardsController';
import useCardsController from './Controllers/useCardsController';
import useColumnsController from './Controllers/useColumnsController';
import useVotesController from './Controllers/useVotesController';
import useActionsController from './Controllers/useActionsController';
import useFetchData from './Controllers/useFetchData';
import useDragDropController from './Controllers/useDragDropController';

import io from '../../services/socket';
import useModalsController from './Controllers/useModalsController';

const BoardPage = (props) => {
  // Main data and setters
  const [actions, setActions] = useState([]);
  const [board, setBoard] = useState({});
  const [boardUsers, setBoardUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [showinstructions, setShowinstructions] = useState(false);
  const [teams, setTeams] = useState([]);
  const [votes, setVotes] = useState([]);
  const [votesRemaining, setVotesRemaining] = useState(0);

  // Hold all data in a single object for easier passing
  const data = {
    actions,
    setActions,
    board,
    setBoard,
    boardUsers,
    setBoardUsers,
    cards,
    setCards,
    columns,
    setColumns,
    loading,
    setLoading,
    profile,
    setProfile,
    showinstructions,
    setShowinstructions,
    teams,
    setTeams,
    votes,
    setVotes,
    votesRemaining,
    setVotesRemaining,
  };

  // Needed primarily for modals to work correctly
  const [parentCard, setParentCard] = useState({});
  const [childCard, setChildCard] = useState({});
  const [mergeCardModalVisible, setMergeCardModalVisible] = useState(false);
  const [createColumnModalVisible, setCreateColumnModalVisible] = useState(
    false,
  );
  const [parentCardToSeparate, setParentCardToSeparate] = useState({});
  const [childCardToSeparate, setChildCardToSeparate] = useState(0);
  const [separateCardModalVisible, setSeparateCardModalVisible] = useState(
    false,
  );

  // Add to a single object for easy passing
  const modals = {
    parentCard,
    setParentCard,
    childCard,
    setChildCard,
    mergeCardModalVisible,
    setMergeCardModalVisible,
    createColumnModalVisible,
    setCreateColumnModalVisible,
    parentCardToSeparate,
    setParentCardToSeparate,
    childCardToSeparate,
    setChildCardToSeparate,
    separateCardModalVisible,
    setSeparateCardModalVisible,
  };

  // Set up controllers
  const dataController = useFetchData(props, data);
  const boardsController = useBoardsController(data);
  const cardsController = useCardsController(data);
  const columnsController = useColumnsController(data);
  const votesController = useVotesController(data);
  const actionsController = useActionsController(data);
  const listenerController = useListenersController(io, data);
  const dragDropController = useDragDropController(
    data,
    setParentCard,
    setChildCard,
    setMergeCardModalVisible,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSettings, setModalSettings] = useState({});
  const modalsController = useModalsController(
    setModalSettings,
    setModalVisible,
  );

  // Hold all of the controllers in a single object for easy passing
  const controllers = {
    dataController,
    boardsController,
    cardsController,
    columnsController,
    votesController,
    actionsController,
    listenerController,
    dragDropController,
    modalsController,
  };

  // This is the initial load
  useEffect(() => {
    dataController.fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // Set the page title and listeners once the board is set
  useEffect(() => {
    // Join the board socket io
    listenerController.joinBoard(board);
    document.title = `RetroSpectacle - ${board.name}`;
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', board.description);
    listenerController.setupListeners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  return (
    <>
      {props.isAuthenticated && (
        <div className="content mx-5 my-5">
          {(() => {
            if (loading) return <LoadingSpinner />;
          })()}

          {modalVisible && (
            <Modal
              title={modalSettings.title}
              action={modalSettings.action}
              message={modalSettings.message}
              markdown={modalSettings.markdown}
              setVisible={setModalVisible}
              function={modalSettings.function}
              icon={modalSettings.icon}
              hideCancel={modalSettings.hideCancel}
              danger={modalSettings.danger}
            />
          )}

          {showinstructions && board.instructions && (
            <Modal
              title="Instructions"
              action="Okay"
              setVisible={setShowinstructions}
              markdown={board.instructions}
              function={() => {}}
              icon="fas fa-check"
              hideCancel
            />
          )}

          {mergeCardModalVisible && (
            <Modal
              title="Merge Cards"
              message="Are you sure that you want to merge these cards?"
              action="Merge"
              function={() => {
                cardsController.combineCards(parentCard, childCard);
              }}
              setVisible={setMergeCardModalVisible}
              icon="fas fa-link"
            />
          )}

          {separateCardModalVisible && (
            <Modal
              title="Separate Cards"
              message="Are you sure that you want to separate these cards?"
              action="Separate"
              function={() => {
                cardsController.separateCards(
                  parentCardToSeparate,
                  childCardToSeparate,
                );
              }}
              setVisible={setSeparateCardModalVisible}
              icon="fas fa-unlink"
            />
          )}
          <CreateColumnModal
            visible={createColumnModalVisible}
            setVisible={setCreateColumnModalVisible}
            controllers={controllers}
          />
          <BoardTitleBar
            data={data}
            controllers={controllers}
            modals={modals}
          />
          <Board data={data} controllers={controllers} modals={modals} />
        </div>
      )}
    </>
  );
};

export default BoardPage;
