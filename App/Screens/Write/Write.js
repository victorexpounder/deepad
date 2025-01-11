import { ScrollView, StyleSheet, TextInput, View, Image, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import colors from '../../assets/colors/colors';
import BottomBar from '../../Components/BottomBar';
import Hello from '../../Components/hello';
import VideoScreen from '../../Components/Video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notesDataMock from '../../notesDataMock';
import * as Crypto from 'expo-crypto';
import { useNotes } from '../../contexts/NoteContext';

const Write = ({ route }) => {
  const { id } = route.params; // Access the id parameter
  const { category } = route.params; // Access the id parameter
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUri, setImageUri] = useState([]); // State for storing the image URI
  const [videoUri, setVideoUri] = useState([]); // State for storing the video URI
  const [noteId, setNoteId] = useState(id); // State for storing the Note ID
  const [isEditingTitle, setIsEditingTitle] = useState(true); // Flag to manage focus
  const bodyInputRef = useRef();
  const {storedNotes, updateNote} = useNotes()
  

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
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri([...imageUri, result.assets[0].uri]); // Update state with selected image URI
    }
  };

  const selectVideo = async () => {
    // Request media library permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access the media library is required!');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri([...videoUri, result.assets[0].uri]); // Update state with selected image URI
    }
  };

  const removeImage = (key) =>{
    const newimages = imageUri.filter((img, index)=> index !== key);
    setImageUri(newimages)
  }
  
  const removeVideo = (key) =>{
    const newvideos = videoUri.filter((img, index)=> index !== key);
    setVideoUri(newvideos)  
  }

  //load previously typed note on page open
  const loadNote = ()=>{
    if(id)
    {
      
      const notes = storedNotes
      const noteIndex = notes.findIndex((note)=> note.id === noteId)
      if (noteIndex !== -1) {
        console.log(notes[noteIndex])
        const currentNote = notes[noteIndex]
        setTitle(currentNote.title)
        setBody(currentNote.body)
        setImageUri(currentNote.images)
        setVideoUri(currentNote.videos)
      } else {
        throw new Error('Note ID not found');
      }
    }else{
      console.log("no id", id)
    }
  }

  const saveNote = async (category) => {
    try {

      const notes = storedNotes ? storedNotes : [];
      if(noteId)
      {
        const noteIndex = notes.findIndex((note)=> note.id === noteId)
        if (noteIndex !== -1) {
          // Update the existing note
          notes[noteIndex] = {
            ...notes[noteIndex],
            title: title.trim(),
            body: body.trim(),
            images: imageUri,
            videos: videoUri,
            category: category,
            timestamp: new Date().toISOString(), // Update timestamp
          };
          console.log(notes[noteIndex])
         
        } else {
          throw new Error('Note ID not found for update');
        }
      }else{
        const newId = Crypto.randomUUID()
        setNoteId(newId)
        // Create a new note object
        const newNote = {
          id: newId, // Unique ID for the note
          title: title.trim(), // Save trimmed title
          body: body.trim(), // Save trimmed body
          images: imageUri, // Save array of image URIs
          videos: videoUri, // Save array of video URIs
          category: category,
          pinned: false, // Default to unpinned
          timestamp: new Date().toISOString(), // Save creation timestamp
        };
        
        // Add the new note to the selected category
        notes.unshift(newNote);
        console.log("new note added")
      }
      
      
     
      // Save updated notes data back to AsyncStorage
      await updateNote(notes)
      console.log('Note saved successfully');
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  }; 

  useEffect(()=>{
    loadNote()
  }, [])

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
              saveNote("Interesting Idea")
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

        {imageUri.length > 0 && 
          imageUri.map((img, index)=>(
            <TouchableOpacity onLongPress={()=> removeImage(index)}>
              <Image key={index} source={{ uri: img }} style={styles.image} />
            </TouchableOpacity>
          ))
        }
        {videoUri.length > 0 && 
          videoUri.map((video, index)=>(
            <TouchableOpacity onLongPress={()=> removeVideo(index)}>
              <VideoScreen key={index} videoSource={video}/>
            </TouchableOpacity>
          ))
        }

      </ScrollView>
      <BottomBar selectImage={selectImage} selectVideo={selectVideo}/>
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
