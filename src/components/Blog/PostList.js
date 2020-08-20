import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PostList = (props) => {
  document.title = `RetroSpectacle - ${props.title}`;
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', props.meta_description);

  return (
    <div className="content mx-5 my-5">
      <h1 className="title is-1">{props.title ? props.title : 'Blog'}</h1>
      <p>
        {props.description ||
          'These are the latest posts from the RetroSpectacle blog.'}
      </p>
      {props.posts.map((post) => {
        return (
          <div key={post.id} className="mb-5">
            <div className="columns">
              <div className="column is-one-quarter">
                <img
                  className="image"
                  alt={post.title}
                  src={post.feature_image}
                />
              </div>
              <div className="column">
                <Link to={`/blog/posts/${post.slug}`}>
                  <h3 className="title is-3 mb-0">{post.title}</h3>
                </Link>
                <p className="is-size-7">
                  Published{' '}
                  {moment(post.published_at).format('DD/MM/YYYY HH:mm')}
                </p>
                <p>{post.custom_excerpt || post.excerpt}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
