import React, { useEffect, useState } from 'react';
import templateService from '../../../services/templatesService';
import { toast } from 'react-toastify';

const NewBoardModal = (props) => {
  // Create three new state objects to hold the name, description and starter template for the board
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [boardTemplate, setBoardTemplate] = useState();
  const [boardPrivate, setBoardPrivate] = useState(false);
  const [showactions, setShowactions] = useState(true);
  const [boardTeam, setBoardTeam] = useState('');
  const [templates, setTemplates] = useState([]);
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
      showactions: showactions,
      showinstructions: displayInstructions,
    };
    // If the team Id is blank then remove
    if (newBoard.teamid === '') {
      delete newBoard.teamid;
    }
    props.addBoard(newBoard);
    setBoardName('');
    setBoardDescription('');
    setBoardTemplate('');
    setBoardTeam('');
    setBoardPrivate(false);
    setShowactions(true);
    setDisplayInstructions(true);
    props.setVisible(false);
  };

  const closeModal = () => {
    setBoardName('');
    setBoardDescription('');
    setBoardTemplate('');
    setBoardTeam('');
    setBoardPrivate(false);
    setShowactions(true);
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
      let templateData = await templateService.getAll();

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
  }, []);

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
                      <option
                        key={template.templateid}
                        value={template.templateid}
                      >
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
                      <option key={team.teamid} value={team.teamid}>
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
                    id="showactionsCheckbox"
                    name="showactionsCheckbox"
                    className="styled mr-3"
                    type="checkbox"
                    checked={showactions}
                    onChange={(event) => setShowactions(event.target.checked)}
                  />
                  <label htmlFor="showactionsCheckbox">
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
