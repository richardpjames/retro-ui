import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Common/Icon';

const BlogSideBar = (props) => {
  return (
    <aside className="menu mx-5 my-5">
      <p className="menu-label">Categories</p>
      <ul className="menu-list">
        <li>
          <NavLink className={`${!props.currentTag && 'is-active'}`} to="/blog">
            <Icon class="fas fa-rss-square" padding />
            All Posts
          </NavLink>
        </li>
        {props.tags.map((tag) => {
          return (
            <li key={tag.id}>
              <NavLink
                className={`${props.currentTag === tag.slug && 'is-active'}`}
                to={`/blog/tags/${tag.slug}`}
              >
                <Icon class="fas fa-rss-square" padding />
                {tag.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default BlogSideBar;
