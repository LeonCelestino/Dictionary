const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const submitButton = document.querySelector("#FindWord");

submitButton.addEventListener("submit", async function (e) {
    e.preventDefault();
    document.querySelector("#Dictionary").replaceChildren();

    const word = document.querySelector("#Word").value;
    const data = await fetch_api(URL + word);
    
    dictionaryParent();
    createUppermostListItem(data, speechs);
})

function dictionaryParent () {
    const frag = new DocumentFragment();
    const dictionary = document.querySelector("#Dictionary");

    const listContainer = document.createElement("ul");
    listContainer.classList.add("l__list-container");
    listContainer.id = "ListContainer";
    
    frag.append(listContainer);
    dictionary.append(frag);

}

function speechs(data) {
    const frag = new DocumentFragment();
    const speech = document.createElement("h3");
    speech.classList.add("m__md-header");

    speech.textContent = data;
    frag.append(speech);

    return frag;
}

function createUppermostListItem(data, speechHeader) {
    const frag = new DocumentFragment();
    const container = document.querySelector("#ListContainer");
    
    data.forEach(d => {
        const li = document.createElement("li");
        li.classList.add("l__uppermost-lists");
        li.setAttribute("data-definition", d.partOfSpeech);
        li.append(speechHeader(d.partOfSpeech));
        frag.append(li);
    });

    container.append(frag);
    
}

async function fetch_api(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response)
        }
        const data = await response.json();

        return data[0].meanings;
    } catch (error) {
        throw new Error(`Couldn't complete task due to: ${error}`);
    }

}