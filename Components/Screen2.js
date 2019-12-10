import React, {Component} from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import FooterTabs from '../Partials/FooterTabs';
import {Container, Content} from 'native-base';

class Screen2 extends Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.MainContainer}>
          <Text style={{fontSize: 23}}> Screen 2 </Text>

          <Button
            transparent
            onPress={this.toggleDrawer.bind(this)}
            title="Go to drawer"
          />
        </Content>
        <FooterTabs />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Screen2;


