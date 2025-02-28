import { createContext, useContext, useEffect, useState } from "react";
import notesDataMock from "../notesDataMock";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteContext = createContext()
export const useNotes = () =>{
    const context = useContext(NoteContext)
    if(context)
    {
        return context
    }else{
        console.log("useNotes must be within a NoteProvider")
    }
}
export const NotesProvider = ({ children }) =>{
    const [storedNotes, setStoredNotes] = useState()
    const loadNote = async () => {
        try {
          const savedNote = await AsyncStorage.getItem('userNote');
          if (savedNote !== null) {
            setStoredNotes(JSON.parse(savedNote))
            console.log(JSON.parse(savedNote)); 
          }else{
            console.log('No notes');
          }
          return '';
        } catch (error) {
          console.error('Failed to load note:', error);
          return '';
        }
      };
      const saveNote = async (notes) => {
        try {
          await AsyncStorage.setItem('userNote', JSON.stringify(notes));
          console.log('Note saved!');
          setStoredNotes(JSON.parse(notes))
        } catch (error) {
          console.error('Failed to save note:', error);
        }
      };

      const updateNote = async(notesData) =>{
        try {
            // Save updated notes data back to AsyncStorage
            await AsyncStorage.setItem('userNote', JSON.stringify(notesData));
            setStoredNotes(notesData)
            console.log('Note Updated');
        } catch (error) {
            console.error('Failed to update note:', error);
        }
      }

      const deleteNote = async(id) =>{
        try {
          const notes = storedNotes
          const noteIndex = notes.findIndex((note)=> note.id === id)
          if (noteIndex !== -1) {
            notes.splice(noteIndex, 1);
          } else {
            throw new Error('Note ID not found');
          }
          // Save updated notes data back to AsyncStorage
          await AsyncStorage.setItem('userNote', JSON.stringify(notes));
          setStoredNotes(notes)
          console.log(`Note ${id} deleted`);
          console.log(notes)
        } catch (error) {
            console.error('Failed to Delete note:', error);
        }
      }

      const pinNote = async(id) =>{
        try {
          const notes = storedNotes
          const noteIndex = notes.findIndex((note)=> note.id === id)
          if (noteIndex !== -1) {
            notes[noteIndex] = {
              ...notes[noteIndex],
              pinned: !notes[noteIndex].pinned,
            };
          } else {
            throw new Error('Note ID not found');
          }
          // Save updated notes data back to AsyncStorage
          await AsyncStorage.setItem('userNote', JSON.stringify(notes));
          setStoredNotes(notes)
          console.log(`Note ${id} pinned`);
          console.log(notes)
        } catch (error) {
            console.error('Failed to pin note:', error);
        }
      }
      
      useEffect(()=>{
          loadNote()
      }, [])
    return (
        <NoteContext.Provider
            value={{storedNotes, updateNote, deleteNote, pinNote}}
        >
            {children}
        </NoteContext.Provider>
    )
}