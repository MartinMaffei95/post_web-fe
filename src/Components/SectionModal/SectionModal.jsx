import React from 'react';
import MakeAComment from '../MakeAComment/MakeAComment';
import MakePost from '../MakePost/MakePost';
import { Box } from '@mui/material';
export const sectionNames = {
  MAKE_COMMENT: 'MAKE_COMMENT',
  MAKE_NEW_POST: 'MAKE_NEW_POST',
};

const SectionModal = ({ section, postInfo }) => {
  const renderModal = (section) => {
    switch (section) {
      case sectionNames.MAKE_NEW_POST:
        return <MakePost />;
      case sectionNames.MAKE_COMMENT:
        return <MakeAComment postInfo={postInfo} isModal />;
      default:
        return <div>Modal</div>;
    }
  };

  return <Box className={`modalStyle `}>{renderModal(section)}</Box>;
};

export default SectionModal;
