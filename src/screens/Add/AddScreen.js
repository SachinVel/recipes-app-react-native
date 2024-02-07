import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import { getMenu, writeDataToSheet } from '../../data/MockDataAPI';
import { useGlobalContext, useTaskContext } from '../../components/GlobalContext/GlobalContext';
import { authorize } from 'react-native-app-auth';
// import { useNavigation } from '@react-navigation/native';

// import { GoogleSignInButton } from '@react-oauth/google';
// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
// } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//     scopes: ['https://www.googleapis.com/auth/spreadsheets'], // what API you want to access on behalf of the user, default is email and profile
//     webClientId: '343299931008-1q7auces9hbhbg8pe8r6457mbarff67h.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
//     // offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     // hostedDomain: '', // specifies a hosted domain restriction
//     // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//     // accountName: '', // [Android] specifies an account name on the device that should be used
//     // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//     // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//     // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//     // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });
const AddScreen = (props) => {
    const { navigation } = props;

    const { state, dispatch } = useGlobalContext();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [calorie, setCalorie] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        // Validate the photo URL format (you can customize this validation)
        const isPhotoUrlValid = isValidUrl(photoUrl);

        if (!title || !category || !photoUrl || !calorie || !description) {
            console.error('Please fill in all fields');
            return;
        }

        if (isPhotoUrlValid) {
            // Log the entered data
            let newData = {
                Name: title,
                Category: category,
                PhotoUrl: photoUrl,
                Description: description,
                Calories: calorie,
            };

            console.log('Submitted Data:', newData);
            await writeDataToSheet(newData);

            getMenu().then((menuItems) => {
                console.log('menuItems : ', menuItems);

                dispatch({
                    type: 'setMenuItems',
                    payload: menuItems
                });

                navigation.navigate('Home');

            });
        } else {
            console.error('Invalid Photo URL');
        }
    };

    // useEffect(() => {
    //     console.log('globalState : ', state);
    // }, [state.menuItems]);

    const isValidUrl = (url) => {
        // Basic URL validation, you may need to enhance it based on your requirements
        const urlPattern = /^(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        return urlPattern.test(url);
    };



    return (
        <View style={styles.container}>
            <Text>Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />


            <Text>Category:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.input}
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    <Picker.Item label="Select Category" value="" />
                    <Picker.Item label="Base" value="Base" />
                    <Picker.Item label="Protein" value="Protein" />
                    <Picker.Item label="Veggies" value="Veggies" />
                    <Picker.Item label="Sauces" value="Sauces" />
                    <Picker.Item label="Toppings" value="Toppings" />
                </Picker>
            </View>


            <Text>Photo URL:</Text>
            <TextInput
                style={styles.input}
                value={photoUrl}
                onChangeText={(text) => setPhotoUrl(text)}
            />

            <Text>Calorie(cal):</Text>
            <TextInput
                style={styles.input}
                value={calorie}
                onChangeText={(text) => setCalorie(text)}
                keyboardType="numeric"
            />

            <Text>Description:</Text>
            <TextInput
                style={[styles.input, styles.multilineInput]}
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
            />

            <Button title="Submit" onPress={handleSubmit} />

        </View>
    );
};

export default AddScreen;
