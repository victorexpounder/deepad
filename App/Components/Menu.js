import * as React from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { useNotes } from '../contexts/NoteContext';


const MenuOptions = ({refresh, visible, setVisible, id, pinned}) => {
    const {deleteNote, pinNote} = useNotes()


  const openMenu = () =>{
    setVisible(true)
    console.log('menu opened')
  } ;

  const closeMenu = () => setVisible(false);

  const handleDelete = async()=>{
    await deleteNote(id)
    refresh()
  }
  const handlePin = async()=>{
    await pinNote(id)
    refresh()
  }

  return (
    
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: "50%",
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}></Button>}>
          <Menu.Item leadingIcon="pin" onPress={handlePin}  title={pinned? "Unpin" : "Pin"} />
          <Menu.Item leadingIcon="lock" onPress={() => {}}  title="Lock" />
          <Divider />
          <Menu.Item leadingIcon="delete" titleStyle={{color: 'red'}} onPress={handleDelete} title="Delete" />
        </Menu>
      </View>
    
  );
};

export default MenuOptions;