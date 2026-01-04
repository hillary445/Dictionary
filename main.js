//Function to input word and display in the ul
const button = document.getElementById('submit')

button.addEventListener('click', fetchMeaning)

//display definition, audio, synonym, prononciation
function fetchMeaning(words){
    const list = document.getElementById('ul')
    words.foreach(word =>{
        const li = document.createElement('li')


    })

}





//asynchronously fetched the word data from an API using async/await
async function getWordInfo(){
    try {
    const word = document.getElementById('word').value.toLowerCase();
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
    if(!response.ok){
        throw new error('Could not fetch resource');

    }
    const data = await response.json()
    console.log("Word:", data[0].word);
    console.log("Definition:", data[0].meanings[0].definitions[0].definition);
//Added a way to handle errors gracefully by using catch and creating a list of 
//errors present
    } catch(error){

        const list = document.querySelector("#ul")
        const errorMessage = document.createElement("li")

        errorMessage.textContent = 'Failed to load word data. Please try again';

        list.appendChild(errorMessage);

        console.error('Failed fetching word data:', error.errorMessage)
    }
}
getWordInfo()