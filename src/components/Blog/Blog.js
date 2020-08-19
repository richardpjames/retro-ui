import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import BlogSideBar from './BlogSideBar';
import LoadingSpinner from '../Common/LoadingSpinner';
import PostList from './PostList';
import Post from './Post';

const Blog = (props) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('Blog');
  const [description, setDescription] = useState('The RetroSpectacle Blog');
  const history = useHistory();
  const pageNumber = props.match.params.pageNumber || 1;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let _posts;
      let _post;
      if (!props.match.params.postSlug) {
        _posts = await props.api.posts.browse({
          include: 'tags,authors',
          limit: 10,
          page: pageNumber,
          filter: props.match.params.tagSlug
            ? `tag:${props.match.params.tagSlug}`
            : null,
        });
        setPosts(_posts);
        setPost({});
      } else {
        _post = await props.api.posts.read({
          include: 'tags,authors',
          slug: props.match.params.postSlug,
        });
        setPost(_post);
        setPosts([]);
      }
      if (props.match.params.tagSlug) {
        const _tag = await props.api.tags.read({
          slug: props.match.params.tagSlug,
        });
        setTitle(_tag.name);
        setDescription(_tag.meta_description);
      } else {
        setDescription('The RetroSpectacle Blog');
        setTitle('Blog');
      }
      const _tags = await props.api.tags.browse();
      setTags(_tags);
      setLoading(false);
    };
    fetchData();
  }, [props.api, pageNumber, props.match]);

  const navigate = (event) => {
    // If the user has clicked a link to within the site then we want to capture and use the router
    if (event.target.getAttribute('href')) {
      // Pull the location from the string,
      let _location = event.target.getAttribute('href');
      // removing the https://retrospectacle.io
      if (_location.startsWith('https://retrospectacle.io')) {
        event.preventDefault();
        _location = _location.substring(25, _location.length);
        // Use the react router to navigate
        window.scrollTo(0, 0);
        history.push(_location || '/');
      }
      // removing the https://www.retrospectacle.io
      if (_location.startsWith('https://www.retrospectacle.io')) {
        event.preventDefault();
        _location = _location.substring(29, _location.length);
        // Use the react router to navigate
        window.scrollTo(0, 0);
        history.push(_location || '/');
      }
    }
  };

  return (
    <>
      <div className="columns" onClick={navigate}>
        {loading && <LoadingSpinner />}
        <div className="column is-one-fifth">
          <BlogSideBar
            tags={tags}
            currentTag={props.match.params.tagSlug || post?.primary_tag?.slug}
          />
        </div>
        <div className="column">
          {props.match.params.postSlug && <Post post={post} />}
          {!props.match.params.postSlug && posts.meta && (
            <>
              <PostList
                posts={posts}
                title={title}
                meta_description={description}
              />
              {posts.meta.pagination.pages > 1 && (
                <nav
                  className="pagination mx-5 mb-5"
                  role="navigation"
                  aria-label="pagination"
                >
                  {posts.meta && (
                    <ul className="pagination-list">
                      {(() => {
                        let i;
                        let buttons = [];
                        for (i = 1; i <= posts.meta.pagination.pages; i++) {
                          buttons.push(
                            <li key={i}>
                              <Link
                                to={
                                  props.match.params.tagSlug
                                    ? `/blog/tags/${props.match.params.tagSlug}/page/${i}`
                                    : `/blog/page/${i}`
                                }
                                className={`pagination-link ${
                                  i === parseInt(pageNumber) && 'is-current'
                                }`}
                              >
                                {i}
                              </Link>
                            </li>,
                          );
                        }
                        return buttons;
                      })()}
                    </ul>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
