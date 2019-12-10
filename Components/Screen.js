import React, {Component} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

class Screen extends Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{fontSize: 23}}> Screen 1 </Text>

        <Button
          transparent
          onPress={this.toggleDrawer.bind(this)}
          title="Go to drawer"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});

export default Screen;
