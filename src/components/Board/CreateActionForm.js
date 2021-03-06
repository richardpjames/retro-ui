import React, { useState, useEffect } from 'react';
import bulmaCalendar from 'bulma-calendar';
import moment from 'moment';
import Icon from '../Common/Icon';

const CreateActionForm = (props) => {
  const [actionText, setActionText] = useState('');
  const [actionOwner, setActionOwner] = useState('');
  const [actionDue, setActionDue] = useState(
    new Date(moment(Date.now()).format('YYYY-MM-DD')),
  );
  const [lines, setLines] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.controllers.actionsController.addAction({
      text: actionText,
      ownerid: actionOwner,
      due: actionDue,
      status: 'todo',
      updates: [],
    });
    document.getElementById('details').focus();
    setActionText('');
    setActionOwner('');
  };

  useEffect(() => {
    const _calendar = bulmaCalendar.attach('[type="date"]', {
      dateFormat: 'DD/MM/YYYY',
      type: 'date',
      startDate: new Date(moment(Date.now()).format('YYYY-MM-DD')),
      showHeader: false,
      showFooter: false,
      showClearButton: false,
    });
    _calendar[0].on('select', (date) => {
      setActionDue(moment(date.data.date.start).format('YYYY-MM-DD'));
    });
  }, [setActionDue]);

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="field">
          <label htmlFor="details" className="is-size-6-7">
            Action Details
          </label>
          <textarea
            className="is-fullwidth has-fixed-size textarea is-size-6-7 mb-1"
            rows={lines}
            placeholder="Action details..."
            name="details"
            id="details"
            value={actionText}
            onChange={(event) => setActionText(event.target.value)}
            onFocus={() => setLines(4)}
            onBlur={() => actionText === '' && setLines(1)}
            required
          ></textarea>
        </div>

        <div className="field">
          <label htmlFor="owner">Owner</label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                id="owner"
                name="owner"
                required
                onChange={(event) => {
                  setActionOwner(event.target.value);
                }}
                value={actionOwner}
              >
                <option></option>
                {props.data.boardUsers.map((user) => (
                  <option key={user.userid} value={user.userid}>
                    {user.nickname} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="date" className="is-size-6-7">
            Due Date
          </label>
          <div className="bg-white rounded">
            <input
              type="date"
              className="input is-fullwidth is-size-6-7"
              name="due"
              id="due"
              onChange={() => {}}
              required
            />
          </div>
        </div>

        <button className="button is-primary is-fullwidth my-1 is-size-6-7">
          <Icon className="fas fa-plus" padding />
          Add Action
        </button>
      </form>
    </>
  );
};

export default CreateActionForm;
