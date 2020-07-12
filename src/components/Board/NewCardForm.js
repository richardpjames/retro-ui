import React, { useState } from 'react';

const NewCardForm = (props) => {
  const [card, setCard] = useState({ text: '', columnId: props.column._id });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addCard(card);
    setCard({ text: '', columnId: props.column._id });
  };

  const onChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="is-fullwidth has-fixed-size textarea"
        rows="2"
        placeholder="Card text..."
        name="text"
        value={card.text}
        onChange={onChange}
        required
      ></textarea>
      <button className="button is-primary is-fullwidth my-1">
        <i className="fas fa-plus mr-3"></i>
        Add Card
      </button>
    </form>
  );
};

export default NewCardForm;
