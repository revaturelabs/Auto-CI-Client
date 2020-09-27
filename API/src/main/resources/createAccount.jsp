
<div class="col-lg-6">

    <div class="card shadow mb-4">

        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Create Repo</h6>
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
                    <input type="text" name="name" id="name" required>
                </div>
                <div class="my-2"></div>
                <div class="create-form">
                    <label for="email">Artifact Id: </label>
                    <input type="email" name="email" id="email" required>
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