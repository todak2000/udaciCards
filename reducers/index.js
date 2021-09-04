import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions/index';

const udacistore = {
  decks: {},
};

function reducer (state = udacistore, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: action.decks,
      };
    case ADD_DECK :
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deck.title] : action.deck
        }
      };
    case ADD_CARD :
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deckTitle] : {
            ...state.decks[action.deckTitle],
            questions: state.decks[action.deckTitle].questions.concat([action.card])
          }
        }
      };
    default :
      return state
  }
}
export default reducer
