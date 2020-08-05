import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = (props) => {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const _content = await axios.get(props.url);
      setPageContent(_content.data);
    };
    fetchData();
  });

  return (
    <div className="container my-3">
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: pageContent }}
      ></div>
    </div>
  );
};

export default Page;
