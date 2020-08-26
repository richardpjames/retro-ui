import React from 'react';

const BoardUsers = (props) => {
  return (
    <div className="columns">
      {props.boardUsers.map((u) => (
        <div
          className="column is-narrow mx-1 px-0 is-hidden-mobile"
          key={u.userid}
        >
          <div className="box mx-0 my-0 px-0 py-0">
            <p className="image is-32x32">
              <img
                src={u.picture}
                alt={u.nickname}
                style={{ borderRadius: '.4rem' }}
              />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardUsers;
