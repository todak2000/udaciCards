// import AsyncStorage from '@react-native-async-storage/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY, formatResults, getItemByKey } from './data'

export function fetchDecks ( ){
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(formatResults)
}

export function submitDeck (key, deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [key]: deck
  }));
}

export async function submitCard (key, card) {
  const deck = await getItemByKey(key);
  deck.questions.push(card);
  submitDeck(key, deck);
}