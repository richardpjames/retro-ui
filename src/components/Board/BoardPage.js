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
import { useHistory } from 'react-router-dom';

const BoardPage = (props) => {
  // For storing the board, and the controller
  const [board, setBoard] = useState({});
  const { updateBoard } = useBoardsController(board, setBoard);

  // For storing cards, and the controller
  const [cards, setCards] = useState([]);
  const {
    addCard,
    deleteCard,
    combineCards,
    separateCards,
    updateCard,
  } = useCardsController(board, cards, setCards);

  // For storing columns and the controller
  const [columns, setColumns] = useState([]);
  const { addColumn, renameColumn, deleteColumn } = useColumnsController(
    board,
    cards,
    setCards,
    columns,
    setColumns,
  );

  // For storing teams
  const [teams, setTeams] = useState([]);

  // For storing votes and the controller
  const [votes, setVotes] = useState([]);
  const [votesRemaining, setVotesRemaining] = useState(0);
  const { addVote, deleteVote } = useVotesController(board, votes, setVotes);

  // For storing the users profile (no controller required)
  const [profile, setProfile] = useState({});

  // For storing actions and the controller
  const [actions, setActions] = useState([]);
  const { addAction, deleteAction } = useActionsController(
    board,
    actions,
    setActions,
  );

  // After all data is set up, this is used to fetch data
  const [loading, setLoading] = useState(false);
  // Showing instructions on load of page
  const [showInstructions, setShowInstructions] = useState(false);
  const { fetchData } = useFetchData(
    props,
    setLoading,
    setActions,
    setBoard,
    setCards,
    setColumns,
    setProfile,
    setVotes,
    setTeams,
    setShowInstructions,
  );

  // Creation of columns
  const [createColumnModalVisible, setCreateColumnModalVisible] = useState(
    false,
  );

  // These items of state are required to drive the modal for merging and separating cards
  const [parentCard, setParentCard] = useState({});
  const [childCard, setChildCard] = useState({});
  const [mergeCardModalVisible, setMergeCardModalVisible] = useState(false);
  const [cardToSeparate, setCardToSeparate] = useState({});
  const [indexToSeparate, setIndexToSeparate] = useState(0);
  const [separateCardModalVisible, setSeparateCardModalVisible] = useState(
    false,
  );

  // For handling behaviour of a drag end
  const { handleDragEnd } = useDragDropController(
    board,
    cards,
    columns,
    setCards,
    setColumns,
    setParentCard,
    setChildCard,
    setMergeCardModalVisible,
  );

  // For setting up listeners
  const { joinBoard, setupListeners } = useListenersController(
    io,
    cards,
    votes,
    board,
    profile,
    columns,
    actions,
    setActions,
    setBoard,
    setCards,
    setColumns,
    setVotes,
    setVotesRemaining,
  );

  const history = useHistory();

  // For protecting the route
  useEffect(() => {
    // Store the current location so that other pages can return here
    if (props.isAuthenticated === false) {
      localStorage.setItem('returnUrl', props.location.pathname);
      history.push('/auth/login');
    }
  }, [props, history]);

  // This is the initial load of existing boards for the user
  useEffect(() => {
    // Fetch initial data
    fetchData(true);
    // Join the board socket io
    joinBoard(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set the page title
  useEffect(() => {
    document.title = `RetroSpectacle - ${board.name}`;
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', board.description);
  }, [board]);

  useEffect(() => {
    // Set up socket io listeners
    setupListeners();
  }, [setupListeners]);

  return (
    <div className="content mx-5 my-5">
      {(() => {
        if (loading) return <LoadingSpinner />;
      })()}

      {showInstructions && board.instructions && (
        <Modal
          title="Instructions"
          action="Okay"
          setVisible={setShowInstructions}
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
            combineCards(parentCard, childCard);
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
            separateCards(cardToSeparate, indexToSeparate);
          }}
          setVisible={setSeparateCardModalVisible}
          icon="fas fa-unlink"
        />
      )}

      <CreateColumnModal
        visible={createColumnModalVisible}
        setVisible={setCreateColumnModalVisible}
        addColumn={addColumn}
      />

      <BoardTitleBar
        board={board}
        teams={teams}
        updateBoard={updateBoard}
        profile={profile}
        votesRemaining={votesRemaining}
        dashboardPath={props.dashboardPath}
        setCreateColumnModalVisible={setCreateColumnModalVisible}
        setShowInstructions={setShowInstructions}
      />

      <Board
        board={board}
        profile={profile}
        columns={columns}
        cards={cards}
        votes={votes}
        actions={actions}
        addAction={addAction}
        handleDragEnd={handleDragEnd}
        deleteColumn={deleteColumn}
        addCard={addCard}
        updateCard={updateCard}
        deleteCard={deleteCard}
        addVote={addVote}
        deleteVote={deleteVote}
        votesRemaining={votesRemaining}
        setCreateColumnModalVisible={setCreateColumnModalVisible}
        renameColumn={renameColumn}
        deleteAction={deleteAction}
        setCardToSeparate={setCardToSeparate}
        setIndexToSeparate={setIndexToSeparate}
        setSeparateCardModalVisible={setSeparateCardModalVisible}
      />
    </div>
  );
};

export default BoardPage;
