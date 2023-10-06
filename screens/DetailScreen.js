import React, {useState, useCallback, useRef, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DetailScreen = ({route}) => {
  const {item} = route.params;

  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          throw new Error('Token not found');
        }

        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setName(storedName);
        } else {
          throw new Error('Name not found');
        }
      } catch (error) {
        console.error('Error:', error);
        navigation.navigate('Login');
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Name: {item.name}</Title>
          <Paragraph>Phone Number: {item.phone}</Paragraph>
          <Paragraph>Address: {item.address}</Paragraph>
          <Paragraph>Address: {item.status}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    padding: 10,
  },
});

export default DetailScreen;
