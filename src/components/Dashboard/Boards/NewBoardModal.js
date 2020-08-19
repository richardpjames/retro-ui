import React, { useEffect, useState } from 'react';
import templateService from '../../../services/templatesService';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const NewBoardModal = (props) => {
  // Create three new state objects to hold the name, description and starter template for the board
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [boardTemplate, setBoardTemplate] = useState();
  const [boardPrivate, setBoardPrivate] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const [boardTeam, setBoardTeam] = useState('');
  const [templates, setTemplates] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [displayInstructions, setDisplayInstructions] = useState(true);

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    let newBoard = {
      name: boardName,
      description: boardDescription,
      templateId: boardTemplate,
      teamId: boardTeam,
      private: boardPrivate,
      showActions: showActions,
      showInstructions: displayInstructions,
    };
    // If the team Id is blank then remove
    if (newBoard.teamId === '') {
      delete newBoard.teamId;
    }
    props.addBoard(newBoard);
    setBoardName('');
    setBoardDescription('');
    setBoardTemplate('');
    setBoardTeam('');
    setBoardPrivate(false);
    setShowActions(true);
    setDisplayInstructions(true);
    props.setVisible(false);
  };

  const closeModal = () => {
    setBoardName('');
    setBoardDescription('');
    setBoardTemplate('');
    setBoardTeam('');
    setBoardPrivate(false);
    setShowActions(true);
    setDisplayInstructions(true);
    props.setVisible(false);
  };

  const checkVisible = () => {
    if (props.visible) {
      return 'modal is-active';
    } else {
      return 'modal';
    }
  };

  // This is the initial load of templates for the user
  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      let templateData = await templateService.getAll(token);

      // If there are templates returned then sort and set
      if (templateData) {
        templateData = templateData.sort((a, b) => {
          if (a.name > b.name) return 1;
          return -1;
        });
        setTemplates(templateData);
      }
    };
    try {
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  }, [getAccessTokenSilently]);

  // Check whether the user is allowed more than 5 boards
  const checkBoardRestriction = () => {
    if (props.profile && props.profile.plan && props.profile.plan !== 'free') {
      return false;
    }
    if (props.totalBoards >= 5) {
      return true;
    }
    return false;
  };

  if (checkBoardRestriction()) {
    return (
      <div className={checkVisible()} id="createBoardModal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title my-0">Create a New Board</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <p>
              You already have the maximum number of allowed boards on the free
              plan, please upgrade or delete some existing boards before
              creating more.
            </p>
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <Link to="/pricing">
                <button className="button is-primary mr-2">
                  <i className="fas fa-shopping-cart mr-3"></i>Upgrade
                </button>
              </Link>
              <button className="button" onClick={closeModal}>
                <i className="fas fa-ban mr-3"></i> Close
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }
  // This returns the markup
  return (
    <div className={checkVisible()} id="createBoardModal">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title my-0">Create a New Board</p>
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
              <label htmlFor="boardTemplate">Starting Template</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    id="boardTemplate"
                    name="boardTemplate"
                    required
                    onChange={(event) => {
                      setBoardTemplate(event.target.value);
                    }}
                    value={boardTemplate}
                  >
                    <option></option>
                    {templates.map((template) => (
                      <option key={template._id} value={template._id}>
                        {template.name} ({template.description})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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

            <div className="field">
              <div className="control">
                <div className="b-checkbox is-primary">
                  <input
                    id="displayInstructions"
                    name="displayInstructions"
                    className="styled mr-3"
                    type="checkbox"
                    checked={displayInstructions}
                    onChange={(event) =>
                      setDisplayInstructions(event.target.checked)
                    }
                  />
                  <label htmlFor="displayInstructions">
                    Show instructions when users load the board
                  </label>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button className="button is-primary">
                <i className="fas fa-plus mr-3"></i> Create
              </button>
              <button className="button" onClick={closeModal}>
                <i className="fas fa-ban mr-3"></i> Cancel
              </button>
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default NewBoardModal;
