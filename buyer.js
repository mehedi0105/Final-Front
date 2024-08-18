
const check = (val)=>{
  return fetch("https://final-s1v0.onrender.com/seller/apply_job/")
                  .then((res)=>res.json())
                  .then((array)=>{
                    array.forEach(apply => {
                      if(val==apply.job){
                        if(apply.is_accepted == true)
                            return true;
                      }
                    });
                    return false;
                  })
}
const handleCompletedCount = () =>{
  let vat = 0;
  const id = localStorage.getItem("user_id");
  return fetch("https://final-s1v0.onrender.com/buyer/postJob/")
          .then((res)=>res.json())
          .then((data)=>{
            data.forEach(async(element) => {
              if(element.company==id){

                const value = await check(element.id)
                if(value==true){
                  vat++;
                }
              }
            });
            return vat;
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
  return fetch("https://final-s1v0.onrender.com/seller/project_requirment/")
          .then((res)=>res.json())
          .then((data)=>{
            data.forEach(element => {
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

// handleDasboard()
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
  </div>`
  const test = document.getElementById("test");
    fetch("https://final-s1v0.onrender.com/seller/apply_job/")
      .then((res)=>res.json())
      .then((data)=>{
        if(data.length > 0)
        {
          data.forEach(async(element) => {
            console.log(element.seller)
            if(element.seller == user_id){
              // alert()
            // console.log(element.cover_letter)
            const tr = document.createElement("tr");
            const username = localStorage.getItem("username");
            const{ salary, title, location , type,company} = await getIdSendTittle(element.job);
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

// handleDasboard()
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
                      <option value="1">Programming & Tech</option>
                      <option value="2">Writing & Translation</option>
                      <option value="3">Digital Marketing</option>
                      <option value="4">Video & Animation</option>
                      <option value="5">AI Services</option>
                      <option value="6">Music & Audio</option>
                      <option value="7">Business</option>
                      <option value="8">Consulting</option>
                      <!-- Add more options as needed -->
                  </select>
                </div>

                <div class="form-group" style="width: 100%;">
                  <label for="Salary">Salary</label><br>
                  <input type="number" step="0.3" class="form-control p-3" id="Salary" name="salary" placeholder="Enter expected Salary" required>
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
      // console.log(data.first_name,' ',data.last_name)
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
  .then((data)=>{
    alert("Job Post Added Successfully");
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
    </div>
  `
  const test = document.getElementById("test");
  const user_id = localStorage.getItem("user_id");
  console.log(test)
  fetch("https://final-s1v0.onrender.com/buyer/postJob/")
    .then((res)=>res.json())
    .then((data)=>{
      data.forEach(async(element) => {
        if(element.company == user_id){
          const tr = document.createElement("tr");
            const username = localStorage.getItem("username");
            const{ salary, title, location , type,company} = await getIdSendTittle(element.id);
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
              <button class="btn btn-warning" onclick="handleSingleJobPost(${element.id})">view job</button>
              
                
              </td>
           
            `
            test.appendChild(tr); 
           console.log(test)
        }
      });
    })
}

const getIdSendTittle = (id) =>{
  return fetch(`https://final-s1v0.onrender.com/seller/jobDetails/${id}/`)
    .then((res) => res.json())
    .then((data) => {
      return {
        salary: data.salary,
        title: data.tittle,  
        location: data.location, 
        type: data.type, 
        company: data.company 
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
    return vat;
  })
}

const getIdSendUsername = (id) =>{
  return fetch(`https://final-s1v0.onrender.com/getUserName/${id}/`)
       .then((res)=>res.json())
       .then((data)=>{
           return data.username;
       });
}

const handleManageTasks= () =>{
  const user_id = localStorage.getItem("user_id");
  console.log(user_id)
  let bids = localStorage.getItem("bids");
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
  </div>`
  const test = document.getElementById("test");
    fetch("https://final-s1v0.onrender.com/seller/apply_job/")
      .then((res)=>res.json())
      .then((data)=>{
        if(data.length > 0)
        {
          data.forEach(async(element) => {
            console.log(element.seller)
            if(element.seller == user_id){
              // alert()
            bids++;
            // console.log(element.cover_letter)
            const tr = document.createElement("tr");
            const username = localStorage.getItem("username");
            const{ salary, title, location , type,company} = await getIdSendTittle(element.job);
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
            localStorage.setItem("bids",bids);
            
          });
        
        }
        else{
          test.innerHTML = `
          <p class="text-center">Data Not Found</p>
          `
        }
       
      })
}

const SaveSubmitRequirmentData = (cover_id)=>{
  localStorage.setItem("cover_id",cover_id);
  // console.log(cover_letter);
  window.location.href = `https://final-s1v0.onrender.com/buyer/accept_work/${cover_id}/`;
}
// handleMyBids()

const SaveReveiwData = (job, seller)=>{
// console.log("job",job," ",seller)
localStorage.setItem("reveiw-job",job);
localStorage.setItem("reveiw-seller",seller);
}

const handleSubmitReveiw = (event) =>{
  event.preventDefault();
  const form = document.getElementById("submit-proposal");
  const form_data = new FormData(form);

  const job = localStorage.getItem("reveiw-job");
  const seller = localStorage.getItem("reveiw-seller");

  const ReveiwFormData = {
    project : parseInt(job),
    worker : parseInt(seller),
    rating : form_data.get("type"),
    reveiw_text : form_data.get("cover-latter")
  }

  console.log(ReveiwFormData)

  fetch("https://final-s1v0.onrender.com/buyer/reviw/",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ReveiwFormData),
  })
    .then((res)=>res.json())
    .then((data)=>{
      alert("Reveiw Send SuccessFull")
    })
}