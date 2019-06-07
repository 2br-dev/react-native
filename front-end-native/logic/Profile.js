import React, { useState, useEffect } from 'react';
//import { makeStyles } from '@material-ui/styles';
import $ from 'jquery';
// import { Redirect } from 'react-router';
// import { withSnackbar } from 'notistack';
import { validateEmail, validatePass, confirmPass } from './Validate';
import { getProfileData } from './GetProfileData';
// import ProfileView from '../ProfileView';
// import { View } from 'native-base';
import { View, Text } from 'react-native';
import { AppFontLoader } from './AppFontLoader';

/*const useStyles = makeStyles(theme => ({
    profileContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));*/

function Profile(props)
{
    //const classes = useStyles();
    const [loggedIn, setLoggedIn] = useState(props.loggedIn);
    const [profileData, setProfileData] = useState({});
    const [formData, setFormData] = useState({
        password: '',
        confirm: '',
        validEmail: true,
        validPassword: true,
        passConfirmed: true,
    });

    const handleBlur = event => {
        const name = event.target.name;
        const value = event.target.value;
        $.ajax({
            type: "POST",
            url: "http://react-native.local/back-end/api/UpdateController.php",
            data: "accessToken="+localStorage.getItem('accessToken')+"="+name+"="+value,
            success: function(response) {

            }
        });
    }

    const handleChange = event => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'name':
                setProfileData({ ...profileData, name: value});
                break;

            case 'login':
                setProfileData({ ...profileData, login: value});
                break;
            
            case 'email':
                setProfileData({ ...profileData, email: value});
                setFormData({
                    ...formData,
                    validEmail: validateEmail(value),
                });
                break;

            case 'phone':
                setProfileData({ ...profileData, phone: value});
                break;

            case 'address':
                setProfileData({ ...profileData, address: value});
                break;

            case 'city':
                setProfileData({ ...profileData, city: value});
                break;
            
            case 'password':
                setFormData({
                    ...formData,
                    password: value,
                    validPassword: validatePass(value),
                });
                break;

            case 'confirm':
                setFormData({
                    ...formData,
                    confirm: value,
                    passConfirmed: confirmPass(formData.password, value),
                });
                if (formData.validPassword && confirmPass(formData.password, value)) {
                    handleBlur(event);
                    setFormData({
                        ...formData,
                        password: '',
                        confirm: '',
                        validPassword: true,
                        passConfirmed: true,
                    });
                    props.enqueueSnackbar('Пароль изменён', { variant: 'success' });
                }
                break;

            default:
                break;
        }
    };

    const handleLogOut = () => {
        setLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    if (loggedIn) {
        let keyCount = 0;
        // eslint-disable-next-line
        for (let key in profileData) {
            keyCount++;
        }
        // если объект profileData пуст, значит данные запрашиваются первый раз
        // проверка необходима для предотвращения повторных запросов, на уже полученные данные
        if (keyCount === 0) {
            const data = getProfileData();
            if (data) {
                setProfileData(data);
            }
        }
    }

    return(
        <AppFontLoader>
            <View>
                <Text>Profile</Text>
            </View>
        </AppFontLoader>
    );
}

export default Profile;
