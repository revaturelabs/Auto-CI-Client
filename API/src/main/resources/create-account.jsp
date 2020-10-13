
<%-- the create account --%>
<div class="col-lg-6">

    <!-- Card -->
    <div class="card shadow mb-4 collapse" id="create-account-pipeline-progress">

        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Pipeline Progress</h6>
        </div>

        <div class="card-body">
            <h4 class="small font-weight-bold">Configuration Service <span class="float-right" id="create-account-progress-config-percent">0%</span></h4>
            <div class="progress mb-4">
                <div id="create-account-progress-config" class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h4 class="small font-weight-bold">Initialization Service <span class="float-right" id="create-account-progress-init-percent">0%</span></h4>
            <div class="progress mb-4">
                <div id="create-account-progress-init" class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h4 class="small font-weight-bold">Jenkins Service <span class="float-right" id="create-account-progress-jenkins-percent">0%</span></h4>
            <div class="progress mb-4">
                <div id="create-account-progress-jenkins" class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <h4 class="small font-weight-bold">Spinnaker Service <span class="float-right" id="create-account-progress-spinn-percent">0%</span></h4>
            <div class="progress mb-4">
                <div id="create-account-progress-spinn" class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    </div>

    <div class="card shadow mb-4">
        <form id="create-account-form">

            <%-- added dependencies info header--%>
            <div class="card-header py-3 collapse multi-collapse" id="form-account-added-dependencies-header">
                <h6 class="m-0 font-weight-bold text-primary">Added Dependencies</h6>
            </div>

            <%-- added dependencies list --%>
            <div class="card-body create-account collapse multi-collapse" id="form-account-added-dependencies">
                <%-- addding the elements here --%>
            </div>

            <%-- selecting the project type header--%>
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Project Type:</h6>
            </div>

            <%-- selecting the project type --%>
            <div class="card-body create-account">
                    <div class="my-2"></div>
                    <div class="create-form">
                        <label for="maven">Maven</label>
                        <input type="radio" id="create-form-maven" name="radio" value="maven" onclick="changeProjectDetails(this.value);" required>
                    </div>

                    <div class="my-2"></div>
                    <div class="create-form">
                        <label for="node">Node</label>
                        <input type="radio" id="create-form-node" name="radio" value="node" onclick="changeProjectDetails(this.value);" required>
                    </div>
            </div>
            
            <%-- maven projects header --%>
            <div class="card-header py-3 collapse multi-collapse" id="create-account-details-maven-header">
                <h6 class="m-0 font-weight-bold text-primary">Maven</h6>
            </div>

            <%-- maven projects --%>
            <div class="card-body create-account collapse multi-collapse" id="create-account-details-maven">
                
                <div class="my-2"></div>
                <div><b>Maven Details</b></div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="name">Domain: </label>
                    <select name="domain" id="create-form-maven-domain" onchange="onDomainChange(this.value);">
                        <option value="com.revature.">com.revature</option>
                        <option value="com.revaturelabs.">com.revaturelabs</option>
                    </select>
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="name">Group: </label>
                    <input type="text" name="group" id="create-form-maven-group" value="com.revature." class="create-form-domain-text">
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Artifact: </label>
                    <input type="text" name="artifact" id="create-form-maven-artifact" value="com.revature." class="create-form-domain-text">
                </div>
                
                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Package name: </label>
                    <input type="text" name="package-name" id="create-form-maven-package-name" value="com.revature." class="create-form-domain-text">
                </div>
            </div>

            <%-- node projects header --%>
            <div class="card-header py-3 collapse multi-collapse" id="create-account-details-node-header">
                <h6 class="m-0 font-weight-bold text-primary">Node</h6>
            </div>

            <%-- node projects --%>
            <div class="card-body create-account collapse multi-collapse" id="create-account-details-node">
                <div class="my-2"></div>
                <div><b>Node Details</b></div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="name">Name: </label>
                    <input type="text" name="name" id="create-form-node-name">
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Version: </label>
                    <input type="text" name="version" id="create-form-node-version" value="1.0.0">
                </div>
                
                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Main: </label>
                    <input type="text" name="main" id="create-form-node-main">
                </div>
            </div>

            <%-- basic project info header--%>
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Basic Info</h6>
            </div>

            <%-- basic project info --%>
            <div class="card-body create-account">
                <div class="my-2"></div>
                <div class="create-form">
                    <label for="owner">Project Owner: </label>
                    <input type="text" name="owner" id="create-form-owner" required>
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="git-user">Github Username: </label>
                    <input type="text" name="git-user" id="create-form-git-user" onfocusout="searchGithubUsers(this.value);" required>
                    <i id="create-form-git-user-valid" class="fas fa-times" style="margin-left: 5px"></i>
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="project-name">Project Name: </label>
                    <input type="text" name="project-name" id="create-form-project-name" required>
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="git-repo-name">Github Repo Name: </label>
                    <input type="text" name="git-repo-name" id="create-form-git-repo-name" required>
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Description: </label>
                    <input type="text" name="description" id="create-form-description" required>
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="version">Version: </label>
                    <input type="text" name="version" id="create-form-version" required value="1.0.0">
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="ide">IDE: </label>
                    <select id="ide" name="ide">
                        <option value="vs-code">VS Code</option>
                        <option value="eclipse">Eclipse</option>
                        <option value="intellij">IntelliJ</option>
                    </select>
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="pipeline">CI/CD Pipeline: </label>
                    <select id="pipeline-jenkins-github" name="pipeline">
                        <option value="false">Jenkins</option>
                        <option value="true">GitHub Actions</option>
                    </select>
                </div>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="cloud-provider">Cloud Provider: </label>
                    <select id="cloud-provider" name="cloud-provider">
                        <option value="aws">AWS</option>
                        <option value="azure">Azure</option>
                    </select>
                </div>
            </div>

            <%-- submit button--%>
            <div class="card-body">
                <div class="my-2"></div>
                <button type="submit" class="btn btn-success btn-icon-split" >
                    <span class="icon text-white-50">
                        <i class="fas fa-check"></i>
                    </span>
                    <span class="text">Create</span>
                </button>
            </div>
        </form>
    </div>

</div>

<%-- the maven or npm dependencies search --%>
<div class="col-lg-6">

    <div class="card shadow mb-4">

        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary" id="create-account-dependency-header">Dependencies</h6>
        </div>

        <div class="card-body">
            <div class="create-form">
                <label for="email">Search: </label>
                <input type="text" name="search" id="create-form-search" oninput="searchDepend(this.value);">
            </div>

            <div class="table-responsive create-form-table">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Repo</th>
                      <th>Id</th>
                      <th>latestVersion</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                  <tbody id="create-form-dependencies-table">
                    <%-- auto generate rows here with javascript --%>
                  </tbody>
                </table>
            </div>

            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                More
            </button>

            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    <div class="table-responsive create-form-table">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <tbody id="create-form-dependencies-table-more">
                                <%-- auto generate rows here with javascript --%>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
