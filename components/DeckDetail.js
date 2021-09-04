import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

function DeckDetail(props){

    console.log(props)
    const {navigation, deck} = props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{props.route.params.title}</Text>
        {props.route.params.cards > 1 ? (
          <Text>{props.route.params.cards} Cards</Text>
        ) : (
          <Text>{props.route.params.cards} Card</Text>
        )}
        <TouchableOpacity
          style={styles.add}
          onPress={() =>
            navigation.navigate("Add Card", {title: props.route.params.title})
          }
        >
          <Text>Add Card/Question</Text>
        </TouchableOpacity>
        {props.route.params.cards > 1 ? 
        <TouchableOpacity
        style={styles.start}
        onPress={() =>
          navigation.navigate("Start Quiz", {title: props.route.params.title})
        }
      >
        <Text style={styles.startText}>Start Quiz</Text>
      </TouchableOpacity>
        :
        <Text style={styles.readd}>Kindly Add new Card, to start a quiz. You need atleast 2 cards to play</Text>
        }
      </View>
    );
  }
// }


function mapStateToProps(state, props) {
  return {
    deck: state.decks[props.route.params.title],
  };
}

export default connect(mapStateToProps)(DeckDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    backgroundColor: "#AA00FF",
    width: "80%",
    padding: "3%",
    marginTop: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  delete: {
    backgroundColor: "#f9f9f9",
    width: "80%",
    padding: "3%",
    marginTop: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  start: {
    backgroundColor: "#7100D4",
    width: "80%",
    padding: "3%",
    marginTop: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  startText: {
    color: "#fff",
  },
  deleteText: {
    color: "#7100D4",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
  },
  readd:{
    marginTop:30,
    color:"#ccc",
    textAlign:"center",
    fontSize:13,
    width:"70%"
  }
});