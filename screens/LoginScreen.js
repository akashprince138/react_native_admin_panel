import React, {useState} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from './../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (phoneNumber.length === 0) {
      alert('Please enter the phone number.');
      return;
    }
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    if (regex.test(phoneNumber) === false) {
      alert('Please enter the correct phone number.');
      return;
    }
    if (phoneNumber.length !== 10) {
      alert('Please enter 10 digit phone number.');
      return;
    }
    if (password.length === 0) {
      alert('Please enter the password.');
      return;
    }
    // console.log('test');
    axios
      .post(
        `${BASE_URL}/login`,
        {
          phone: phoneNumber,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(async response => {
        // console.log('iddddddd', response.data.data.id);
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('name', response.data.data.name);
        showMessage({
          message: 'Login successfully!',
          type: 'success',
          duration: 1500,
        });
        setTimeout(() => {
          navigation.navigate('List');
        }, 2000);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>National Pharma</Text>
      <TextInput
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
        label="Phone Number"
        mode="outlined"
      />
      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        label="Password"
        mode="outlined"
      />
      <Button style={styles.button} mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Signup')}>
        Signup
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

export default LoginScreen;
