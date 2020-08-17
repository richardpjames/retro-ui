import React, { useState } from 'react';
import Icon from '../Common/Icon';

const BoardSettingsModal = (props) => {
  const [boardName, setBoardName] = useState(props.board.name);
  const [boardDescription, setBoardDescription] = useState(
    props.board.description,
  );
  const [boardPrivate, setBoardPrivate] = useState(props.board.private);
  const [boardTeam, setBoardTeam] = useState(props.board.teamId);
  const [showActions, setShowActions] = useState(props.board.showActions);
  const [instructions, setInstructions] = useState(props.board.instructions);

  // Used to close the modal from the cancel or cross button
  const closeModal = () => {
    setBoardName(props.board.name);
    setBoardDescription(props.board.description);
    setBoardPrivate(props.board.private);
    setBoardTeam(props.board.teamId);
    setShowActions(props.board.showActions);
    setInstructions(props.board.instructions);
    props.setVisible(false);
    document.activeElement.blur();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateBoard({
      ...props.board,
      name: boardName,
      description: boardDescription,
      private: boardPrivate,
      teamId: boardTeam,
      showActions: showActions,
      instructions: instructions,
    });
    props.setVisible(false);
    document.activeElement.blur();
  };

  return (
    <div className="modal is-active" id="modal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title my-0">Board Settings</p>
          <button
            className="delete"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="modal-card-body">
            <div className="field">
              <label htmlFor="boardName">Board Name</label>
              <input
                type="text"
                className="input"
                id="boardName"
                name="boardName"
                placeholder="e.g. Sprint 20.01: A New Hope"
                value={boardName}
                onChange={(event) => setBoardName(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="boardDescription">Board Description</label>
              <input
                type="text"
                className="input"
                id="boardDescription"
                name="boardDescription"
                placeholder="e.g. Our first retrospective as a new team"
                value={boardDescription}
                onChange={(event) => setBoardDescription(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="instructions">Instructions (Markdown)</label>
              <textarea
                className="is-fullwidth has-fixed-size textarea"
                rows="5"
                placeholder="Instructions..."
                name="instructions"
                id="instructions"
                value={instructions}
                onChange={(event) => {
                  setInstructions(event.target.value);
                }}
              ></textarea>
            </div>

            <div className="field">
              <label htmlFor="boardTeam">Team</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    id="boardTeam"
                    name="boardTeam"
                    onChange={(event) => {
                      if (event.target.value !== '') {
                        setBoardTeam(event.target.value);
                      } else {
                        setBoardTeam();
                      }
                    }}
                    value={boardTeam}
                  >
                    <option></option>
                    {props.teams.map((team) => (
                      <option key={team._id} value={team._id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <div className="b-checkbox is-primary">
                  <input
                    id="privateCheckbox"
                    name="privateCheckbox"
                    className="styled mr-3"
                    type="checkbox"
                    checked={boardPrivate}
                    onChange={(event) => setBoardPrivate(event.target.checked)}
                  />
                  <label htmlFor="privateCheckbox">
                    Private (Only members of the team can access this board)
                  </label>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <div className="b-checkbox is-primary">
                  <input
                    id="showActionsCheckbox"
                    name="showActionsCheckbox"
                    className="styled mr-3"
                    type="checkbox"
                    checked={showActions}
                    onChange={(event) => setShowActions(event.target.checked)}
                  />
                  <label htmlFor="showActionsCheckbox">
                    Show the actions column
                  </label>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary">
              <Icon class="fas fa-save" padding /> Save
            </button>
            <button className="button" onClick={closeModal}>
              <i className="fas fa-ban mr-3"></i> Cancel
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default BoardSettingsModal;
