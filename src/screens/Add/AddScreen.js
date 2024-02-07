import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';
import { getMenu, writeDataToSheet } from '../../data/DataAPI';
import { useGlobalContext } from '../../components/GlobalContext/GlobalContext';
import { Select } from "native-base";



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
            let newData = {
                Name: title,
                Category: category,
                PhotoUrl: photoUrl,
                Description: description,
                Calories: calorie,
            };

            await writeDataToSheet(newData);

            getMenu().then((menuItems) => {

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
                <Select selectedValue={category} placeholder="Choose category" onValueChange={itemValue => setCategory(itemValue)}>
                    <Select.Item label="Select Category" value="" />
                    <Select.Item label="Base" value="Base" />
                    <Select.Item label="Protein" value="Protein" />
                    <Select.Item label="Veggies" value="Veggies" />
                    <Select.Item label="Sauces" value="Sauces" />
                    <Select.Item label="Toppings" value="Toppings" />
                </Select>
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

        </View >
    );
};

export default AddScreen;
