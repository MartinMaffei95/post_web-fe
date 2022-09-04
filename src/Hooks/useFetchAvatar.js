import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
const useFetchAvatar = () => {
  const api = `https://avatars.dicebear.com/api/pixel-art/1255`;
  const [randomAvatars, setRandomAvatars] = useState('');

  const profilePic = () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const avatarURL = `${api}${Math.round(Math.random() * 1000)}.svg}`;
      // const buffer = new Buffer(image.data);
      // data.push(buffer.toString('base64'));
      data.push(avatarURL);
    }
    setRandomAvatars(data);
    console.log(randomAvatars);
  };

  useEffect(() => {
    profilePic();
  }, []);

  return { randomAvatars };
};

export default useFetchAvatar;
