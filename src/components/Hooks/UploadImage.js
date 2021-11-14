import React, { useState, useEffect } from 'react';
import {  Image, View, Platform,StyleSheet,TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

export default function ImagePickerExample(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    props.getImgLink(result)

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
      <TouchableOpacity 
        onPress={pickImage} 
        style={[styles.customButton, {backgroundColor: '#b3cbcb'}]}
      >
        <AntDesign name="camera" size={15} color="black" />
        <Text style={[styles.buttonText, {color: '#000'}]}>Choose Photo</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    paddingHorizontal: 13,
  },
  buttonText: {
    fontFamily:'Rubik_500Medium',
    fontSize: 15,
    padding: 5
  },


});