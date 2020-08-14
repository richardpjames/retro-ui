import React, { useState } from 'react';

const NewCardForm = (props) => {
  const [card, setCard] = useState({
    text: '',
    columnId: props.column._id,
    colour: '#ffffff',
    combinedCards: [],
  });
  const [lines, setLines] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLines(1);
    props.addCard(card);
    setCard({
      text: '',
      columnId: props.column._id,
      colour: '#ffffff',
      combinedCards: [],
    });
  };

  const onChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const onKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSubmit(event);
    }
    setLines(4);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="text" className="is-size-6-7">
          New Card
        </label>
        <textarea
          className="is-fullwidth has-fixed-size textarea is-size-6-7"
          rows={lines}
          placeholder="Card text..."
          name="text"
          id="text"
          value={card.text}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onFocus={() => setLines(4)}
          onBlur={() => card.text === '' && setLines(1)}
          required
        ></textarea>
      </div>
      {lines > 1 && (
        <button className="button is-primary is-fullwidth my-1 is-size-6-7">
          <i className="fas fa-plus mr-3"></i>
          Add Card
        </button>
      )}
      <hr className="mt-0 mb-1" />
    </form>
  );
};

export default NewCardForm;
