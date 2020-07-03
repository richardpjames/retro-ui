import React, {useState} from 'react';

const DeleteBoardModal = (props) => {

  const [confirm, updateConfirm] = useState('');
  const [buttonDisabled, updateButtonDisabled] = useState(true);

  const closeModal = () => {
    const modal = document.getElementById(`deleteBoardModal-${props.board.boardId}`);
    modal.classList.toggle("is-active");
  }

  const checkInput = (event) => {
    updateConfirm(event.target.value);
    if (event.target.value === 'delete') {
      updateButtonDisabled(false);
    } else {
      updateButtonDisabled(true);
    }
  }

  return (<div className="modal" id={`deleteBoardModal-${props.board.boardId}`}>
    <div className="modal-background"></div>
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{props.board.name}</p>
        <button className="delete" aria-label="close" onClick={closeModal}></button>
      </header>
      <section className="modal-card-body">
        <p className="my-3">If you are sure you want to delete this board, please
          enter the word "delete" into the text box and press the delete button.</p>
        <p className="has-text-danger mb-3">There is no way to undo this later.</p>
        <form>
          <div className="field">
            <input type="text" className="input is-danger"
                   placeholder="delete" value={confirm}
                   onChange={checkInput}
                   required/>
          </div>
        </form>
      </section>
      <footer className="modal-card-foot">
        <button disabled={buttonDisabled} className="button is-danger"
                onClick={() => props.removeBoard(props.board.boardId)}>Delete
        </button>
        <button className="button" onClick={closeModal}>Cancel</button>
      </footer>
    </div>
  </div>);
}

export default DeleteBoardModal;
