let searchSwitch;

// Search 
function searchDepend(term) {
  // check status of radio button, maven or node
  if (searchSwitch === 'maven') {
    searchMaven(term);
  } else if (searchSwitch === 'node') {
    searchNode(term);
  }
}

//maven
function searchMaven(term) {
  console.log("starting " + term);
  if (!(term === "")) {
    fetch('https://search.maven.org/solrsearch/select?' + 'q=' + term + '&rows=20&wt=json')
      .then(response => response.json())
      .catch(err => { console.log("found nothing") })
      .then(function (data) {
        // console.log(data.response.docs);
        createDependTableMaven(data.response.docs);
      })
      .catch(err => { console.log("found nothing") });
  }
}

//node
function searchNode(term) {
  console.log("starting " + term);
  if (!(term === "")) {
    fetch('http://registry.npmjs.com/-/v1/search?' + 'text=' + term + '&size=20')
      .then(response => response.json())
      .catch(err => { console.log("found nothing") })
      .then(function (data) {
        console.log(data);
        createDependTableNode(data.objects);
      })
      .catch(err => { console.log("found nothing") });
  }
}

function createDependTableMaven(docs) {

  removeAllTableRows("create-form-dependencies-table");
  let count = 0;
  docs.forEach(doc => {
    // console.log(doc);
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let button = document.createElement("BUTTON");
    td1.innerHTML = doc["repositoryId"];
    td2.innerHTML = doc["id"];
    td3.innerHTML = doc["latestVersion"];
    td3.setAttribute("id", doc["id"]);
    button.innerHTML = "Add";
    button.onclick = function () { addDepend(doc) }
    button.className = "btn btn-sm btn-outline-secondary";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(button);

    if (count < 5) {
      document.getElementById("create-form-dependencies-table").appendChild(tr);
      count++;
    } else {
      document.getElementById("create-form-dependencies-table-more").appendChild(tr);
    }
  });
}

function createDependTableNode(objects) {

  removeAllTableRows("create-form-dependencies-table");
  let count = 0;
  objects.forEach(obj => {
    // console.log(obj);
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let button = document.createElement("BUTTON");
    if (!obj.package.links["repository"]) {
      td1.innerHTML = obj.package.links["npm"];
    } else {
      td1.innerHTML = obj.package.links["repository"];
    }
    td2.innerHTML = obj.package["name"];
    td3.innerHTML = obj.package["version"];
    obj['id'] = obj.package['name'];
    td3.setAttribute("id", obj.id);
    button.innerHTML = "Add";
    button.onclick = function () { addDepend(obj) }
    button.className = "btn btn-sm btn-outline-secondary";
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(button);

    if (count < 5) {
      document.getElementById("create-form-dependencies-table").appendChild(tr);
      count++;
    } else {
      document.getElementById("create-form-dependencies-table-more").appendChild(tr);
    }
  });
}

function addDepend(doc) {
  addDependendieToList(doc.id);
  console.log("trying to add: " + doc.id);
}

function removeAllTableRows(id) {
  var node = document.getElementById(id);
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

function changeProjectDetails(id) {
  console.log(id);
  if (id === "maven") {
    $('#create-account-details-maven-header').collapse('show');
    $('#create-account-details-maven').collapse('show');
    $('#create-account-details-node-header').collapse('hide');
    $('#create-account-details-node').collapse('hide');
    $('#create-account-dependency-header').html('Maven Dependencies');
    searchSwitch = 'maven';
  }

  if (id === "node") {
    $('#create-account-details-node-header').collapse('show');
    $('#create-account-details-node').collapse('show');
    $('#create-account-details-maven-header').collapse('hide');
    $('#create-account-details-maven').collapse('hide');
    $('#create-account-dependency-header').html('Node Dependencies');
    searchSwitch = 'node';
  }
}

function deleteDependencieFromList(id) {
  console.log(id);
  document.getElementById(id).remove();
}

function addDependendieToList(id) {
  showAddedDependList();
  let button = document.createElement("BUTTON");
  let i = document.createElement("i");
  i.className = "far fa-times-circle";
  button.classList = "create-account-btn";
  button.innerHTML = id + " ";
  button.onclick = function () { deleteDependencieFromList(id) }
  button.appendChild(i);
  button.setAttribute("type", "button");
  button.id = id;
  document.getElementById("form-account-added-dependencies").appendChild(button);
}

function showAddedDependList() {
  $('#form-account-added-dependencies-header').collapse('show');
  $('#form-account-added-dependencies').collapse('show');
}