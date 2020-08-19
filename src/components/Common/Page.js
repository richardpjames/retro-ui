import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Page = (props) => {
  const [pageContent, setPageContent] = useState('');
  const history = useHistory();

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

  useEffect(() => {
    const fetchData = async () => {
      const _contentCMS = await props.api.pages.read({ slug: props.slug });
      let _content = _contentCMS.html;
      _content = _content.replace(
        new RegExp('<a href="https://cms.retrospectacle.io', 'g'),
        '<a href="https://www.retrospectacle.io',
      );
      setPageContent(_content);
    };
    fetchData();
  });

  return (
    <div className="container mx-5 my-5">
      <div
        className="content"
        onClick={navigate}
        dangerouslySetInnerHTML={{ __html: pageContent }}
      ></div>
    </div>
  );
};

export default Page;
