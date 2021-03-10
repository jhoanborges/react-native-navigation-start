import React, {useEffect} from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import FooterTabs from '../Partials/FooterTabs';
import {Container, Content} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

function Screen() {

  const navigation = useNavigation();
console.log(navigation)
  return (
    <Container>
      <Content contentContainerStyle={styles.MainContainer}>
        <Text style={{fontSize: 23}}> Screen 1 </Text>
        <Button
          transparent
          onPress={ () =>  navigation.dispatch(DrawerActions.toggleDrawer()) }
          title="Open drawer"
        />
      </Content>
      <FooterTabs />
    </Container>
  );
}


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Screen
