import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const NavigationBar = ({isOpen, toggle}) => {
  return (
    <View style={styles.container}>
      {isOpen && (
        <TouchableOpacity style={styles.button} onPress={toggle}>
          <Text>Close</Text>
        </TouchableOpacity>
      )}
      <Text>Navigation Items</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 10,
  },
  button: {
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#E0E0E0',
  },
});

export default NavigationBar;
