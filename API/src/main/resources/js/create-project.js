let searchSwitch;
let depends = [];

// add dependency when "add" button is pressed
function addDepend(doc) {
  addDependendieToList(doc.id);
  console.log("trying to add: " + doc.id);

  // create object and add it to the dependency array
  let object = {};
  if (searchSwitch === "maven") {
    object = {
      groupId: doc.g,
      arifactId: doc.id,
      version: doc.latestVersion
    };

  } else if (searchSwitch === "node") {
    object = {
      name: doc.id,
      version: doc.package.version
    };

  }
  depends.push(object);
}

// remove dependency when "remove" button is pressed
function removeDepend(id) {
  console.log(id);
  document.getElementById(id).remove();

  for (let i = 0; i < depends.length; i++) {
    if (depends[i].id === id) {
      depends.splice(i, 1);
    }
  }
}

// creating json
function createJson() {
  let json = {};
  let tempIsMaven = true;
  if(searchSwitch === "node"){
    tempIsMaven = false;
  }
   
  json = {
    githubUsername: $("#create-form-git-user").val(),
    githubURL: "https://github.com/",
    isMaven: tempIsMaven,
    ide: "visualstudiocode",
    generateGithubActions: false, 
    mavenData:
    {
        projectName: $("#create-form-project-name").val(),
        version: $("#create-form-version").val(),
        description: $("#create-form-description").val(),
        groupId: $("#create-form-maven-group").val(),
        artifactId: $("#create-form-maven-artifact").val(),
        packaging: "jar",
        javaVersion: "1.8",
        mainClass: "TestApp",
        dependencies:[depends]
    },
    npmData:
    {
        projectName: $("#create-form-project-name").val(),
        version: $("#create-form-version").val(),
        description: $("#create-form-description").val(),
        mainEntrypoint: "main.js",
        keywords: ["kubernetes","AWS"],
        author: "author",
        license : "",
        dependencies: [depends],
        devDependencies: [depends], 
        scripts: [{command:"test", script:"echo \"Error: no test specified\" && exit 1"}]
    }
  }

  sendToServer(json);

  // test purposes DELETE AFTER 
  console.log(json);
}


function sendToServer(jsonInput) {
    console.log("started to send to API");

    fetch('http://a9922a23a32874c8e8f2509b9d044cd2-1946378861.us-east-1.elb.amazonaws.com/frontend', {
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonInput)
    }).then(res=>res.json())
    .then(res => console.log(res));
}

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
    button.onclick = function () { addDepend(doc, "maven") }
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
    button.onclick = function () { addDepend(obj, "node") }
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

function removeAllTableRows(id) {
  var node = document.getElementById(id);
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

function changeProjectDetails(id) {
  console.log(id);
  $('#form-account-added-dependencies').empty();
  depends = [];

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

function addDependendieToList(id) {
  showAddedDependList();
  let button = document.createElement("BUTTON");
  let i = document.createElement("i");
  i.className = "far fa-times-circle";
  button.classList = "create-account-btn";
  button.innerHTML = id + " ";
  button.onclick = function () { removeDepend(id) }
  button.appendChild(i);
  button.setAttribute("type", "button");
  button.id = id;
  document.getElementById("form-account-added-dependencies").appendChild(button);
}

function showAddedDependList() {
  $('#form-account-added-dependencies-header').collapse('show');
  $('#form-account-added-dependencies').collapse('show');
}