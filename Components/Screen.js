import React, {Component} from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import FooterTabs from '../Partials/FooterTabs';
import {Container, Content} from 'native-base';
import fetchUserData from '../Redux/Services/fetchUserData';
import {withNavigation} from 'react-navigation';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Screen extends Component {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  async componentDidMount() {
    const {fetchUserData} = this.props;
    fetchUserData();
    setTimeout(() => {
      console.log(this.props.userdata.userdata);
    }, 3000);
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.MainContainer}>
          <Text style={{fontSize: 23}}> Screen 1 </Text>
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

function mapStateToProps(state) {
  return {
    userdata: state.userdata,
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserData: fetchUserData,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(Screen));
