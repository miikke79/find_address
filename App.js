import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';
import MapView, { Marker } from'react-native-maps';
import React, { useState } from 'react';


export default function App() {

  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(57.44741);
  const [longitude, setLongitude] = useState(-3.13258);

  const fetchLocation = () => 
  {  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=K6UsLI0CHckInWVQwxQaQrdANObKx3hL&location=${address}`)  
  .then(response => response.json())  
  .then(data => {setLatitude(data.results[0].locations[0].latLng.lat), setLongitude(data.results[0].locations[0].latLng.lng)  })
  .catch(error => {         Alert.alert('Error', error);   });
} 

  return (

    <View style={styles.container}>
      <MapView
        style={styles.map}   
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      />
      <TextInput
      style={{fontSize: 18}}
        placeholder='enter address'
        onChangeText={text => setAddress(text)}
      />
      <View style={styles.button}>
      <Button 
    title='Show'
    onPress={fetchLocation}
    />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch'
  },
  map: {
    flex:1,
    width: "100%",
    height: "100%"
  }
});
