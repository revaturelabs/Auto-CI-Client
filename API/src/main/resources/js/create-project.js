function searchDepend(term){
    console.log("starting " + term);
    if(!(term === "")){
      fetch('https://search.maven.org/solrsearch/select?' + 'q=' + term + '&rows=20&wt=json')
      .then(response => response.json())
      .catch(err => { console.log("found nothing")})
      .then(function(data) {
        // console.log(data.response.docs);
        createDependTable(data.response.docs)
      })
      .catch(err => { console.log("found nothing")});
    }
}

function createDependTable(docs){

  removeAllTableRows("create-form-dependencies-table");

  docs.forEach(doc => {
    // console.log(doc);
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var button = document.createElement("BUTTON");
    td1.innerHTML = doc["repositoryId"];
    td2.innerHTML = doc["id"];
    td3.innerHTML = doc["latestVersion"];
    td3.setAttribute("id", doc["id"]);
    button.innerHTML = "Add";
    button.onclick = function() {addDepend(doc)}
    button.className = "btn btn-sm btn-outline-secondary"
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(button);
    document.getElementById("create-form-dependencies-table").appendChild(tr);
  });
}

function addDepend(doc){
  console.log("trying to add: " + doc.id);
}

function removeAllTableRows(id){
  var node = document.getElementById(id);
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}