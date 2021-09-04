// import AsyncStorage from '@react-native-async-storage/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = 'udaciCards';

const data = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

function setData () {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  return data;
}

export function formatResults (res) {
  return res === null ? setData() : JSON.parse(res);
}

export async function getItemByKey(key) {
  const decks = await AsyncStorage.getItem(STORAGE_KEY)
    .then(formatResults);
  return  decks[key]
}