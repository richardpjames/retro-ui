import React, { useEffect, useState } from 'react';
import templateService from '../../../services/templatesService';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const NewBoardModal = (props) => {
  // Create three new state objects to hold the name, description and starter template for the board
  const [boardName, updateBoardName] = useState('');
  const [boardDescription, updateBoardDescription] = useState('');
  const [boardTemplate, updateBoardTemplate] = useState('');
  const [templates, updateTemplates] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addBoard({
      name: boardName,
      description: boardDescription,
      templateId: boardTemplate,
    });
    updateBoardName('');
    updateBoardDescription('');
    updateBoardTemplate('');
    props.setVisible(false);
  };

  const closeModal = () => {
    updateBoardName('');
    updateBoardDescription('');
    updateBoardTemplate('');
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
      const templateData = await templateService.getAll(token);
      if (templateData) updateTemplates(templateData);
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
    if (props.boards.length >= 5) {
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
                placeholder="e.g. Sprint 20.01: A New Hope"
                value={boardName}
                onChange={(event) => updateBoardName(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="boardDescription">Board Description</label>
              <input
                type="text"
                className="input"
                id="boardDescription"
                placeholder="e.g. Our first retrospective as a new team"
                value={boardDescription}
                onChange={(event) => updateBoardDescription(event.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="boardTemplate">Starting Template</label>
              <div className="ontrol">
                <div className="select is-fullwidth">
                  <select
                    id="boardTemplate"
                    required
                    onChange={(event) => {
                      updateBoardTemplate(event.target.value);
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
