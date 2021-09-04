import React, {useState} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { Text,StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { createDeck } from '../actions/index';
 function AddDeck(props){
    const [text, setText] = useState('');
    return (

        <View style={styles.container}>
            
      <TextInput
        style={styles.textInput}
        placeholder="Enter new Deck name here!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
            <TouchableOpacity 
                style={text === "" ?styles.submitDisabled :styles.submit} 
                onPress={()=>
                {
                    const {navigation, createDeck} = props;
                    createDeck({ title: text, questions: [] });
                    navigation.navigate('Decks');
                }
                } 
                disabled={text === ""}
            >
            <Text> Submit</Text>
            </TouchableOpacity>
            {text === "" && <Text style={styles.disabled}>Submit button disabled. Kindly enter your deck name to enable it</Text>}
            
        </View>
        
    )
}

function mapDispatchToProps (dispatch ) {
    return {
      createDeck: bindActionCreators(createDeck, dispatch)
    }
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(AddDeck);
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput:{
      height:50,
      backgroundColor:"#F5F5F8",
      width:"80%",
      borderColor:"#7100D4",
      borderWidth:0.5,
      padding:"2%",
      borderRadius:2,
      marginTop:10,
      marginBottom:10,
  },
  submit:{
      backgroundColor:"#7100D4",
      width:"80%",
      paddingTop:"4%",
      marginTop:30,
      height:50,
      borderRadius:2,
      flexDirection: "row",
      justifyContent: "center",
  },
  submitDisabled:{
      width:"80%",
      paddingTop:"4%",
      marginTop:30,
      height:50,
      borderRadius:2,
      flexDirection: "row",
      justifyContent: "center",
  },
    disabled:{
        marginTop:50,
        color:"#ccc",
        fontSize:12,
        width:"70%",
        textAlign:"center"
    }
  });