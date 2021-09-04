import React, {useState} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { Text,StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { createCard } from '../actions/index';
 function AddCard(props){
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    return (

        <View style={styles.container}>
            
      <TextInput
        style={styles.textInput}
        placeholder="Enter new Question here"
        onChangeText={question => setQuestion(question)}
        defaultValue={question}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Provide the answer here"
        onChangeText={answer => setAnswer(answer)}
        defaultValue={answer}
      />
            <TouchableOpacity 
                style={question === "" || answer === "" ?styles.submitDisabled :styles.submit} 
                onPress={()=>
                {
                    const {navigation, createCard} = props;
                    createCard({ question, answer }, props.route.params.title);
                    navigation.navigate('Decks');
                }
                } 
                disabled={question === "" || answer === ""}
            >
            <Text> Submit</Text>
            </TouchableOpacity>
            {question === "" || answer === "" && <Text style={styles.disabled}>Submit button disabled. Kindly enter your question and answer appropriately</Text>}
            
        </View>
        
    )
}

function mapDispatchToProps (dispatch ) {
    return {
      createCard: bindActionCreators(createCard, dispatch)
    }
  }
  
  export default connect(
    null,
    mapDispatchToProps
  )(AddCard);
  
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