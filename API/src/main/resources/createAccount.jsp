
<div class="col-lg-6">

    <div class="card shadow mb-4">

        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create</h6>
        </div>

        <div class="card-body">
            <form action="" method="get" class="create-form">

                <div>Project</div>
                <label class="create-account-label">Maven
                    <input type="radio" checked="checked" name="radio">
                    <span class="checkmark"></span>
                </label>
                <label class="create-account-label">Node
                    <input type="radio" name="radio">
                    <span class="checkmark"></span>
                </label>

                <div class="my-2"></div>
                <div class="create-form">
                    <label for="name">Group: </label>
                    <input type="text" name="group" id="create-form-group" required>
                </div>
                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Artifact: </label>
                    <input type="text" name="artifact" id="create-form-artifact" required>
                </div>
                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Name: </label>
                    <input type="text" name="name" id="create-form-name" required>
                </div>
                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Description: </label>
                    <input type="text" name="description" id="create-form-description" required>
                </div>
                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Package name: </label>
                    <input type="text" name="package-name" id="create-form-package-name" required>
                </div>
                <div class="my-2"></div>
                <button type="submit" class="btn btn-success btn-icon-split">
                    <span class="icon text-white-50">
                        <i class="fas fa-check"></i>
                    </span>
                    <span class="text">Create</span>
                </button>
                
            </form>
        </div>
    </div>
</div>


<div class="col-lg-6">

    <div class="card shadow mb-4">

        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Dependencies</h6>
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
        </div>
    </div>
</div>