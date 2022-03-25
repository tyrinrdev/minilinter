let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

let overusedWords = ['really', 'very', 'basically'];

let unnecessaryWords = ['extremely', 'literally', 'actually' ];

// Split the story into its individual constituent words.
let storyWords = story.split(' ');

// console.log(storyWords.length);

let betterWords = storyWords.filter(word => {
  if (!unnecessaryWords.includes(word)) {
    return word;
  }
});

// Create a factory function that takes in no parameters and returns object that holds information about the story being edited.
const betterWordsInfo = () => {
  return {
    // Initialize word count and sentence count. We will update them with setter methods later on.
    _wordCount: undefined,
    _sentenceCount: undefined,

    // Getter and setter methods to access and update the wordCount property.
    get wordCount() {
      return this._wordCount;
    },
    set wordCount(arrayOfWords) {
      this._wordCount = arrayOfWords.length;
    },

    // Getter and setter methods to access and update the sentenceCount property.
    get sentenceCount() {
      return this._sentenceCount;
    },
    // Takes in array of words, then counts and updates number of sentences.
    set sentenceCount(arrayOfWords) {
      let sentences = 0;
      arrayOfWords.forEach(word => {
        if (word[word.length - 1] === '.' || word[word.length - 1] === '!') {
          sentences += 1;
        }
      })
      this._sentenceCount = sentences;
    },

  }
};

// Create a function that takes in an object that holds the information about our story, the input we would like to check and an array of overused words. It then adds information about overused words to our story object.
const getOverusedWords = (object, input, overused) => {
  object['overusedWords'] = {};
  for (i = 0; i < overused.length; i++) {
    object.overusedWords[overused[i]] = {};
    object.overusedWords[overused[i]].occurences = 0;
    object.overusedWords[overused[i]].locations = [];
  }

  for (j = 0; j < input.length; j++) {
    for (i = 0; i < overused.length; i++) {
      if (input[j] === overusedWords[i]) {
        object.overusedWords[overused[i]].occurences += 1;
        object.overusedWords[overused[i]]['locations'].push(j);
      }
    }
  }
}

// Create a story object using the factory function we defined earlier on. Set the relevant properties and get overused words.
let betterStory = betterWordsInfo();
betterStory.wordCount = betterWords;
betterStory.sentenceCount = betterWords;
getOverusedWords(betterStory, betterWords, overusedWords);

// Create a function that takes in a story object and prints all relevant information about it to the console.
const getInfo = (storyObject) => {
  console.log(`Word Count: ${storyObject.wordCount} \nSentence Count: ${storyObject.sentenceCount} \n\nOverused Words:`);

  for (key in storyObject.overusedWords) {
    console.log(`You used ${key} ${storyObject.overusedWords[key]['occurences']} time(s)).`);
  }
}

getInfo(betterStory);

const finalString = betterWords.join(' ');

console.log(`\nFinal Piece:\n${finalString}`);
