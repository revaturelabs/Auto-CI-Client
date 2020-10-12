let searchSwitch;
let dependsMaven = [];
let dependsNode = [];
let serverApiUrl = "http://a9922a23a32874c8e8f2509b9d044cd2-1946378861.us-east-1.elb.amazonaws.com/frontend";
let serverApiStatus = "http://a9922a23a32874c8e8f2509b9d044cd2-1946378861.us-east-1.elb.amazonaws.com/status";
// let serverApiUrl = "http://localhost:8080/frontend";
// let serverApiStatus = "http://localhost:8080/status";

//after starting pipeline keep track of progress
let configProgressValue = 0;
let initProgressValue = 0;
let jenkinsProgressValue = 0;
let spinnProgressValue = 0;


// add dependency when "add" button is pressed
function addDepend(doc) {
    addDependendieToList(doc.id);
    console.log("trying to add: " + doc.id);

    // create object and add it to the dependency array
    let object = {};
    if (searchSwitch === "maven") {
        object = {
            groupId: doc.g,
            artifactId: doc.id,
            version: doc.latestVersion
        };
        dependsMaven.push(object);
    } else if (searchSwitch === "node") {
        object = {
            name: doc.id,
            version: doc.package.version
        };
        dependsNode.push(object);
    };
};

// remove dependency when "remove" button is pressed
function removeDepend(id) {
    console.log(id);
    document.getElementById(id).remove();

    if (searchSwitch === "maven") {
        for (let i = 0; i < dependsMaven.length; i++) {
            if (dependsMaven[i].id === id) {
                dependsMaven.splice(i, 1);
            };
        };
    }
    else if (searchSwitch === "node") {
        for (let i = 0; i < dependsNode.length; i++) {
            if (dependsNode[i].id === id) {
                dependsNode.splice(i, 1);
            };
        };
    };
};

// on submit of create account form
$('#create-account-form').submit(function (event) {
    event.preventDefault();
    window.scrollTo(0, 0);
    console.log("pressed create");

    //set all progress bars to zero
    $('#create-account-progress-config').css("width", "0%");
    $('#create-account-progress-config-percent').html("0%");

    $('#create-account-progress-init').css("width", "0%");
    $('#create-account-progress-init-percent').html("0%");

    $('#create-account-progress-jenkins').css("width", "0%");
    $('#create-account-progress-jenkins-percent').html("0%");

    $('#create-account-progress-spinn').css("width", "0%");
    $('#create-account-progress-spinn-percent').html("0%");

    let json = {};
    let tempIsMaven = true;
    if (searchSwitch === "node") {
        tempIsMaven = false;
    }

    json = {
        githubUsername: $("#create-form-git-user").val(),
        githubURL: "https://github.com/",
        isMaven: tempIsMaven,
        ide: "visualstudiocode",
        generateGithubActions: $("#pipeline-jenkins-github").val(),
        mavenData:
        {
            projectName: $("#create-form-project-name").val(),
            version: $("#create-form-version").val(),
            description: $("#create-form-description").val(),
            groupId: $("#create-form-maven-group").val(),
            artifactId: $("#create-form-maven-artifact").val(),
            packaging: $("#create-form-maven-package-name").val(),
            javaVersion: "1.8",
            mainClass: "App",
            dependencies: dependsMaven
            // dependencies: [{groupId:"com.ex", artifactId:"example", version:"1.5.0"}]
        },
        npmData:
        {
            projectName: $("#create-form-project-name").val(),
            version: $("#create-form-version").val(),
            description: $("#create-form-description").val(),
            mainEntrypoint: "main.js",
            keywords: ["kubernetes", "AWS"],
            author: $('#create-form-owner').val(),
            license: "",
            dependencies: dependsNode,
            devDependencies: dependsNode,
            scripts: [{ command: "test", script: "echo \"Warning: no test specified\" \u0026\u0026 exit 0" }]
        }
    };


    sendToServer(json);

    // test purposes DELETE AFTER 
    console.log(json);
});

function searchGithubUsers(username) {
    let validGitUser = $("#create-form-git-user-valid");
    
    if (!(username === "")) {
        fetch("https://api.github.com/users/" + username)
            .then(user => user.json())
            .then(function (data) {
                if (data.login == null) {
                    validGitUser.removeClass("fa-check");
                    validGitUser.addClass("fa-times");
                } else {
                    validGitUser.removeClass("fa-times");
                    validGitUser.addClass("fa-check");
                }             
            });        
    };
};

function sendToServer(jsonInput) {
    console.log("started to send to API");
    let statusUpdate = setInterval(getStatusUpdate, 500);

    fetch(serverApiUrl, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonInput)
    })
        .catch(err => {
            console.log(err);
            clearInterval(statusUpdate);
        })
        .then(resPromis => resPromis.json())
        .then(resObj => {
            setTimeout(function () { clearInterval(statusUpdate); }, 3000);
            console.log(resObj)
            if (resObj.isValid) {
                $('#nav-alert-success').collapse('show');
                $('#nav-alert-success-title').html("Success:");
                $('#nav-alert-success-message').html(resObj['message']);
            } else {
                $('#nav-alert-info').collapse('show');
                $('#nav-alert-info-title').html("Error:");
                $('#nav-alert-info-message').html(resObj['message']);
            }
        });
};

function getStatusUpdate() {

    fetch(serverApiStatus, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: ""
    })
        .then(resPromis => resPromis.json())
        .then(resObj => {
            console.log(resObj)
            $('#create-account-pipeline-progress').collapse('show');

            //configuation progress updating GUI with percent complete
            if (resObj['configuration'] === "started") {
                if (configProgressValue < 90) {
                    configProgressValue = configProgressValue + 10;
                };
                let value = configProgressValue.toString() + "%";
                $('#create-account-progress-config').css("width", value);
                $('#create-account-progress-config-percent').html(value);
            } else if (resObj['configuration'] === "finished") {
                $('#create-account-progress-config').css("width", "100%");
                $('#create-account-progress-config-percent').html("100%");
                $('#create-account-progress-config').addClass("bg-success");
            } else if (resObj['configuration'] === "failed") {
                $('#create-account-progress-config-percent').html("failed");
                $('#create-account-progress-config').addClass("bg-danger");
            }

            //initialization progress updating GUI with percent complete
            if (resObj['initialization'] === "started") {
                if (initProgressValue < 90) {
                    initProgressValue = initProgressValue + 10;
                };
                let value = initProgressValue.toString() + "%";
                $('#create-account-progress-init').css("width", value);
                $('#create-account-progress-init-percent').html(value);
            } else if (resObj['initialization'] === "finished") {
                $('#create-account-progress-init').css("width", "100%");
                $('#create-account-progress-init-percent').html("100%");
                $('#create-account-progress-init').addClass("bg-success");
            } else if (resObj['initialization'] === "failed") {
                $('#create-account-progress-init-percent').html("failed");
                $('#create-account-progress-init').addClass("bg-danger");
            }

            //jenkins progress updating GUI with percent complete
            if (resObj['jenkins'] === "started") {
                if (jenkinsProgressValue < 90) {
                    jenkinsProgressValue = jenkinsProgressValue + 10;
                };
                let value = jenkinsProgressValue.toString() + "%";
                $('#create-account-progress-jenkins').css("width", value);
                $('#create-account-progress-jenkins-percent').html(value);
            } else if (resObj['jenkins'] === "finished") {
                $('#create-account-progress-jenkins').css("width", "100%");
                $('#create-account-progress-jenkins-percent').html("100%");
                $('#create-account-progress-jenkins').addClass("bg-success");
            } else if (resObj['jenkins'] === "failed") {
                $('#create-account-progress-jenkins-percent').html("failed");
                $('#create-account-progress-jenkins').addClass("bg-danger");
            }

            //spinnaker progress updating GUI with percent complete
            if (resObj['spinnaker'] === "started") {
                if (spinnProgressValue < 90) {
                    spinnProgressValue = spinnProgressValue + 10;
                };
                let value = spinnProgressValue.toString() + "%";
                $('#create-account-progress-spinn').css("width", value);
                $('#create-account-progress-spinn-percent').html(value);
            } else if (resObj['spinnaker'] === "finished") {
                $('#create-account-progress-spinn').css("width", "100%");
                $('#create-account-progress-spinn-percent').html("100%");
                $('#create-account-progress-spinn').addClass("bg-success");
            } else if (resObj['spinnaker'] === "failed") {
                $('#create-account-progress-spinnaker-percent').html("failed");
                $('#create-account-progress-spinn').addClass("bg-danger");
            }
        });
};

// Search 
function searchDepend(term) {
    // check status of radio button, maven or node
    if (searchSwitch === 'maven') {
        searchMaven(term);
    } else if (searchSwitch === 'node') {
        searchNode(term);
    };
};

//maven
function searchMaven(term) {
    console.log("starting " + term);
    if (!(term === "")) {
        fetch('https://cors-anywhere.herokuapp.com/https://search.maven.org/solrsearch/select?' + 'q=' + term + '&rows=20&wt=json')
            .then(response => response.json())
            .catch(err => { console.log("found nothing") })
            .then(function (data) {
                // console.log(data.response.docs);
                createDependTableMaven(data.response.docs);
            })
            .catch(err => { console.log("found nothing") });
    };
};

//node
function searchNode(term) {
    console.log("starting " + term);
    if (!(term === "")) {
        fetch('https://cors-anywhere.herokuapp.com/http://registry.npmjs.com/-/v1/search?' + 'text=' + term + '&size=20')
            .then(response => response.json())
            .catch(err => { console.log("found nothing") })
            .then(function (data) {
                console.log(data);
                createDependTableNode(data.objects);
            })
            .catch(err => { console.log("found nothing") });
    };
};

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
        };
    });
};

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
        };

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
        };
    });
};

function removeAllTableRows(id) {
    var node = document.getElementById(id);
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    };
};

function changeProjectDetails(id) {
    console.log(id);
    $('#form-account-added-dependencies').empty();
    dependsMaven = [];
    dependsNode = [];

    if (id === "maven") {
        $('#create-account-details-maven-header').collapse('show');
        $('#create-account-details-maven').collapse('show');
        $('#create-account-details-node-header').collapse('hide');
        $('#create-account-details-node').collapse('hide');
        $('#create-account-dependency-header').html('Maven Dependencies');
        searchSwitch = 'maven';
    };

    if (id === "node") {
        $('#create-account-details-node-header').collapse('show');
        $('#create-account-details-node').collapse('show');
        $('#create-account-details-maven-header').collapse('hide');
        $('#create-account-details-maven').collapse('hide');
        $('#create-account-dependency-header').html('Node Dependencies');
        searchSwitch = 'node';
    };
};

function addDependendieToList(id) {
    showAddedDependList();
    let button = document.createElement("BUTTON");
    let i = document.createElement("i");
    i.className = "far fa-times-circle";
    button.classList = "create-account-btn";
    button.innerHTML = id + " ";
    button.onclick = function () { removeDepend(id) };
    button.appendChild(i);
    button.setAttribute("type", "button");
    button.id = id;
    document.getElementById("form-account-added-dependencies").appendChild(button);
};

function showAddedDependList() {
    $('#form-account-added-dependencies-header').collapse('show');
    $('#form-account-added-dependencies').collapse('show');
};