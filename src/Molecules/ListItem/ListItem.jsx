import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ icon, text, link = false, to }) => {
  return (
    <li>
      {icon && icon}
      <div className="link">
        {link ? <Link to={to}>{text}</Link> : { text }}
      </div>
    </li>
  );
};

export default ListItem;
