import React, {useEffect} from 'react';
import {StyleSheet, Text, Button} from 'react-native';
import FooterTabs from '../Partials/FooterTabs';
import {Container, Content} from 'native-base';
import fetchUserData from '../Redux/Services/fetchUserData'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';



function Screen({ navigation }) {

  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      const {fetchUserData} = fetchUserData;
      fetchUserData();
      setTimeout(() => {
        //console.log(this.props.userdata.userdata);
      }, 3000);

    }
    
  }, []);

  return (
<Container>
<Content contentContainerStyle={styles.MainContainer}>
  <Text style={{fontSize: 23}}> Screen 1 </Text>
  <Button
    transparent
   // onPress={this.toggleDrawer.bind(this)}
    title="Go to drawer"
  />
</Content>
<FooterTabs />
</Container>

  );
}

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


  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
    

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen);