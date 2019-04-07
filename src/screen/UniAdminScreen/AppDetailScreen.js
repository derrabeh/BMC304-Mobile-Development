import React from 'react';
import { View, Text, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import { Header, Input } from '../../components/common';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';


class AppDetails extends React.Component {
    static navigationOptions = {
        title: 'App_Detail'
    };

    chgApplicantStatus(status,key){
      console.log(status,key,'www')
      try {
        var applicant = firebase.database().ref('applications/'+key);
        applicant.update({ status: status});
        ToastAndroid.show('Status Updated!', ToastAndroid.SHORT);
        setTimeout(()=>{
          this.props.navigation.navigate('Uni_Home')
        },1000);

      }
      catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }

    }

    getScore(){
      // let d = this.props.navigation;
      // var score_ref = firebase.database().ref('qualificationObtained');

      // score_ref
      // .orderBy("userID")
      // .equalTo(d.state.params.userID)
      // .once("value", function(snapshot) {
      //   console.log(snapshot.val(),'wxd');
      // });

    }
    btnStatus(){
      let p = this.props.navigation;
      console.log(p.state.params.status,'hhh');
        if(p.state.params.status === 'SUCCESSFUL'){
        return (
            <Text>
            </Text>
        )
        }
        else{
          if(p.state.params.status == 'UNSUCCESSFUL'){
            return(
              <View>
              <Button title="Approve" color="green" onPress={() => this.chgApplicantStatus('SUCCESSFUL',p.state.params.key)}/>
              {/* <Button title="Decline" color="red" onPress={() => this.chgApplicantStatus('UNSUCCESSFUL',p.state.params.key)}/> */}
          </View>
            )
          }
          else{
          }
          return(
          <View>
              <Button title="Approve" color="green" onPress={() => this.chgApplicantStatus('SUCCESSFUL',p.state.params.key)}/>
              <Button title="Decline" color="red" onPress={() => this.chgApplicantStatus('UNSUCCESSFUL',p.state.params.key)}/>
          </View>
          )
        }
}
 

    render() {
      let d = this.props.navigation;
      const { headerStyle, bodyStyle, containerStyle, iconContainerStyle,
        nameStyle, nameContainerStyle, textGroupContainerStyle, 
        textGroupStyle } = styles;

      return (

        <View style={containerStyle}>
        <View style={headerStyle}>
            <View style={iconContainerStyle}>
                <TouchableOpacity 
                onPress={() => this.props.navigation.push('App_Prog',{ 
                          prog_id : d.state.params.prog_id,
                          prog_name : d.state.params.prog_name, 
                          userID: d.state.params.userID })}
                >
                    <View 
                        style={{ paddingLeft: 13,
                                paddingRight: 13,
                                paddingTop: 5, 
                                paddingBottom: 5 }}
                    >
                        <Icon
                            name='chevron-left'
                            type='font-awesome'
                            color='white'
                            size={28}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={nameContainerStyle}>
                <Text style={nameStyle} >Applicant Details:{'\n'}{d.state.params.applicant}</Text>
            </View>
            
        </View>
        <View style={bodyStyle}>
          <View style={textGroupContainerStyle}>
            <View style={textGroupStyle}>
              <Text style={{color: 'grey', marginBottom: 10}}>Applicant: </Text>
              <Text style={{fontSize: 18, textAlign: 'center'}}>{d.state.params.applicant}</Text>
            </View>
            <View style={textGroupStyle}>
              <Text style={{color: 'grey', marginBottom: 10}}>Status: </Text>
              <Text style={{fontSize: 18}}>{d.state.params.status}</Text>
            </View>
            <View style={textGroupStyle}>
              <Text style={{color: 'grey', marginBottom: 10}}>Apply Programme: </Text>
              <Text style={{fontSize: 18}}>{ d.state.params.prog_name}</Text>
            </View>
          </View>

          <View style={styles.btnStatus}>
            {this.btnStatus()}
          </View>
          
          {/* {this.renderButton(this.state.approveStatus)} */}
        </View>
        
    </View>

        // <View>
        //   <Header headerText={'Applicant Details'} navigation={this.props.navigation} />
        //   <View style={styles.container}>
        //   <Text>Applicant Details {'\n'}</Text>

        //       <Text>Applicant: {d.state.params.applicant}{'\n'}</Text>
        //       <Text>Status: {d.state.params.status}{'\n'}</Text>
        //       <Text>Apply Programme: {d.state.params.prog_name}{'\n'}</Text>
        //       {/* <Text>Key : {d.state.params.key}</Text> */}
        //       <Text>{'\n'}</Text>
        //       <View>
        //         {this.btnStatus()}
        //         <Text>{'\n'}</Text>
        //       </View>
        //       <Button title="Back" onPress={() => this.props.navigation.push('App_Prog',{ 
        //         prog_id : d.state.params.prog_id,
        //         prog_name : d.state.params.prog_name, 
        //         userID: d.state.params.userID })} />
        //   </View>
        // </View>
      );
    }
}
const styles = {
  containerStyle: {
    backgroundColor: '#34495e', 
    paddingTop: 20, 
    flex: 1
  },
  headerStyle: {
    flex: 3, 
    backgroundColor: '#34495e',
  }, 
  bodyStyle: {
    flex: 7, 
    backgroundColor: 'white', 
    paddingLeft: 40, 
    paddingRight: 40
  }, 
  iconContainerStyle: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    flex: 3, 
    alignItems: 'center'
  }, 
  nameStyle: {
    fontSize: 25, 
    color: 'white'
  }, 
  nameContainerStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    flex: 7, 
  },
  buttonStyle: {
    backgroundColor: '#2ecc71', 
    borderRadius: 40 / 2, 
    height: 40, 
    padding: 10, 
    margin: 5, 
    justifyContent: 'center', 
    alignItems: 'center'
    },  
  buttonStyle2: {
      backgroundColor: '#e74c3c', 
      borderRadius: 40 / 2, 
      height: 40, 
      padding: 10, 
      margin: 5, 
      justifyContent: 'center', 
      alignItems: 'center'
  }, 
  buttonTextStyle: {
      color: 'white', 
      fontSize: 15
  }, 
  buttonGroupStyle: {
    alignItems: 'stretch', 
    justifyContent: 'center', 
    flex: 3, 
    marginBottom: 20
  }, 
  textGroupContainerStyle: {
    flex: 7, 
    paddingTop: 15, 
    paddingBottom: 15, 
    justifyContent: 'center'
  }, 
  textGroupStyle: {
    marginBottom: 25
  },
  btnStatus : {
    marginBottom : 20
  }
};

export { AppDetails };