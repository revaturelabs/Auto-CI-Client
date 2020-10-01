
//maven
function searchDepend(term){
    console.log("starting " + term);
    if(!(term === "")){
      fetch('https://search.maven.org/solrsearch/select?' + 'q=' + term + '&rows=20&wt=json')
      .then(response => response.json())
      .catch(err => { console.log("found nothing")})
      .then(function(data) {
        // console.log(data.response.docs);
        createDependTable(data.response.docs);
      })
      .catch(err => { console.log("found nothing")});
    }
}

//node

function createDependTable(docs){

  removeAllTableRows("create-form-dependencies-table");
  let count = 0;
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
    button.className = "btn btn-sm btn-outline-secondary";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(button);

    if(count < 5){
      document.getElementById("create-form-dependencies-table").appendChild(tr);
      count++;
    } else {
      document.getElementById("create-form-dependencies-table-more").appendChild(tr);
    }
  });
}

function addDepend(doc){
  addDependendieToList(doc.id);
  console.log("trying to add: " + doc.id);
}

function removeAllTableRows(id){
  var node = document.getElementById(id);
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

function changeProjectDetails(id){
  console.log(id);
  if(id === "maven"){
    $('#create-account-details-maven-header').collapse('show');
    $('#create-account-details-maven').collapse('show');
    $('#create-account-details-node-header').collapse('hide');
    $('#create-account-details-node').collapse('hide');
  }

  if(id === "node"){
    $('#create-account-details-node-header').collapse('show');
    $('#create-account-details-node').collapse('show');
    $('#create-account-details-maven-header').collapse('hide');
    $('#create-account-details-maven').collapse('hide');
  }
}

function deleteDependencieFromList(id){
  console.log(id);
  document.getElementById(id).remove();
}

function addDependendieToList(id){
  showAddedDependList();
  var button = document.createElement("BUTTON");
  var i = document.createElement("i");
  i.className = "far fa-times-circle";
  button.classList = "create-account-btn";
  button.innerHTML = id + " ";
  button.onclick = function() {deleteDependencieFromList(id)}
  button.appendChild(i);
  button.setAttribute("type","button");
  button.id = id;
  document.getElementById("form-account-added-dependencies").appendChild(button);
}

function showAddedDependList(){
  $('#form-account-added-dependencies-header').collapse('show');
  $('#form-account-added-dependencies').collapse('show');
}