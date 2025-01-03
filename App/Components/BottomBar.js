import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, FAB, ToggleButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const ButtomBar = ({selectImage, selectVideo}) => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const [state, setState] = React.useState({ open: false });
  const [value, setValue] = React.useState('left');
  const [status, setStatus] = React.useState('checked');

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const onButtonToggle = value => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
  };
  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: theme.colors.elevation.level2,
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
        
      <Appbar.Action icon="pin" onPress={() => {}} />
      <Appbar.Action icon="clipboard-check" color='green' onPress={() => {}} />
      <Appbar.Action icon="delete" color='red' onPress={() => {}} />
      <FAB.Group
          open={open}
          visible
          icon={open ? 'attachment' : 'plus'}
          style={[
            styles.fab,
            
          ]}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
            {
              icon: 'image',
              label: 'Image',
              onPress: () => selectImage(),
            },
            {
              icon: 'video',
              label: 'Video',
              onPress: () => selectVideo(),
            },
            
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />

        
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
    transform: [{ translateY: -MEDIUM_FAB_HEIGHT / 3 }],
  },
});

export default ButtomBar;