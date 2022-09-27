import React from 'react';
import MakeAComment from '../MakeAComment/MakeAComment';
import MakePost from '../MakePost/MakePost';
import { Box } from '@mui/material';
import {
  IS_COMMENT,
  IS_EDIT_POST,
  IS_NEW_POST,
} from '../../Redux/actions/actions';

const SectionModal = ({ section, postInfo }) => {
  const renderModal = (section) => {
    switch (section) {
      case IS_NEW_POST:
        return <MakePost isModal />;
      case IS_COMMENT:
        return <MakeAComment postInfo={postInfo} isModal />;
      case IS_EDIT_POST:
        console.log(postInfo);
        return (
          <MakePost
            postValue={postInfo?.text}
            editPost={true}
            postId={postInfo?._id}
            isModal
          />
        );
      default:
        return <div>Modal {section}</div>;
    }
  };

  return <Box className={`modalStyle `}>{renderModal(section)}</Box>;
};

export default SectionModal;
