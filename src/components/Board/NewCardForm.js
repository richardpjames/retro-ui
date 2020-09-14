import React, { useState } from 'react';
import { Transition } from '@tailwindui/react';
import { CirclePicker } from 'react-color';

const NewCardForm = (props) => {
  // The list of colours for the colour picker
  const colours = [
    '#ffffff',
    '#444444',
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#607d8b',
    '#795548',
  ];

  const [card, setCard] = useState({
    text: '',
    columnid: props.column.columnid,
    colour: props.column.defaultcolour || '#ffffff',
  });
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.controllers.cardsController.addCard(card);
    setCard({
      text: '',
      columnid: props.column.columnid,
      colour: props.column.defaultcolour || '#ffffff',
    });
    setShow(false);
  };

  const handleColourChange = (colour) => {
    setCard({ ...card, colour: colour.hex });
  };

  const onChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const handleShow = () => {
    setShow(!show);
    setCard({
      text: '',
      columnid: props.column.columnid,
      colour: props.column.defaultcolour || '#ffffff',
    });
  };

  return (
    <>
      <button
        className="bg-gray-500 rounded w-full text-white text-center py-1 border-b-2 border-gray-800 mb-2 hover:text-white hover:bg-gray-600"
        onClick={handleShow}
      >
        {!show ? (
          <span>
            <i className="fas fa-plus mr-3"></i>New Card
          </span>
        ) : (
          <span>
            <i className="fas fa-ban mr-3"></i>Cancel
          </span>
        )}
      </button>
      <Transition
        show={show}
        enter="transition ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div
          className="rounded bg-white shadow-md p-3"
          style={{ backgroundColor: card.colour }}
        >
          <form onSubmit={handleSubmit}>
            <div className="field">
              <textarea
                className="is-fullwidth has-fixed-size textarea is-size-6-7"
                rows={3}
                placeholder="Card text..."
                name="text"
                id="text"
                value={card.text}
                onChange={onChange}
                required
              ></textarea>
            </div>
            <div className="bg-gray-200 bg-opacity-50 rounded px-3 py-3 flex justify-center align-middle mb-2">
              <CirclePicker
                className="justify-center"
                onChangeComplete={handleColourChange}
                width="100%"
                circleSize={29}
                circleSpacing={11}
                colors={colours.filter((c) => c.toLowerCase() !== card.colour)}
              />
            </div>
            <button
              type="submit"
              className="bg-teal-500 rounded w-full text-white text-center py-1 border-b-2 border-teal-800 hover:text-white hover:bg-teal-600"
            >
              <i className="fas fa-plus mr-3"></i>
              Add Card
            </button>
          </form>
        </div>
      </Transition>
    </>
  );
};

export default NewCardForm;
