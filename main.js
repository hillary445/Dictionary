//asynchronously fetched the word data from an API using async/await
async function getWordInfo(word){
    try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    console.log("The word is :"+ data[0].word)
//Added a way to handle errors gracefully by using catch and creating a list of 
//errors present
    } catch(error){

        const errorList = document.querySelector("#ul")
        const errorMessage = document.createElement("li")

        errorMessage.textContent = 'Failed to load word data. Please try again';

        errorList.appendChild(errorMessage);

        console.error('Failed fetching word data:', error)
    }
}
getWordInfo('hello')