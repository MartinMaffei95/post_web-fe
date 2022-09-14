import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../Components/Header/Header';
import Input from '../../Components/Input/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import ProfileImage from '../../Molecules/ProfileImage/ProfileImage';
import { useEffect } from 'react';
import useFetchAvatar from '../../Hooks/useFetchAvatar';

const ProfileEdit = ({ profile }) => {
  const [profileInformation, setProfileInformation] = useState(profile);
  const [isActive, setIsActive] = useState(false);
  const [avatars, setAvatars] = useState();
  const [pickedAvatar, setPickedAvatar] = useState(profileInformation?.image);
  const [imageSRC, setImageSRC] = useState(profileInformation?.image);
  const navigate = useNavigate();

  const initialValues = {
    name: profileInformation?.name || '',
    username: profileInformation?.username || '',
    biography: profileInformation?.biography || '',
    email: profileInformation?.email || '',
    birthdate:
      `${new Date(profileInformation?.birthdate).getFullYear()}-${
        new Date(profileInformation?.birthdate).getDate() >= 10
          ? new Date(profileInformation?.birthdate).getDate()
          : '0' + new Date(profileInformation?.birthdate).getDate()
      }-${
        new Date(profileInformation?.birthdate).getMonth() + 1 >= 10
          ? new Date(profileInformation?.birthdate).getMonth() + 1 + 1
          : '0' + (new Date(profileInformation?.birthdate).getMonth() + 1)
      }` || '',
    location: profileInformation?.location || '',
    image: profileInformation?.image,
  };

  // Open "ChangeAvatar" Tab

  //Fetch and reload Avatar
  const { profilePic } = useFetchAvatar();
  const reloadAvatar = () => {
    setAvatars(profilePic());
  };

  //Select a Avatar
  const takeAvatar = (e) => {
    setPickedAvatar(e.target.src);
  };
  //Save the Avatar selected in STATE (not in DB)
  const saveAvatarPicked = () => {
    setIsActive(false);
    setImageSRC(pickedAvatar);
  };

  const onSubmit = () => {
    fetch(
      `${process.env.REACT_APP_URI}profile/${localStorage.getItem('userID')}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          biography: values.biography,
          email: values.email,
          birthdate: Date.parse(values.birthdate.replace(/-/g, ' ')),
          location: values.location,
          image: imageSRC,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
    birthdate: Yup.string().required(errorMessages.required),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { handleChange, values, handleSubmit, errors, touched, handleBlur } =
    formik;

  const toProfile = () => {
    navigate(`/profile/${profileInformation?._id}`, { replace: true });
  };
  console.log(values?.birthdate.replace(/-/g, ' '));

  useEffect(() => {
    setProfileInformation(profile);
  }, [profile]);

  return (
    <div>
      <Header>
        <button className="btn terciary animate" onClick={toProfile}>
          PATRA
        </button>
      </Header>
      <div className="EditProfileSection">
        <div className="formContainer editProfile">
          <div
            onClick={() => {
              reloadAvatar();
              setIsActive(true);
            }}
          >
            <ProfileImage src={imageSRC} classname={'editProfile_image'} />
          </div>
          <form className="formContainer_form" onSubmit={handleSubmit}>
            <Input
              label={'Nombre'}
              type={'text'}
              name={'name'}
              placeholder={''}
              value={values?.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label={'Descripcion'}
              type={'textarea'}
              name={'biography'}
              placeholder={'Cuentanos quien eres!'}
              value={values?.biography}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label={'Usuario'}
              type={'text'}
              name={'username'}
              placeholder={''}
              value={values?.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label={'Direccion de mail'}
              type={'email'}
              name={'email'}
              placeholder={''}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label={'Fecha de nacimiento'}
              type={'date'}
              name={'birthdate'}
              placeholder={''}
              value={values.birthdate}
              onChange={handleChange}
              onBlur={handleBlur}
              // min={'1900-01-01'}
            />
            <Input
              label={'De donde sos?'}
              type={'location'}
              name={'location'}
              placeholder={''}
              value={values.location}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <input value="Guardar" type="submit" className="btn primary" />
          </form>
        </div>
        <div className={`pickAvatarContainer ${isActive ? 'active' : ''}`}>
          Elige tu avatar!
          <button onClick={reloadAvatar}>Reload</button>
          <button onClick={saveAvatarPicked}>Guardar</button>
          <button
            onClick={() => {
              setIsActive(false);
            }}
          >
            X
          </button>
          <div className="pickAvatar" onClick={takeAvatar}>
            {avatars &&
              avatars?.map((avatar) => (
                <ProfileImage
                  key={avatar}
                  src={avatar}
                  classname={'pickImageAvatar'}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer.myProfileInformation,
});
export default connect(mapStateToProps, {})(ProfileEdit);
