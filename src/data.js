// const words = ["APPLE"];

// export default words;

// export function addWord(word) {
//   words.push(word);
// }

const dictionary = {
  FRUIT: ["APPLE", "AVOCADO", "ORANGE", "GUAVA"],
  MOVIES: ["STAR WARS", "LORD OF THE RINGS", "FINDING NEMO", "JAMES BOND"],
  COLORS: ["RED", "GREEN", "BLUE", "BLACK"]
};

export default dictionary;

export const completedWords = [];

export function addCompletedWord(word, status) {
  completedWords.push([word, status]);
}
export function addTheme(theme) {
  dictionary[theme] = [];
}

export function addWord(theme, word) {
  dictionary[theme].push(word);
}
