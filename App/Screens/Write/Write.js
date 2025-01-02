import { ScrollView, StyleSheet, TextInput, View, Image, Button } from 'react-native';
import React, { useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../assets/colors/colors';
import BottomBar from '../../Components/BottomBar';
import Hello from '../../Components/hello';

const Write = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUri, setImageUri] = useState(null); // State for storing the image URI
  const bodyInputRef = useRef();
  const [isEditingTitle, setIsEditingTitle] = useState(true); // Flag to manage focus

  const handleTitleEnter = () => {
    const [newTitle, ...rest] = title.split('\n');
    setIsEditingTitle(false); // Temporarily disable `onChangeText`
    setTitle(newTitle); // Update title to first line
    setBody((prevBody) => `${rest.join('\n')}${prevBody}`); // Add remaining lines to body

    if (bodyInputRef.current) {
      bodyInputRef.current.focus(); // Focus on body input
    }
  };

  const selectImage = async () => {
    // Request media library permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access the media library is required!');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Update state with selected image URI
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.textView}>
        {/* Title */}
        <TextInput
          style={[styles.textInput, styles.title]}
          multiline
          editable
          cursorColor="#000"
          autoFocus
          value={title}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Enter') {
              handleTitleEnter();
            }
          }}
          onChangeText={(newTitle) => {
            if (isEditingTitle) {
              setTitle(newTitle); // Only update if editing is allowed
            }
          }}
          onBlur={() => setIsEditingTitle(true)} // Re-enable editing after focus change
        />
        {/* Body */}
        <TextInput
          style={[styles.textInput, styles.body]}
          multiline
          editable
          ref={bodyInputRef}
          value={body}
          onChangeText={(newBody) => setBody(newBody)}
        />
        {/* Display the selected image */}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        {/* Button to pick an image */}
        <Button title="Add Image" onPress={selectImage} color={colors.primary} />
      </ScrollView>
      <BottomBar />
    </View>
  );
};

export default Write;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fdfdfd',
  },
  textView: {
    marginBottom: 100,
  },
  textInput: {
    paddingVertical: 4,
    color: '#333',
    lineHeight: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 16,
    borderRadius: 8,
  }, 
});
