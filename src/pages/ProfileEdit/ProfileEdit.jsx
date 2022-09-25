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
import { Helmet } from 'react-helmet';
import ComposeHeader from '../../Components/ComposeHeader/ComposeHeader';
import './styles.ProfileEdit.css';
import { getMyProfileData } from '../../Redux/actions/profilesActions';
import { makeToast } from '../../Redux/actions/postsActions';
import useNumberToDate from '../../Hooks/useNumberToDate';
import {
  AiOutlineReload,
  AiOutlineClose,
  AiFillEdit,
  AiOutlineCheck,
} from 'react-icons/ai';

// TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const ProfileEdit = ({ profile, fetchUserProfile, handleToast }) => {
  const [profileInformation, setProfileInformation] = useState(profile);
  const [isActive, setIsActive] = useState(false);
  const [avatars, setAvatars] = useState();
  const [pickedAvatar, setPickedAvatar] = useState(profileInformation?.image);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [imageSRC, setImageSRC] = useState(profileInformation?.image);
  const navigate = useNavigate();

  const initialValues = {
    name: profileInformation?.name || '',
    username: profileInformation?.username || '',
    biography: profileInformation?.biography || '',
    email: profileInformation?.email || '',
    birthdate: useNumberToDate(profileInformation?.birthdate) || '',
    location: profileInformation?.location || '',
    image: profileInformation?.image,
  };

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
          birthdate: Date.parse(values.birthdate.replace(/-/g, ' ')), // Transform DATE for HTML5 a reading date format, later trasnform in number
          location: values.location,
          image: imageSRC,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        switch (data.message) {
          case 'PROFILE_MODIFIED':
            handleToast('success', 'Tu perfil fue editado!');
            navigate(`/profile/${localStorage.getItem('userID')}`, {
              replace: true,
            });
            fetchUserProfile(
              localStorage.getItem('userID'),
              localStorage.getItem('token')
            );
            break;
          case 'INVALID_NAME':
            Swal.fire({
              title: 'No se pudo actualizar',
              text: 'El nombre no es valido :(',
              icon: 'error',
              focusConfirm: true,
              confirmButtonText: 'Reintentar',
              background: '#fff',
              customClass: {
                actions: 'test',
                confirmButton: 'btn danger',
              },
              buttonsStyling: false,
            });
            break;

          default:
            break;
        }
      });
  };
  const errorMessages = {
    required: '* Este campo es requerido',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'La cantidad minima de caracteres es 4')
      .required(errorMessages.required),
    image: Yup.string().required(errorMessages.required),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });
  const { handleChange, values, handleSubmit, errors, touched, handleBlur } =
    formik;

  const toProfile = () => {
    navigate(`/profile/${profileInformation?._id}`, { replace: true });
  };
  // console.log(values?.birthdate.replace(/-/g, ' '));
  // console.log(values?.birthdate);
  const openTab = () => {
    reloadAvatar();
    setIsActive(true);
  };
  useEffect(() => {
    setProfileInformation(profile);
    console.log(imageSRC);
  }, [profile]);

  return (
    <div>
      <Helmet>
        <title>PostWeb | Editar perfil</title>
      </Helmet>
      <ComposeHeader title={'Editá tu perfil'}>
        <button className="btn primary" type="submit" form="editProfile">
          Guardar!
        </button>
      </ComposeHeader>

      <div className="EditProfileSection">
        <div className="formContainer editProfile">
          <div className="changeUserImage">
            <ProfileImage src={imageSRC} classname={'editProfile_image'} />
            <div className={' backdrop'} onClick={openTab}>
              <AiFillEdit />
            </div>
          </div>
          <form
            className="formContainer_form"
            onSubmit={handleSubmit}
            id="editProfile"
          >
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
          </form>
        </div>
        <div className={`pickAvatarContainer ${isActive ? 'active' : ''}`}>
          <h3>Elige tu avatar!</h3>
          <div className="buttonsContainer">
            <button
              className="btn informative"
              onClick={() => {
                setPickedAvatar(profileInformation?.image);
                setSelectedAvatar('');
                reloadAvatar();
              }}
            >
              <AiOutlineReload />
            </button>
            <button className="btn success" onClick={saveAvatarPicked}>
              <AiOutlineCheck />
              Seleccionar
            </button>
            <button
              className="btn danger"
              onClick={() => {
                setIsActive(false);
              }}
            >
              <AiOutlineClose />
              Descartar
            </button>
          </div>
          <div className="pickAvatar" onClick={takeAvatar}>
            {avatars &&
              avatars?.map((avatar, index) => (
                <div
                  onClick={() => {
                    setSelectedAvatar(index);
                  }}
                  key={index}
                >
                  <ProfileImage
                    src={avatar}
                    classname={`pickImageAvatar ${
                      selectedAvatar === index ? 'selected' : ''
                    }`}
                  />
                </div>
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

const mapDispatchToProps = (dispatch) => ({
  fetchUserProfile(profileID, token) {
    dispatch(getMyProfileData(profileID, token));
  },
  handleToast(status, msg) {
    dispatch(makeToast(status, msg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
