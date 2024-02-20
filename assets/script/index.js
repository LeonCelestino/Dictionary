const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const submitButton = document.querySelector("#FindWord");

/* DOM */
const container = (frags) => {
    const frag = document.createDocumentFragment();
    const ul = document.createElement("ul");
    ul.classList.add("js-container");
    ul.classList.add("l__dic-container");
    frag.appendChild(ul);

    return frag;
}

const speechContainer = (data) => {
    const frag = document.createDocumentFragment();
    
    data?.forEach(data => {
        const newDOM = `
            <li>
                <h3>${data.partOfSpeech}</h3>
                <ul>
                    ${
                        data.definitions.map((d) => {
                            return `
                                <li> 
                                    <h4>${d.definition}</h4>
                                    ${
                                        d.example ? `<p>${d.example}</p>` : ""
                                    }
                                </li>
                            `
                        }).join("")
                    }
                </ul>
            </li>
        `
        const context = document.createRange().createContextualFragment(newDOM);

        frag.appendChild(context);
    })

    return frag;
}

/* Events */

submitButton.addEventListener("submit", async function (e) {
    e.preventDefault();
    document.querySelector("#Dictionary").replaceChildren();

    const word = document.querySelector("#Word").value;
    const data = await fetch_api(URL + word);
    document.querySelector("#Dictionary").appendChild(container());

    const ul = document.querySelector(".js-container");
    
    ul.appendChild(speechContainer(data));
    


})

/* Fetch / API */
async function fetch_api(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response)
        }
        const data = await response.json();
        console.log(data)
        const meaningsObj = data.flatMap(({meanings}) => meanings);
        
        const arr = meaningsObj.map((d) => ({
            partOfSpeech: d.partOfSpeech,
            definitions: d.definitions,
            synonyms: d.synonyms
        }));
        return arr;
    } catch (error) {
        throw new Error(`Couldn't complete task due to: ${error}`);
    }

}

