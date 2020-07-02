import React, {useState} from "react";

const NewBoard = (props) => {
  // Create two new state objects to hold the name and description for the board
  const [boardName, updateBoardName] = useState('');
  const [boardDescription, updateBoardDescription] = useState('');

  // When the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addBoard({name: boardName, description: boardDescription});
    updateBoardName('');
    updateBoardDescription('');
  }

  // This returns the markup
  return (
    <form onSubmit={handleSubmit}>
      <div className="card my-3 p-2 shadow-sm">
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <div className="form-group">
                <label htmlFor="boardName">Board Name</label>
                <input type="text" className="form-control" id="boardName"
                       placeholder="Board Name" value={boardName}
                       onChange={(event) => updateBoardName(event.target.value)}
                       required/>
              </div>
              <div className="form-group">
                <label htmlFor="boardDescription">Board Name</label>
                <input type="text" className="form-control" id="boardDescription"
                       placeholder="Board Description" value={boardDescription}
                       onChange={(event) => updateBoardDescription(event.target.value)}
                       required/>
              </div>
            </div>
            <div className="col-4 align-middle text-right">
              <button className="btn btn-primary align-middle">Create</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );

}

export default NewBoard;
