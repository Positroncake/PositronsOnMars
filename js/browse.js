const sortby = document.getElementById("sortby");
const search = document.getElementById("search");
const results = document.getElementById("results");

const min = document.getElementById("min");
const max = document.getElementById("max");

let sort = "Newest";
let cate = "All";

function show(cate2) {
    cate = cate2;
}

function sortBy(sort2) {
    sortby.innerHTML = "Sort by: " + sort2;
    sort = sort2;
}

function updateResults() {
    searchItem();
}

function searchItem() {
    results.innerHTML = 'Results for "' + search.value + '"'
}
