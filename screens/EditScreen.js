import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const EditScreen = ({route}) => {
  const {item} = route.params;
  const [token, setToken] = useState('');
  const [name, setName] = useState(item.name);
  const [address, setAddress] = useState(item.address);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      } else {
        throw new Error('Token not found');
      }
    } catch (error) {
      console.error('Error:', error);
      navigation.navigate('Login');
    }
  };

  const handleEdit = () => {
    if (name.length === 0) {
      alert('Please enter the name.');
      return;
    }
    if (address.length === 0) {
      alert('Please enter the address.');
      return;
    }
    axios
      .put(
        `${BASE_URL}/update_user`,
        {
          id: item.id,
          name: name,
          address: address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(async response => {
        if (response) {
          showMessage({
            message: 'User updated successfully!',
            type: 'success',
            duration: 1500,
          });
          setTimeout(() => {
            navigation.navigate('List');
          }, 2000);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>National Pharma</Text>
      <TextInput
        onChangeText={text => setName(text)}
        value={name}
        label="Name"
        mode="outlined"
      />
      <TextInput
        onChangeText={text => setAddress(text)}
        value={address}
        label="Address"
        mode="outlined"
      />
      <Button style={styles.button} mode="contained" onPress={handleEdit}>
        Update User
      </Button>
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Background color for the login page
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
  },
});

export default EditScreen;
