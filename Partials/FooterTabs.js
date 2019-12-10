import React, {Component} from 'react';
import {Footer, FooterTab, Button, Icon} from 'native-base';
import {withNavigation} from 'react-navigation';
import {NavigationEvents} from 'react-navigation';

class FooterTabs extends Component {
  constructor() {
    super();
    this.state = {
      active: '',
    };
  }

  setActiveRoute() {
    this.setState({
      active: this.props.navigation.state.routeName,
    });
  }

  render() {
    return (
      <Footer>
        <NavigationEvents onDidFocus={() => this.setActiveRoute()} />

        <FooterTab>
          <Button
            active={this.state.active === 'Home' ? true : false}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}>
            <Icon active name="apps" />
          </Button>
          <Button
            active={this.state.active === 'Screen2' ? true : false}
            onPress={() => {
              this.props.navigation.navigate('Screen2');
            }}>
            <Icon name="camera" />
          </Button>
          <Button>
            <Icon name="navigate" />
          </Button>
          <Button>
            <Icon name="person" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default withNavigation(FooterTabs);
