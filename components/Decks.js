import React, {Component }  from 'react'
import { Text,StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import { getDecks } from '../actions/index';


class Decks extends Component {
  componentDidMount () {
    const { getDecks} = this.props;
    getDecks();
  }

  
      
  renderDeckCard = ({ item, index }) =>{
    const { navigation } = this.props;
    return (
        <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('Deck Detail', {title: item.title, cards: item.questions.length})}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.line}></View>
          {item.questions.length > 1 ?  
          (<Text style={styles.count}>{item.questions.length} Cards</Text>)
          :
          (<Text style={styles.count}>{item.questions.length} Card</Text>)
          }
        </TouchableOpacity>
    )
  }

  render() {
    const { decks, navigation } = this.props;
    return (
      <View style={styles.container}>
          <FlatList
          data={Object.values(decks)}
          keyExtractor={(item, index) => `${index}-${item.title}`}
          renderItem={this.renderDeckCard} />
      </View>
  )
  }
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft:"10%",
      paddingTop:"15%",
    },
    card:{
      width:"80%",
      backgroundColor:"#AA00FF",
      elevation: 1,
      borderRadius: 10,
      padding:"5%",
      marginTop:"2%",
      marginBottom:"2%",
    },
    title:{
      textAlign:'center',
      fontSize:20,
      color:"#fff",
    },
    count:{
      textAlign:'center',
      fontSize:15,
      color:"#fff",
    },
    line:{
      width:"100%",
      height:0.5,
      marginBottom:"5%",
      marginTop:"2%",
      backgroundColor:"#fff",
    }
  });

  function mapStateToProps (state) {
    return {
      decks: state.decks
    }
  }
  
  function mapDispatchToProps (dispatch ) {
    return {
      getDecks: bindActionCreators(getDecks, dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Decks);