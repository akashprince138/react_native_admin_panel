import React, {useState} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from './../constant';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigation = useNavigation();

  const handleSignup = () => {
    if (name.length === 0) {
      alert('Please enter the name.');
      return;
    }
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
    if (address.length === 0) {
      alert('Please enter the address.');
      return;
    }
    // console.log('test');
    axios
      .post(
        `${BASE_URL}/signup`,
        {
          name: name,
          phone: phoneNumber,
          password: password,
          address: address,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(async response => {
        console.log('response', response);
        showMessage({
          message: 'Signup successfully!',
          type: 'success',
          duration: 1500,
        });
        setTimeout(() => {
          navigation.navigate('Login');
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
        onChangeText={text => setName(text)}
        value={name}
        secureTextEntry
        label="Name"
        mode="outlined"
      />
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
      <TextInput
        onChangeText={text => setAddress(text)}
        value={address}
        secureTextEntry
        label="Address"
        mode="outlined"
      />
      <Button style={styles.button} mode="contained" onPress={handleSignup}>
        Signup
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Login')}>
        Login
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

export default SignupScreen;
