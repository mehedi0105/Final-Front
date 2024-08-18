
// navbar js code(start)

fetch("navbar.html")
.then((res)=>res.text())
.then((data)=>{
    document.getElementById("navigation-bar").innerHTML=data;


    const nav_item =  document.getElementById("nav-item");
    const navbar_nav = document.getElementById("navbar-nav");

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const user_type = localStorage.getItem("user_type");

    if(token){

        if(user_type === "seller"){

            nav_item.innerHTML = `
                <a href="./browse_job.html" class="nav-item nav-link active">Browse job</a>
            `

            navbar_nav.innerHTML = `
                <div class="d-flex align-items-center">
                <img src="./images/profile icon.jpg" class="profile-icon" alt="icon">
                    <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Hi, ${username}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style="margin-right:11%; padding:15px 23px; ">
                            <li styele><a class="dropdown-item icon-drop" href="./sellerDashboard.html"><i class="fa-solid fa-table me-2"></i> Dashboard</a></li>
                            <li><a class="dropdown-item icon-drop" href="./sellerDashboard.html"><i class="fa-solid fa-layer-group me-2"></i> Manage Tasks</a></li>
                            <li><a class="dropdown-item icon-drop" href="./sellerDashboard.html"><i class="fa-solid fa-mug-saucer me-2"></i> My bids</a></li>
                            <li><a class="dropdown-item icon-drop" href="./sellerDashboard.html"><i class="fa-regular fa-user me-2"></i> My Profile</a></li>
                            <li><a class="dropdown-item icon-drop" href="#" onclick="handleLogout()"><i class="fa-solid fa-right-from-bracket me-2"></i> Logout</a></li>
                    </ul>
                </div>      
            `

        }else{
        
            nav_item.innerHTML = `
                <a href="./buyerDashbord.html" class="nav-item nav-link">Dashboard</a>
            `

            navbar_nav.innerHTML = `
                <div class="d-flex align-items-center">
                <img src="./images/profile icon.jpg" class="profile-icon" alt="icon">
                    <a class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Hi, ${username}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style="margin-right:11%; padding:15px 23px;">
                            <li styele><a class="dropdown-item icon-drop" href="./buyerDashbord.html"><i class="fa-solid fa-table me-2"></i> Dashboard</a></li>
                            <li><a class="dropdown-item icon-drop" href="./buyerDashbord.html"><i class="fa-solid fa-layer-group me-2"></i> Manage Tasks</a></li>
                            <li><a class="dropdown-item icon-drop" href="./buyerDashbord.html"><i class="fa-solid fa-mug-saucer me-2"></i> Manage jobs</a></li>
                            <li><a class="dropdown-item icon-drop" href="./buyerDashbord.html"><i class="fa-regular fa-user me-2"></i> My Profile</a></li>
                            <li><a class="dropdown-item icon-drop" href="#" onclick="handleLogout()"><i class="fa-solid fa-right-from-bracket me-2"></i> Logout</a></li>
                    </ul>
                </div>      
            `

        }

    }else{

        nav_item.innerHTML = `
            <a href="./index.html" class="nav-item nav-link active">Home</a>
        `

        navbar_nav.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fa-solid fa-lock"></i>
                <a href="./login.html" class="nav-item nav-link login-btn">Login</a>
            </div>
            <div class="d-flex align-items-center">
                <i class="fa-solid fa-circle-plus"></i>
                <a href="./registration.html" class="nav-item nav-link login-btn">Register</a>
            </div>
        `
    }
})

