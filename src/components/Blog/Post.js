import React from 'react';

const Post = (props) => {
  // Set the title and meta tags
  document.title = `RetroSpectacle - ${props.post.title}`;
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', props.post.meta_description);

  return (
    <div className="content mx-5 my-5">
      <h1 className="title is-1">{props.post.title}</h1>
      {props.post.html && (
        <>
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: props.post.html
                .replace(new RegExp('<img', 'g'), '<img className="image"')
                .replace(
                  new RegExp('<a href="https://cms.retrospectacle.io', 'g'),
                  '<a href="https://www.retrospectacle.io',
                ),
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default Post;
