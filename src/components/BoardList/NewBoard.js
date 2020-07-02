import React, {useEffect, useState} from "react";
import axios from "axios";
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
    // Get the access token required to call the API
    getAccessTokenSilently()
      .then((token) => {
        // Add that token to the authorization header as a bearer token
        const config = {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        };
        // This environment variable holds the beginning of the API url, config adds the header
        axios.get(`${process.env.REACT_APP_API_URL}/api/templates`, config)
          // Overwrite the templates object with the results
          .then((response) => {
            updateTemplates(response.data);
          })
          // Log any errors to the console TODO: Improve error handling
          .catch((error) => console.log(error))
      })
      // Log any errors to the console TODO: Improve error handling
      .catch((error) => console.log(error))
  }, [getAccessTokenSilently]);

  // This returns the markup
  return (
    <form onSubmit={handleSubmit}>
      <div className="card my-3 p-2 shadow-sm">
        <div className="card-body">

          <div className="form-group">
            <label htmlFor="boardName">Board Name</label>
            <input type="text" className="form-control" id="boardName"
                   placeholder="e.g. Sprint 20.01: A New Hope" value={boardName}
                   onChange={(event) => updateBoardName(event.target.value)}
                   required/>
          </div>

          <div className="form-group">
            <label htmlFor="boardDescription">Board Description</label>
            <input type="text" className="form-control" id="boardDescription"
                   placeholder="e.g. Our first retrospective as a new team" value={boardDescription}
                   onChange={(event) => updateBoardDescription(event.target.value)}
                   required/>
          </div>

          <div className="form-group">
            <label htmlFor="boardTemplate">Starting Template</label>
            <select className="form-control" id="boardTemplate" required
                    onChange={(event) => {
                      updateBoardTemplate(event.target.value)
                    }}
            value={boardTemplate}>
              <option></option>
              {templates.map((template) => <option value={template.templateId}>{template.name} ({template.description})</option>)}
            </select>
          </div>

          <div>
            <button className="btn btn-primary align-middle">Create</button>
          </div>

        </div>
      </div>
    </form>
  );

}

export default NewBoard;
