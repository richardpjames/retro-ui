import React, {useEffect, useState} from "react";
import templateService from "../../services/templatesService";
import {useAuth0} from "@auth0/auth0-react";

const NewBoard = (props) => {
  // Create three new state objects to hold the name, description and starter template for the board
  const [boardName, updateBoardName] = useState('');
  const [boardDescription, updateBoardDescription] = useState('');
  const [boardTemplate, updateBoardTemplate] = useState('');
  const [templates, updateTemplates] = useState([]);
  const {getAccessTokenSilently} = useAuth0();

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addBoard({name: boardName, description: boardDescription, templateId: boardTemplate});
    updateBoardName('');
    updateBoardDescription('');
    updateBoardTemplate('');
  }

  // This is the initial load of templates for the user
  useEffect(() => {
    const fetchData = async () => {
      const token = await getAccessTokenSilently();
      const templateData = await templateService.getAll(token);
      updateTemplates(templateData);
    };
    fetchData();
  }, [getAccessTokenSilently]);

  // This returns the markup
  return (
    <form onSubmit={handleSubmit}>
      <div className="card my-3">
        <div className="card-content">

          <div className="field">
            <label htmlFor="boardName">Board Name</label>
            <input type="text" className="input" id="boardName"
                   placeholder="e.g. Sprint 20.01: A New Hope" value={boardName}
                   onChange={(event) => updateBoardName(event.target.value)}
                   required/>
          </div>

          <div className="field">
            <label htmlFor="boardDescription">Board Description</label>
            <input type="text" className="input" id="boardDescription"
                   placeholder="e.g. Our first retrospective as a new team" value={boardDescription}
                   onChange={(event) => updateBoardDescription(event.target.value)}
                   required/>
          </div>

          <div className="field">
            <label htmlFor="boardTemplate">Starting Template</label>
            <div className="ontrol">
              <div className="select is-fullwidth">
                <select id="boardTemplate" required
                        onChange={(event) => {
                          updateBoardTemplate(event.target.value)
                        }}
                        value={boardTemplate}>
                  <option></option>
                  {templates.map((template) => <option key={template.templateId}
                                                       value={template.templateId}>{template.name} ({template.description})</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="buttons">
            <button className="button is-primary">Create</button>
          </div>

        </div>
      </div>
    </form>
  );

}

export default NewBoard;
