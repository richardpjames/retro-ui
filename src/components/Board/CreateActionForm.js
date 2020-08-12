import React, { useState, useEffect } from 'react';
import bulmaCalendar from 'bulma-calendar';
import moment from 'moment';

const CreateActionForm = (props) => {
  const [actionText, setActionText] = useState('');
  const [actionOwner, setActionOwner] = useState('');
  const [actionDue, setActionDue] = useState(
    new Date(moment(Date.now()).format('YYYY-MM-DD')),
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addAction({
      text: actionText,
      owner: actionOwner,
      due: actionDue,
    });
    setActionText('');
    setActionOwner('');
  };

  useEffect(() => {
    const _calendar = bulmaCalendar.attach('[type="date"]', {
      dateFormat: 'DD/MM/YYYY',
      type: 'date',
      showHeader: false,
      showFooter: false,
      showClearButton: false,
    });
    _calendar[0].on('select', (date) => {
      setActionDue(date.data.date.start);
    });
  }, [setActionDue]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <textarea
          className="is-fullwidth has-fixed-size textarea is-size-6-7 mb-1"
          rows="2"
          placeholder="Action details"
          name="text"
          value={actionText}
          onChange={(event) => setActionText(event.target.value)}
          required
        ></textarea>
        <input
          type="text"
          className="input is-fullwidth is-size-6-7 mb-1"
          name="owner"
          placeholder="Action owner"
          value={actionOwner}
          onChange={(event) => setActionOwner(event.target.value)}
          required
        />
        <input
          type="date"
          className="input is-fullwidth is-size-6-7"
          name="due"
          value={moment(actionDue).format('DD/MM/YYYY')}
          onChange={() => {}}
          required
        />
        <button className="button is-primary is-fullwidth my-1 is-size-6-7">
          <i className="fas fa-plus mr-3"></i>
          Add Action
        </button>
      </form>
    </>
  );
};

export default CreateActionForm;
