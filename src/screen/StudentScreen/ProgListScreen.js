import React from 'react';
import { View, Text, Button , ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import { Spinner } from '../../components/common/Spinner';


class ProgListScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allProg: [],
            isLoading: true
          };
    }

    componentDidMount(){
        firebase.database().ref('/program').once('value', function (snapshot) {
            snapshot.forEach((child)=>{
                var key = child.key;
                this.setProgObject(child.val().uniID,child.val(),key);
            })
            this.setState({
                // allProg: snapshot.val(),
                isLoading: false
            });
        }.bind(this));
    }

    setProgObject(uniID,data,key){
        let d = uniID;
        const ref = firebase.database().ref('/university/'+uniID);
        ref.once('value').then(snapshot=>{
        let uniName = snapshot.val().uniName;
        let newProg = {
            closingDate : data.closingDate,
            description : data.description,
            progName : data.progName,
            uniID : uniName,
            key : key,
        };
            this.setState({
                allProg : this.state.allProg.concat(newProg)
          })
      
        })
      }

    renderProgramme() {
        let d = JSON.stringify(this.state.allProg);
        let g = JSON.parse(d);
        let prv = this.props.navigation;

        const { cardStyle, titleStyle, buttonStyle, buttonTextStyle } = styles;

        return (
            Object.keys(g).map((d, i) => {
                if (g[d].progName.toLowerCase().includes(prv.state.params.searchVAL.toLowerCase())){
                return (  
                    <View style={cardStyle}>
                        <View>
                            <Text style={titleStyle}>{g[d].progName} {'\n'}</Text>

                            <Text>From: {g[d].uniID}</Text>
                            <Text>Description:{g[d].description}</Text>
                            <Text>Closing Date: {g[d].closingDate}</Text>
                        </View>
                        <TouchableOpacity 
                            style={buttonStyle}
                            onPress={() => this.props.navigation.navigate('ProgDetail', {
                                prog_name: g[d].progName,
                                prog_id: g[d].key,
                                uni: g[d].uniID,
                                userID: prv.state.params.userID,
                                description: g[d].description
                                })} 
                        >
                            <Text style={buttonTextStyle}>
                                View
                            </Text>
                        </TouchableOpacity>
                    </View>
                    );
                }
            }
            )
        )
    }

    render() {

        const { headerStyle, bodyStyle, iconContainerStyle, headerTextContainerStyle,
                headerTextStyle } = styles;

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#34495e' }}>
                    <View style={headerStyle}>
                        <View style={iconContainerStyle}>
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Student_Home')}
                            >
                                <View 
                                    style={{ paddingLeft: 13, paddingRight: 13, paddingTop: 5, 
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
                        <View style={headerTextContainerStyle}>
                            <Text style={headerTextStyle}>Programmes</Text>
                        </View>
                        <View style={{ flex: 2 }}></View>
                    </View>
                    <View style={{flex: 9, backgroundColor: '#bdc3c7' }}>
                        <Spinner />
                    </View>
                </View>
            );
        }

        return (
            <View style={{ flex: 1, paddingTop: 20, backgroundColor: '#34495e' }}>
                <View style={headerStyle}>
                    <View style={iconContainerStyle}>
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Student_Home')}
                        >
                            <View 
                                style={{ paddingLeft: 13, paddingRight: 13, paddingTop: 5, 
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
                    <View style={headerTextContainerStyle}>
                        <Text style={headerTextStyle}>Programmes</Text>
                    </View>
                    <View style={{flex: 2}}>

                    </View>
                </View>
                <View style={bodyStyle}>
                <ScrollView>
                {
                    this.renderProgramme()
                }
                </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = {
    headerStyle: {
        backgroundColor: '#34495e', 
        flex: 1, 
        flexDirection: 'row'
    },
    bodyStyle: {
        backgroundColor: '#bdc3c7',
        flex: 9, 
        paddingBottom: 10
    },
    iconContainerStyle: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flex: 2
    }, 
    headerTextContainerStyle: {
        flex: 6, 
        justifyContent: 'center', 
        alignItems: 'center'
    }, 
    headerTextStyle: {
        color: 'white', 
        fontSize: 18
    }, 
    cardStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10, 
        backgroundColor: '#ecf0f1',
        padding: 15, 
        alignItems: 'center',
        borderRadius: 10
    }, 
    titleStyle: {
        fontSize: 20
    }, 
    buttonStyle: {
        backgroundColor: '#2ecc71', 
        borderRadius: 40/2, 
        height: 40, 
        padding: 10, 
        margin: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10
    },
    buttonTextStyle: {
        color: 'white', 
        fontSize: 15, 
        marginLeft: 20, 
        marginRight: 20
    }, 
}

export { ProgListScreen };