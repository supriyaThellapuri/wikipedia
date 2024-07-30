let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    let {
        title,
        link,
        description
    } = result;
    //Div container ->result item
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResultsEl.appendChild(resultItem);
    //Ancohr el ->result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItem.appendChild(resultTitleEl);
    //break
    let titlebreakEl = document.createElement("br");
    resultItem.appendChild(titlebreakEl);
    // an' el->result-url
    let resulturlEl = document.createElement('a');
    resulturlEl.classList.add("result-url")
    resulturlEl.href = link;
    resulturlEl.target = "_blank";
    resulturlEl.textContent = link;
    resultItem.appendChild(resulturlEl);
    //break
    let linkbreakEl = document.createElement("br");
    resultItem.appendChild(linkbreakEl);
    //HTMLParagraphElement -> result-description
    let paragraphEl = document.createElement("p");
    paragraphEl.classList.add("line-description");
    paragraphEl.textContent = description;
    resultItem.appendChild(paragraphEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none")
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }


}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none")
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);