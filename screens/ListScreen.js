import React, {useState, useCallback, useRef, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Card, Title, Paragraph, Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from './../constant';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const ListScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [name, setName] = useState('');

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

      const storedName = await AsyncStorage.getItem('name');
      if (storedName) {
        setName(storedName);
      } else {
        throw new Error('Name not found');
      }

      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
      });

      setData(response.data.data);
    } catch (error) {
      console.error('Error:', error);
      navigation.navigate('Login');
    }
  };

  const deleteData = async id => {
    console.log('id', id);
    const response = await axios.delete(`${BASE_URL}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response) {
      const updatedData = fetchData();
      setData(updatedData);
      showMessage({
        message: 'Data deleted successfully!',
        type: 'success',
        duration: 2000,
      });
    }
  };

  const viewData = useCallback(
    item => {
      navigation.navigate('Detail', {item});
    },
    [data],
  );
  const editData = useCallback(
    item => {
      navigation.navigate('Edit', {item});
    },
    [data],
  );

  const renderItem = ({item}) => (
    <Card style={styles.contactCard}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>Phone: {item.phone}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => viewData(item)}>View</Button>
        <Button onPress={() => editData(item)}>Edit</Button>
        <Button onPress={() => deleteData(item.id)}>Delete</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contactCard: {
    marginVertical: 8,
    elevation: 3,
  },
});

export default ListScreen;
