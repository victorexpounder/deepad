import { ScrollView, StyleSheet, TextInput, View, Image, Button, TouchableOpacity, useColorScheme, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import BottomBar from '../../Components/BottomBar';
import VideoScreen from '../../Components/Video';
import * as Crypto from 'expo-crypto';
import * as Notifications from 'expo-notifications';
import { useNotes } from '../../contexts/NoteContext';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import axios from 'axios';

const Write = ({ route }) => {
  const { id } = route.params; // Access the id parameter
  const { category } = route.params; // Access the id parameter
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState([]); // State for storing the image URI
  const [videoUri, setVideoUri] = useState([]); // State for storing the video URI
  const [noteId, setNoteId] = useState(id); // State for storing the Note ID
  const [isEditingTitle, setIsEditingTitle] = useState(true); // Flag to manage focus
  const bodyInputRef = useRef();
  const {storedNotes, updateNote} = useNotes()
  const scheme = useColorScheme()
  const dark = scheme === "dark"
  const styles = createStyles(dark)

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

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

  const aiGenerate = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      url: "https://api.edenai.run/v2/text/chat",
      headers: {
        authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNGQwNzEyZDAtZGVmYS00MTQwLWFiZDEtMDAxYjNiZmQyNzNmIiwidHlwZSI6ImFwaV90b2tlbiJ9.ccld4LAcYhWJ_wtctxyUftSmyDE8XJYf6KCSmddGH9Y`,
      },
      data: {
        providers: "openai/gpt-4",
        text: title,
        chatbot_global_action: `
          You are a smart note-writing assistant.

          When given a title or topic, generate only the content of the note. Do not repeat the title in the response. Go straight to the point, and structure the content clearly using lists, steps, or paragraphs depending on the context.

          Keep it informative, relevant, and free of unnecessary introductions or conclusions.

          Example:
          Title: Jollof Rice Recipe

          Response:
          Ingredients:
          - 2 cups of rice
          - 4 tomatoes
          - 1 onion
          ...

          Instructions:
          1. Blend the tomatoes and onions.
          2. Heat oil and fry the mixture.
          3. Add rice and cook for 30 minutes.
          `,
        previous_history: [],
        temperature: 0.0,
        max_tokens: 150,
        
      },
    };
    try {
      const response = await axios.request(options);
      const data = response.data;
      const generatedText = data['openai/gpt-4'].generated_text;
      setBody(prev => prev.trim() + '\n\n' + generatedText.trim());
      setIsEditingTitle(false); // Disable title editing after AI generation
      if (bodyInputRef.current) {
        bodyInputRef.current.focus(); // Focus on body input after AI generation
      }
      console.log('AI generated text:', generatedText);
    } catch (error) {
      console.error('Error generating text with AI:', error);
      alert('Failed to generate text with AI. Please try again.');
    }finally{
      setLoading(false);
    }
  }

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
            finished : false
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
          finished : false
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

  const handleFinish = () =>{
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'You Just Finished A Note 🎊',
        body: "Congratulations on finishing a note",
      },
      trigger: null,
    });
  }

  useEffect(()=>{
    loadNote()
    handleFinish()
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
              console.log('Title:', title);
              saveNote(category)
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
          onChangeText={(newBody) =>{
            setBody(newBody)
            saveNote(category)
          }}
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
      {loading && (
        <View style={styles.loadingOverlay}>
          <Text>Generating...</Text>
          <ActivityIndicator size="large" color={MD2Colors.red800} />
        </View>
      )}
      <BottomBar selectImage={selectImage} selectVideo={selectVideo} aiGenerate={aiGenerate}/>
    </View>
  );
};

export default Write;

const createStyles = (dark) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: dark? '#000' : '#fdfdfd',
  },
  textView: {
    marginBottom: 100,
  },
  textInput: {
    paddingVertical: 4,
    color: dark? '#fff' : '#333',
    lineHeight: 24,
    marginBottom: 300,
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
