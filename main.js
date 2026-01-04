//Function to input word and display in the ul
const button = document.getElementById('submit').addEventListener('click', getWordInfo)

//display definition, synonym, prononciation
function fetchMeaning(words){

    const list = document.getElementById('ul')
    list.innerHTML = "" //clears the previous results

    words.forEach(word =>{

    const definition = document.createElement('li');
    definition.textContent =
      word.meanings[0].definitions[0].definition;
    list.appendChild(definition);

    const synonym = document.createElement('li');
    synonym.textContent =
      word.meanings[0].definitions[0].synonyms?.join(', ') || "No synonyms";
    list.appendChild(synonym);

    const pronunciation = document.createElement('li');
    pronunciation.textContent =
      word.phonetics[0]?.text || "No pronunciation";
    list.appendChild(pronunciation);


    const audioUrl = word.phonetics.find(p => p.audio)?.audio;
    if (audioUrl) {
    const audioLi = document.createElement('li');
    const audio = document.createElement('audio');

    audio.controls = true;
    audio.src = audioUrl;

    audioLi.appendChild(audio);
    list.appendChild(audioLi);
}
  });
}






//asynchronously fetched the word data from an API using async/await
async function getWordInfo(){
    try {
    const input = document.getElementById('word');
        if (!input){
        throw new Error('Input element not found')
        }
        const word = input.value.trim().toLowerCase();
    
    if(!word){
        throw new Error('No word entered');

    }
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!response.ok){
        throw new Error('Word not found')
    }

    const data = await response.json()
    fetchMeaning(data)
//Added a way to handle errors gracefully by using catch and creating a list of 
//errors present
    } catch(error){

        const list = document.querySelector("#ul")
        const errorMessage = document.createElement("li")

        errorMessage.textContent = 'Failed to load word data. Please try again';

        list.appendChild(errorMessage);

        console.error('Failed fetching word data:', error.message)
    }
}