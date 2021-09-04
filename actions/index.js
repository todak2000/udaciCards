import { fetchDecks, submitCard, submitDeck } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

function addCard (card, deckTitle) {
  return {
    type: ADD_CARD,
    card,
    deckTitle
  }
}


export function createCard (card, deckTitle) {
  return async (dispatch) => {
    await submitCard(deckTitle, card);
    dispatch(addCard(card, deckTitle));
  }
}

export function createDeck (deck) {
  return (dispatch) => {
    submitDeck(deck.title, deck);
    dispatch(addDeck(deck));
  }
}

export function getDecks () {
  return (dispatch) => {
    return fetchDecks().then((decks)=>{
      dispatch(receiveDecks(decks))
    })
  }
}