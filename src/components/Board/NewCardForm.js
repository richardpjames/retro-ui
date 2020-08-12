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

  const onKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="text" className="is-size-6-7">
          New Card
        </label>
        <textarea
          className="is-fullwidth has-fixed-size textarea is-size-6-7"
          rows="2"
          placeholder="Card text..."
          name="text"
          id="text"
          value={card.text}
          onChange={onChange}
          onKeyPress={onKeyPress}
          required
        ></textarea>
      </div>
      <button className="button is-primary is-fullwidth my-1 is-size-6-7">
        <i className="fas fa-plus mr-3"></i>
        Add Card
      </button>
    </form>
  );
};

export default NewCardForm;
