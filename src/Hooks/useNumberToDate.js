import React from 'react';

const useNumberToDate = (initialDate) => {
  return `${new Date(initialDate).getFullYear()}-${
    new Date(initialDate).getMonth() + 1 >= 10
      ? new Date(initialDate).getMonth() + 1 + 1
      : '0' + (new Date(initialDate).getMonth() + 1)
  }-${
    new Date(initialDate).getDate() >= 10
      ? new Date(initialDate).getDate()
      : '0' + new Date(initialDate).getDate()
  }`;
};

export default useNumberToDate;
