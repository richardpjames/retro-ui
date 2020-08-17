import React from 'react';

const Post = (props) => {
  return (
    <div className="content mx-5 my-5">
      <h1 className="title is-1">{props.post.title}</h1>
      {props.post.html && (
        <>
          <img
            className="image mb-5"
            src={props.post.feature_image}
            alt={props.post.title}
            style={{ maxHeight: '50vh' }}
          />
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: props.post.html
                .replace(new RegExp('<img', 'g'), '<img class="image"')
                .replace(
                  new RegExp('https://cms.retrospectacle.io', 'g'),
                  'https://www.retrospectacle.io',
                ),
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default Post;
