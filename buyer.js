
const check = (val)=>{
  let vat= false;
  let test = 0;
  return fetch("https://final-s1v0.onrender.com/seller/apply_job/")
                  .then((res)=>res.json())
                  .then((array)=>{
                    array.forEach(apply => {
                      console.log(apply.job," t",val)
                      if(val==apply.job){
                        if(apply.is_accepted == true)
                            vat = true;
                          test++;
                      }
                    });
                    return test;
                  })
}
const handleCompletedCount = () =>{
  let value = 0;
  const id = localStorage.getItem("user_id");
  return fetch("https://final-s1v0.onrender.com/buyer/postJob/")
          .then((res)=>res.json())
          .then((data)=>{
            data.forEach(async(element) => {
              if(element.company==id){
                 value = await check(element.id)
              }
            });

            return value;
          })
}
const handlePostCount = () =>{
  let vat = 0;
  const id = localStorage.getItem("user_id");
  return fetch("https://final-s1v0.onrender.com/buyer/postJob/")
          .then((res)=>res.json())
          .then((data)=>{
            data.forEach(element => {
              if(element.company==id){
                 vat++;
              }
            });
            return vat;
          })
}

const handlePendingCount = () =>{
  let vat = 0;
  const id = localStorage.getItem("user_id");
  console.log(id)
  return fetch("https://final-s1v0.onrender.com/seller/project_requirment/")
          .then((res)=>res.json())
          .then((data)=>{
            data.forEach(element => {
              console.log(element.buyer)
              if(element.buyer==id){
                 vat++;
              }
            });
            return vat;
          })
}

const handleDasboard =async() =>{

    const username = localStorage.getItem("username");
    const totalTask =await handlePostCount()
    const pendingTask =await handlePendingCount()
    const comTask =await handleCompletedCount()

    const parent = document.getElementById("seller-dashboard-right");
    if (parent.innerHTML !== "") {
        parent.innerHTML = "";
      }
      parent.innerHTML = `
      
      <div id="dashbord-main">
            <div class="dashboard-text">
              <h2 style="font-size: 26px">Hi, ${username}</h2>
              <p>We are glad to see you again!</p>
            </div>

            <div class="row">
              <div class="box-item d-flex gap-5 fun-fact col-4">
                <div class="box-left">
                  <p>Active Order</p>
                  <h1>${pendingTask}</h1>
                </div>
                <div class="box-right ms-auto">
                  <img src="./images/box-img-1.jpg" alt="logo" />
                </div>
              </div>

              <div class="box-item d-flex gap-5 fun-fact col-4">
                <div class="box-left">
                  <p>Completed Work</p>
                  <h1>${comTask}</h1>
                </div>
                <div class="box-right ms-auto">
                  <img src="./images/box-img-2.jpg" alt="logo" />
                </div>
              </div>

              <div class="box-item d-flex gap-5 fun-fact col-4">
                <div class="box-left">
                  <p>MyJobs</p>
                  <h1>${totalTask}</h1>
                </div>
                <div class="box-right ms-auto">
                  <img src="./images/box-img-3.jpg" alt="logo" />
                </div>
              </div>

              
            </div>

            <div class="dashboard-box">
              <div class="headline">
                <h3>
                  <i class="icon-material-outline-shopping-cart"></i> Recent Activaty
                </h3>
              </div>
              <div class="content">
                <div class="my-bid-tops" id="my-bid-tops">
                
                </div>
              </div>
            </div>
          </div>

      `

}


const handleRecentActevity = () =>{
  const user_id = localStorage.getItem("user_id")
  const parent = document.getElementById("my-bid-tops");
  console.log(parent)
  if (parent.innerHTML !== "") {
      parent.innerHTML = "";
    }
  parent.innerHTML = `
    <div class="my-bid-tops">
      <div class="my-bid-tops-tittle">
        <h2 class="">Manage Tasks</h2>
      </div>
    <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr>
              <th>Job Tittle</th>
              <th>Company</th>
              <th>Location</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="test">
            
          </tbody>
        </table>
    </div>
  `
  const test = document.getElementById("test");
    fetch("https://final-s1v0.onrender.com/seller/apply_job/")
      .then((res)=>res.json())
      .then((data)=>{
        if(data.length > 0)
        {
          data.forEach(async(element) => {
            console.log(element.seller)
            if(element.seller == user_id){
            const tr = document.createElement("tr");
            const username = localStorage.getItem("username");
            const{ salary, title, location , type,company} = await getIdSendTittle2(element.job);
            const company_name = await getIdSendUsername(company);
            const hanldeAction = await hanldeActions(element.job);
            tr.innerHTML = `
            
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class=" mb-1">${title}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">${company_name} It Limited</p>
                <p class="text-muted mb-0">IT department</p>
              </td>
              <td>
                <p class="badge badge-success fw-normal rounded-pill d-inline " style="color:#444; font-size:16px;" 
                  >${location}</p
                >
              </td>
              <td>${type}</td>
              <td>
              ${element.is_accepted === true 
                ? `<button type="button" onclick ="SaveReveiwData('${element.job}','${element.seller}')" class="btn text-white" style="background-color: #26ae61; padding: 15px" data-bs-toggle="modal" data-bs-target="#applyModal">Leave a reveiw</button>`
                : (hanldeAction === true 
                  ? `<button type="button" onclick="SaveSubmitRequirmentData('${element.id}')" class="btn text-white" style="background-color: #26ae61; padding: 15px">Accept Work</button>`
                  : `<button type="button" class="btn btn-link btn-sm btn-rounded" style="text-decoration: none;">Pending Response</button>`
                )
              } 
              </td>
           
            `
            test.appendChild(tr);
            }
            
          });
        
        }
        else{
          test.innerHTML = `
          <p class="text-center">Data Not Found</p>
          `
        }
       
      })
}


const hendlePostJob = () =>{
    const parent = document.getElementById("seller-dashboard-right");
    if (parent.innerHTML !== "") {
        parent.innerHTML = "";
      }

      parent.innerHTML = `
        <div class="dashboard-headline">
            <h2 style="font-size: 26px">Post a Job</h2>
          </div>
          <div class="dashboard-list-box job-fields-submit-form no-company-yet">
            <div class="post-job-box pb-4">
              <div class="headline">
                <h3>
                  <i class="fa-solid fa-folder-plus"></i> Job Submission Form
                </h3>
              </div>

              <div id="success-massage">
              </div>

              <div class="job-submit-page">
                <!-- Job Information Fields -->
                <form id="post-form" onsubmit="handlePost(event)">

                <div class="form-group">
                  <label for="jobTitle" class="form-label">Job Title</label>
                  <input type="text" class="form-control p-3" id="jobTitle" name="tittle" placeholder="Enter job title" required>
                </div>
                

                <div class="d-flex flex-wrap gap-2">
                  <div class="form-group " style="width: 48%;">
                    <label for="job-type">job-type</label><br>
                    <select class="custom-select w-100 p-3" id="job-type" name="type" style="color: #444; border-color: #ece4e4;" required>
                        <option selected>Choose a Job-type...</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Full-Time">Full-Time</option>
                        <!-- Add more options as needed -->
                    </select>
                  </div>
  
                  <div class="form-group" style="width: 48%; margin-left:3% ">
                    <label for="job_location">location</label><br>
                    <select class="custom-select w-100 p-3" id="job_location" name="location" style="color: #444; border-color: #ece4e4;" required>
                        <option selected>Choose a location...</option>
                        <option value="Work-From-home">Work-From-home</option>
                        <option value="Remote">Remote</option>
                        <!-- Add more options as needed -->
                    </select>
                  </div>
                </div>

                <div class="form-group" style="width: 100%;">
                  <label for="job_category">Job category</label><br>
                  <select class="custom-select w-100 p-3" id="job_category" name="category" style="color: #444; border-color: #ece4e4;" required>
                      <option selected>Choose a category...</option>
                      <option value="2">Programming & Tech</option>
                      <option value="3">Graphics & Design</option>
                      <option value="4">Digital Marketing</option>
                      <option value="5">Writing & Translation</option>
                      <option value="6">Video & Animation</option>
                      <option value="7">AI Services</option>
                      <option value="8">Music & Audio</option>
                      <option value="9">Business</option>
                      <option value="10">Consulting</option>
                      <!-- Add more options as needed -->
                  </select>
                </div>

                <div class="form-group" style="width: 100%;">
                  <label for="Salary">Salary</label><br>
                  <input type="number" step="0.01" class="form-control p-3" id="Salary" name="salary" placeholder="Enter expected Salary" required>
                </div>

                <div class="form-group" style="width: 100%;">
                  <label for="description">Description</label><br>
                  <textarea class="form-control p-3" id="description" name="description" rows="4" placeholder="write your jobs description."
                    name="description" required></textarea>
                </div>
                
                <button type="submit" class="mt-3 post-btn p-3">Post job</button>
                </form>
              </div>
            </div>
          </div>
      `
}

const handleProfile = () =>{
  const parent = document.getElementById("seller-dashboard-right")
  const user_id = localStorage.getItem("user_id")

  fetch(`https://final-s1v0.onrender.com/getUserName/${user_id}/`)
    .then((res)=>res.json())
    .then((data)=>{
      parent.innerHTML = `
      
        <div class="dashboard-headline">
            <h2 style="font-size: 26px">My Profile</h2>
          </div>

          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6">
              <div
                class="dashboard-list-box job-fields-submit-form no-company-yet"
              >
                <div class="post-job-box pb-4">
                  <div class="headline">
                    <h3>
                      <i class="fa-solid fa-folder-plus"></i> Profile Details
                    </h3>
                  </div>
                  <div class="job-submit-page">
                    <!-- Job Information Fields -->

                    <div class="form-group">
                      <label for="avatar" class="form-label">Avatar</label
                      ><br />
                      <img
                        src="./images/craiyon_002201_Dark_but_cool_profile_picture_in_HD.png"
                        height="150px"
                        alt="profile-img"
                      />
                    </div>

                    <div class="form-group" style="width: 100%">
                      <label for="first-name">First name</label><br />
                      <input
                        type="text"
                        class="form-control p-3"
                        id="first-name"
                        placeholder="${data.first_name}"
                        disabled
                      />
                    </div>

                    <div class="form-group" style="width: 100%">
                      <label for="last-name">Last name</label><br />
                      <input
                        type="text"
                        class="form-control p-3"
                        id="last-name"
                        placeholder="${data.last_name}"
                        disabled
                      />
                    </div>

                    <div class="form-group" style="width: 100%">
                      <label for="email">E-mail</label><br />
                      <input
                        type="email"
                        class="form-control p-3"
                        id="email"
                        placeholder="${data.email}"
                        disabled
                      />
                    </div>

                    <div class="form-group" style="width: 100%">
                      <label for="about-me">About me</label><br />
                      <textarea name="" class="p-3 w-100" id="" rows="3" disabled>
Lorem ipsum dolor sit, amet consectetur adipisicing elit., porro quidem amet fuga tempore exercitationem provident perspiciatis incidunt, modi sapiente.</textarea
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-6">
              <div
                class="dashboard-list-box job-fields-submit-form no-company-yet"
              >
                <div class="post-job-box pb-4">
                  <div class="headline">
                    <h3>
                      <i class="fa-solid fa-folder-plus"></i>  Change Password
                    </h3>
                  </div>
                  <div class="job-submit-page">
                    <!-- Job Information Fields -->

                    <form class="" id="password-change-form" onsubmit="handlePassword(event)">
                    <div class="form-group">
                      <label for="Old-password" class="form-label">Old Password</label>
                      <input
                        type="password"
                        class="form-control p-3"
                        id="old-password" name="old-password"
                        placeholder="Enter old-password"
                      />
                    </div>
                    <div class="form-group">
                      <label for="new-password" class="form-label">New Password</label>
                      <input
                        type="password"
                        class="form-control p-3"
                        id="new-password" name="new-password"
                        placeholder="Enter new-password"
                      />
                    </div>

                    <div class="form-group">
                      <label for="confirm-new-password" class="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        class="form-control p-3"
                        id="confirm-new-password" name="confirm-new-password"
                        placeholder="Enter confirm-new-password"
                      />
                    </div>

                    <button type="submit" class="mt-3 post-btn p-3">
                      Save Changes
                    </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

      `
    })
}

const handlePassword = (event) =>{
  event.preventDefault();
  const form = document.getElementById("password-change-form");
  const form_data = new FormData(form);
  const token = localStorage.getItem("token");

  const old_password = form_data.get("old-password");
  const new_password1 = form_data.get("new-password");
  const new_password2 = form_data.get("confirm-new-password");
  // const passwordChangeForm = {
  //   old_password : form_data.get("old-password"),
  //   new_password1 : form_data.get("new-password"),
  //   new_password2 : form_data.get("confirm-new-password")
  // };


  fetch("https://final-s1v0.onrender.com/pass_change/",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization" :`Token ${token}`,
    },
    body: JSON.stringify({
      old_password: old_password,
        new_password1: new_password1,
        new_password2: new_password2,
    }),
  })
    .then((res)=>res.json())
    .then((data)=>{
      alert("Password Changed Successful")
    })
    .catch(error => console.error("Error:", error));
}

const handlePost = (event) =>{
  event.preventDefault()

  const form = document.getElementById("post-form");
  const form_data = new FormData(form);

  const company = localStorage.getItem("user_id");
  
  const PostJobFormData = {
    tittle : form_data.get("tittle"),
    location : form_data.get("location"),
    type : form_data.get("type"),
    salary : parseFloat(form_data.get("salary")),
    category : [parseInt(form_data.get("category"), 10)],
    company : parseInt(company,10),
    description : form_data.get("description"),
  };
  console.log(PostJobFormData);

 fetch("https://final-s1v0.onrender.com/buyer/postJob/",{
  method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(PostJobFormData),
 })
  .then((res)=>res.json())
  .then(async(data)=>{

    notifyPostJob();

  })
  .catch(error => console.error("Error:", error));


}


 handleDasboard();


const handleSingleJobPost = (pk) =>{
  localStorage.setItem('job_id',pk);
  window.location.href ="job_details.html";
}

const HanldeMyJob = () =>{
  const parent = document.getElementById("seller-dashboard-right")
    if (parent.innerHTML !== "") {
        parent.innerHTML = "";
    }


  parent.innerHTML = `
    <div
        class="dashboard-content-container"
        data-simplebar=""
        style="height: 750px"
      >
      <div class="my-bid-tops">
        <div class="my-bid-tops-tittle">
          <h2 class="">Manage Job</h2>
        </div>
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light">
            <tr>
              <th>Job Tittle</th>
              <th>Company</th>
              <th>Location</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="test">
            
          </tbody>
        </table>
     </div>
   </div>
  `
  const test = document.getElementById("test");
  const user_id = localStorage.getItem("user_id");

  fetch("https://final-s1v0.onrender.com/buyer/postJob/")
  .then((res)=>res.json())
  .then((data)=>{
    data.forEach(async(element) => {

      if(String(element.company) == user_id){

          const tr = document.createElement("tr");
            const username = localStorage.getItem("username");
            const{ title,location , type,salary,description,company,category} = await getIdSendTittle2(element.id);
            const company_name = await getIdSendUsername(company);
            const hanldeAction = await hanldeActions(element.id);
            tr.innerHTML = `
            
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class=" mb-1">${title}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">${company_name} It Limited</p>
                <p class="text-muted mb-0">IT department</p>
              </td>
              <td>
                <p class="badge badge-success fw-normal rounded-pill d-inline " style="color:#444; font-size:16px;" 
                  >${location}</p
                >
              </td>
              <td>${type}</td>
              <td>
              <button class="btn btn-warning" onclick="handleSingleJobPost(${element.id})">View</button>
              <button class="btn btn-success" onclick="hanleUpdateJobForm(${element.id})">Edit</button>
              <button class="btn btn-danger" onclick="handleDeletePost(${element.id})">Delete</button>
              
              </td>
           
            `
            test.appendChild(tr); 
           console.log(test)
        }
      });
    })
}


const hanleUpdateJobForm = async(id)=>{
  console.log("update",id)
  const{ title,location , type,salary,description,company,category} = await getIdSendTittle2(id);
  const category_string = await getIdSendCategoryname(category);
  const parent = document.getElementById("seller-dashboard-right");
    if (parent.innerHTML !== "") {
        parent.innerHTML = "";
      }

      parent.innerHTML = `
        <div class="dashboard-headline">
            <h2 style="font-size: 26px">Update Job Details</h2>
          </div>
          <div class="dashboard-list-box job-fields-submit-form no-company-yet">
            <div class="post-job-box pb-4">
              <div class="headline">
                <h3>
                  <i class="fa-solid fa-folder-plus"></i> Job Update Form
                </h3>
              </div>

              <div id="success-massage">
              </div>

              <div class="job-submit-page">
                <!-- Job Information Fields -->
                <form id="update-post-form" onsubmit="handleUpdateJob(event,${id})">

                <div class="form-group">
                  <label for="jobTitle" class="form-label">Job Title</label>
                  <input type="text" class="form-control p-3" id="jobTitle" name="tittle" value="${title}">
                </div>
                

                <div class="d-flex flex-wrap gap-2">
                  <div class="form-group " style="width: 48%;">
                    <label for="job-type">job-type</label><br>
                    <select class="custom-select w-100 p-3" id="job-type" name="type" style="color: #444; border-color: #ece4e4;">
                        <option value="${type}" selected>${type}</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Full-Time">Full-Time</option>
                        <!-- Add more options as needed -->
                    </select>
                  </div>
  
                  <div class="form-group" style="width: 48%; margin-left:3% ">
                    <label for="job_location">location</label><br>
                    <select class="custom-select w-100 p-3" id="job_location" name="location" style="color: #444; border-color: #ece4e4;">
                        <option value="${location}" selected>${location}</option>
                        <option value="Work-From-home">Work-From-home</option>
                        <option value="Remote">Remote</option>
                        <!-- Add more options as needed -->
                    </select>
                  </div>
                </div>

                <div class="form-group" style="width: 100%;">
                  <label for="job_category">Job category</label><br>
                  <select class="custom-select w-100 p-3" id="job_category" name="category" style="color: #444; border-color: #ece4e4;">
                      <option value ="${category}"  selected>${category_string}</option>
                      <option value="2">Programming & Tech</option>
                      <option value="3">Graphics & Design</option>
                      <option value="4">Digital Marketing</option>
                      <option value="5">Writing & Translation</option>
                      <option value="6">Video & Animation</option>
                      <option value="7">AI Services</option>
                      <option value="8">Music & Audio</option>
                      <option value="9">Business</option>
                      <option value="10">Consulting</option>
                      <!-- Add more options as needed -->
                  </select>
                </div>

                <div class="form-group" style="width: 100%;">
                  <label for="Salary">Salary</label><br>
                  <input type="number" step="0.01" class="form-control p-3" id="Salary" name="salary"  value="${salary}">
                </div>

                <div class="form-group" style="width: 100%;">
                  <label for="description">Description</label><br>
                  <textarea class="form-control p-3" id="description" name="description" rows="4"
                    name="description">${description}</textarea>
                </div>
                
                <button type="submit" class="mt-3 post-btn p-3">Update job</button>
                </form>
              </div>
            </div>
          </div>
      `
}


const handleUpdateJob =(event,id)=>{
  event.preventDefault()
  const form = document.getElementById("update-post-form");
  const form_data = new FormData(form);

  const company = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const UpdateData = {
    tittle : form_data.get("tittle"),
    location : form_data.get("location"),
    type : form_data.get("type"),
    salary : form_data.get("salary"),
    description : form_data.get("description"),
    company : parseInt(company,10),
    category : [parseInt(form_data.get("category"),10)],
  }

  console.log(UpdateData)

  fetch(`https://final-s1v0.onrender.com/seller/jobDetails/${id}/`,{
    method : "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization : `Token ${token}`
    },
    body: JSON.stringify(UpdateData),
  })
    .then((res)=>res.json())
    .then((data)=>{
     UpdateJobNotify()
    })
}

const handleDeletePost =(id)=>{
  fetch(`https://final-s1v0.onrender.com/seller/jobDetails/${id}/`,{
    method:"Delete",
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((data)=>{
      notifyJobDelete("jobs deleted SuccessFull")
      window.location.reload();
    })
}

const getIdSendTittle2 = (id) =>{
  return fetch(`https://final-s1v0.onrender.com/seller/jobDetails/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      return {
        title: data.tittle,  
        location: data.location, 
        type: data.type, 
        salary: data.salary,
        description: data.description,
        company: data.company ,
        category: data.category ,
    };
    })
}

const hanldeActions = (job)=>{
let vat = false;
return fetch("https://final-s1v0.onrender.com/seller/project_requirment/")
  .then((res)=>res.json())
  .then((data)=>{

    data.forEach(element => {
      if (element.job === job) {
        vat = true; 
      }
      
    });
    console.log("vat",vat)
    return vat;
  })
}


const handleManageTasks= () =>{
  const user_id = localStorage.getItem("user_id");
  console.log(user_id);
  const parent = document.getElementById("seller-dashboard-right");


  if (parent.innerHTML !== "") {
      parent.innerHTML = "";
  }


  parent.innerHTML = `
      <div class="my-bid-tops">
          <div class="my-bid-tops-tittle">
              <h2 class="">Manage Tasks</h2>
          </div>
          <table class="table align-middle mb-0 bg-white">
              <thead class="bg-light">
                  <tr>
                      <th>Job Title</th>
                      <th>Seller</th>
                      <th>Location</th>
                      <th>Type</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody id="test"></tbody>
          </table>
      </div>`;
      const test = document.getElementById("test");

                    
                    fetch("https://final-s1v0.onrender.com/seller/apply_job/")
                    .then((res)=>res.json())
                    .then((data)=>{
                      if(data.length > 0)
                        {
                          data.forEach(async(element) => {
                              let buttonHTML = '';
                              let actions = await hanldeActions(element.job);
                              
                              if (element.is_accepted) {
                                  buttonHTML += `<button type="button" class="btn text-white" style="background-color: #26ae61; padding: 15px">Completed</button>`;
                              } else if (element.submit_reqirment && element.submit_project === false) {
                                buttonHTML = `<button type="button" class="btn text-white" style="background-color: #26ae61; padding: 15px">Wait Seller Response</button>`;
                              } else if (element.submit_project) {
                                buttonHTML = `<button type="button" onclick="SaveReveiwData('${element.job}','${element.id}', '${element.seller}')" class="btn text-white" style="background-color: #26ae61; padding: 15px" data-bs-toggle="modal" data-bs-target="#applyModal">View and review the project</button>`;
                   
                              } else {
                                console.log("actions", actions);
                                  buttonHTML = `<button type="button" onclick="SaveApplyData(${element.id})" class="btn text-white" style="background-color: #26ae61; padding: 15px">View Proposal</button>`;
                              }
                              console.log(element.seller)
                              const{ salary, title, location , type,company} = await getIdSendTittle(element.job);
                              if(String(company) == user_id){
                              
                              const tr = document.createElement("tr");
                              const username = localStorage.getItem("username");
                              const company_name = await getIdSendUsername(company);
                              const hanldeAction = await hanldeActions(element.job);

                              tr.innerHTML = `
                              
                                <td>
                                  <div class="d-flex align-items-center">
                                    <div class="ms-3">
                                      <p class=" mb-1">${title}</p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p class="fw-normal mb-1">${company_name}</p>
                                  <p class="text-muted mb-0">IT department</p>
                                </td>
                                <td>
                                  <p class="badge badge-success fw-normal rounded-pill d-inline " style="color:#444; font-size:16px;" 
                                    >${location}</p
                                  >
                                </td>
                                <td>${type}</td>
                                <td>
                                ${buttonHTML}
                                </td>
                            
                              `
                              test.appendChild(tr);
                              }
                              
                            });
                          
                          }
                          else{
                            test.innerHTML = `
                            <p class="text-center">Data Not Found</p>
                            `
                          }
                        
                        })
                  }

          

const SaveApplyData =(id)=>{
  localStorage.setItem("apply_id",id);
  window.location.href = "./veiw_proposal.html"
}
const SaveSubmitRequirmentData = (cover_id)=>{
  localStorage.setItem("cover_id",cover_id);

  window.location.href = `https://final-s1v0.onrender.com/buyer/accept_work/${cover_id}/`;
}


const SaveReveiwData = (job,id, seller)=>{

localStorage.setItem("reveiw-job",job);
localStorage.setItem("reveiw-id",id);
localStorage.setItem("reveiw-seller",seller);
}

const handleSubmitReveiw = (event) =>{
  event.preventDefault();
  const form = document.getElementById("submit-proposal");
  const form_data = new FormData(form);

  const job = localStorage.getItem("reveiw-job");
  const reveiw = localStorage.getItem("reveiw-id");
  const seller = localStorage.getItem("reveiw-seller");

  const ReveiwFormData = {
    project : parseInt(job),
    worker : parseInt(seller),
    rating : form_data.get("type"),
    reveiw_text : form_data.get("cover-latter")
  }



  fetch("https://final-s1v0.onrender.com/buyer/reviw/",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ReveiwFormData),
  })
    .then((res)=>res.json())
    .then((data)=>{
      Reviewnotify()
      window.location.href = `https://final-s1v0.onrender.com/seller/is_accepted/${reveiw}`;
    });
}
