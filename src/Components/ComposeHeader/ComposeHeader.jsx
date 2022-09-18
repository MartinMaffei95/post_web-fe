import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

import '../Header/styles.Header.css';

const ComposeHeader = ({ title, children }) => {
  // Recives in the children button to post a Post or Comment
  const navigate = useNavigate();

  return (
    <header className="header header_compose">
      <button
        className="btn noStyle backBtn"
        onClick={() => {
          navigate(-1);
        }}
      >
        <MdArrowBackIosNew />
      </button>
      {title && <span className="header_title">{title}</span>}
      <div>{children}</div>
    </header>
  );
};

export default ComposeHeader;
