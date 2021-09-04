import React, {useState} from 'react'
import { Text,StyleSheet, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';



function Quiz(props){
    const [getAnswer, setGetAnswer] = useState(false);
    const [didUserPickAnswer, setDidUserPickAnswer] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [nextState, setNextState] = useState(true);
    const [counter, setCounter] = useState(1);
    const [indexx, setIndexx] = useState(0);
    const [score, setScore] = useState(0);
    const [scoreState, setScoreState] = useState(false);
    const {navigation, deck} = props;
    
    const getSolution = (indexx)=>{
        console.log(indexx)
        if (counter-1 === indexx){
            getAnswer ? setGetAnswer(false): setGetAnswer(true)
        }

    }
    const getNextQuestion = (indexx)=>{
        setCounter(counter+1)
        setIndexx(indexx+1)
        setGetAnswer(false)
        setDidUserPickAnswer(false)
        if (counter == Object.keys(deck).length-1){
            setNextState(false)
            setScoreState(true)
        }

    }
    return (
        <View style={styles.container}>
 
            {!showResult && <Text style={styles.nextText}>{counter} of {Object.keys(deck).length} Questions</Text>}
            {!showResult && <Text style={styles.toggleText}>Click on the card to Toggle Answer</Text>}
            {Object.keys(deck).map((q, index) => {
                return(
                    index == indexx &&
                    (   
                        <View key={indexx} style={styles.innerView}>
                            {
                                !showResult &&
                                <TouchableOpacity style={getAnswer ? styles.cardAnswer:styles.card} onPress={()=>getSolution(indexx)}>
                                <View style={getAnswer ? styles.cardAnswer:styles.card}  >
                                    <Text style={getAnswer ? styles.titleAnswer: styles.title}>{getAnswer ? deck[indexx].answer : deck[indexx].question}</Text>
    
                                </View>
                                </TouchableOpacity>
                            }
                            {getAnswer && didUserPickAnswer && !showResult &&
                            <View style={styles.confirm}>
                            <Text style={styles.recorded}>Answer Recorded</Text>
                            </View>
                            }
                            {getAnswer && !didUserPickAnswer  &&
                            
                            <View style={styles.checkAnswer}>
                               <TouchableOpacity 
                               onPress={() =>
                                    {
                                        setDidUserPickAnswer(true);
                                        setScore(score+1)
                                    }
                                }> 
                                    <Text style={styles.gotit}>I got it</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                               onPress={() =>
                                {
                                    setDidUserPickAnswer(true);
                                    // setScore(score-1)
                                }
                                }> 
                                    <Text style={styles.missed}>Oh! I missed</Text>
                                </TouchableOpacity>
                            </View> 
                            
                            }
                            {
                                nextState  && getAnswer && didUserPickAnswer &&
                                <TouchableOpacity
                                style={styles.next}
                                onPress={() =>
                                    getNextQuestion(indexx)
                                }
                                >
                                <Text style={styles.nextText}>Next Question</Text>
                            </TouchableOpacity>
                            }
                            {
                                showResult  && getAnswer &&
                                <View >
                                    <View style={styles.scoreHeader}>
                                        <Text style={styles.nextText}>Scores</Text>
                                    </View>
                                    <View style={styles.scoreView}>
                                        <Text style={styles.scoreText}>{(score/Object.keys(deck).length).toFixed(2)*100} %</Text>
                                    </View>
                                    <TouchableOpacity style={styles.home} onPress={()=>navigation.navigate('Decks')}>
                                        <Text>Back to Decks</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.home} onPress={()=>navigation.navigate("Deck Detail", {title:props.route.params.title, cards: Object.keys(deck).length})}>
                                        <Text>Restart {props.route.params.title} Quiz</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                scoreState && counter !== 1 && getAnswer && didUserPickAnswer && !showResult &&
                                <TouchableOpacity
                                    style={styles.previous}
                                    onPress={() =>
                                        setShowResult(true)
                                    }
                                    >
                                    <Text style={styles.previousText}>Results</Text>
                                </TouchableOpacity>
                            }
                            
                        </View>

                    )
                )
            
            }
            )}
            
        </View>
    )
}

function mapStateToProps(state, props) {
    return {
      deck: state.decks[props.route.params.title].questions,
      title: props.route.params.title,
    };
  }

  export default connect(mapStateToProps)(Quiz);
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center",
      justifyContent: 'center',
    },
    card:{
        width:"80%",
        backgroundColor:"#DFC0FA",
        elevation: 1,
        justifyContent:"center",
        borderRadius: 10,
        padding:"5%",
        flexDirection:"row",
        marginTop:"5%",
        marginBottom:"5%",
      },
      cardAnswer:{
        width:"80%",
        backgroundColor:"#EFB60E",
        elevation: 1,
        justifyContent:"center",
        borderRadius: 10,
        padding:"5%",
        flexDirection:"row",
        marginTop:"5%",
        marginBottom:"5%",
      },
      next: {
        backgroundColor: "#f9f9f9",
        padding: "3%",
        marginTop: 20,
        textAlign:"center",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
      },
      previous: {
        backgroundColor: "#ccc",
        padding: "3%",
        marginTop: 20,
        textAlign:"center",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
      },
     nextText: {
        color: "#7100D4",
      },
      recorded: {
        color: "#ccc",
      },
      previousText: {
        color: "#232323",
      },
      checkAnswer:{
        flexDirection: "row",
        justifyContent: "space-between",
      },
      confirm:{
        flexDirection: "row",
        justifyContent: "center",
      },
      gotit:{
          color:"green"
      },
      missed:{
          color:"red"
      },
      scoreText:{
        fontSize:50,
        textAlign: "center",
        color:"#fff",
      },
      scoreView:{
        backgroundColor: "#7100D4",
        width:200,
        height:200,
        borderRadius:100,
        alignItems: "center",
        justifyContent: 'center',
      },
      scoreHeader:{
        width:"100%",
      alignItems: "center",marginBottom:30,
      justifyContent: 'center',
      },
      home: {
        backgroundColor: "#f9f9f9",
        padding: "3%",
        marginTop: 50,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
      },
      toggleText: {
        color: "#7100D4",
        marginTop:50,
      },
  });