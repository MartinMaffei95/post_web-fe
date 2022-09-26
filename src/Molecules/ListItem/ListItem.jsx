import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ icon, text, link = false, to, extraAction, children }) => {
  return (
    <li onClick={extraAction}>
      {icon && icon}
      <div className="link">
        {link ? <Link to={to}>{text}</Link> : <span>{text}</span>}
      </div>
      {children}
    </li>
  );
};

export default ListItem;
