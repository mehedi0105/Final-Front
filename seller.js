const countMyApp = () =>{
  let cnt=0;
  const user_id = localStorage.getItem("user_id");
  return fetch("https://final-s1v0.onrender.com/seller/apply_job/")
          .then((res)=>res.json())
          .then((data)=>{
            data.forEach(element => {
              if(String(element.seller) === user_id){
                cnt++;
              }
            });
            return cnt;
          })
}

const countAccJob = () =>{
  let cnt=0;
  const user_id = localStorage.getItem("user_id");
  return fetch("https://final-s1v0.onrender.com/seller/apply_job/")
          .then((res)=>res.json())
          .then((data)=>{
            data.forEach(element => {
              if(String(element.seller) === user_id){
                if(element.is_accepted === true)
                  cnt++;
              }
            });
            return cnt;
          })
}

const countViewJob = () =>{
  let cnt=0;
  const user_id = localStorage.getItem("user_id");
  return fetch("https://final-s1v0.onrender.com/seller/apply_job/")
          .then((res)=>res.json())
          .then((data)=>{
            data.forEach(element => {
              if(String(element.seller) === user_id){
                if(element.submit_reqirment === true)
                  cnt++;
              }
            });
            return cnt;
          })
}

const handleDasboard = async() =>{

    const username = localStorage.getItem("username");
    const bids = await countMyApp();
    const comp = await countAccJob();
    const view = await countViewJob();

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
                  <p>Active Resumes</p>
                  <h1>${view}</h1>
                </div>
                <div class="box-right ms-auto">
                  <img src="./images/box-img-1.jpg" alt="logo" />
                </div>
              </div>

              <div class="box-item d-flex gap-5 fun-fact col-4">
                <div class="box-left">
                  <p>Completed Order</p>
                  <h1>${comp}</h1>
                </div>
                <div class="box-right ms-auto">
                  <img src="./images/box-img-2.jpg" alt="logo" />
                </div>
              </div>

              <div class="box-item d-flex gap-5 fun-fact col-4">
                <div class="box-left">
                  <p>Your Applications</p>
                  <h1>${bids}</h1>
                </div>
                <div class="box-right ms-auto">
                  <img src="./images/box-img-3.jpg" alt="logo" />
                </div>
              </div>

            </div>

            <div class="dashboard-box">
              <div class="headline">
                <h3>
                  <i class="icon-material-outline-shopping-cart"></i>  Recent Activities
                </h3>
              </div>
              <div class="content">
                <ul class="dashboard-box-list products user-packages">
                  

                  
                </ul>
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

const getIdSendTittle = (id) =>{
    return fetch(`https://final-s1v0.onrender.com/seller/jobDetails/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        return {
          salary: data.salary,
          title: data.tittle,  // Assuming there's a title field in the data
          location: data.location, // Assuming there's a location field in the data
          type: data.type, // Assuming there's a location field in the data
          company: data.company // Assuming there's a location field in the data
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
          vat = true; // Job found, set vat to true

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

const handleMyBids = () =>{
    const user_id = localStorage.getItem("user_id");
    let bids = localStorage.getItem("bids");
    const parent = document.getElementById("seller-dashboard-right");
    if (parent.innerHTML !== "") {
        parent.innerHTML = "";
      }
    parent.innerHTML = `
    <div class="my-bid-tops">
      <div class="my-bid-tops-tittle">
        <h2 class="">my bids</h2>
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
              if(element.seller == user_id){
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
                ${element.submit_reqirment === true 
                  ? `<button type="button" class="btn btn-sm btn-rounded btn-success" style="text-decoration: none;">Submited project</button>` 
                  : (hanldeAction === true 
                    ? `<button type="button" onclick="SaveSubmitRequirmentData('${element.id}')" class="btn text-white" style="background-color: #26ae61; padding: 15px" data-bs-toggle="modal" data-bs-target="#applyModal">Accept Offer</button>`
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

handleDasboard()

const SaveSubmitRequirmentData = (cover_id)=>{
  localStorage.setItem("cover_id",cover_id);
  // console.log(cover_letter);
}

const handleSubmitRequirment = () =>{
const cover_id = localStorage.getItem("cover_id");
window.location.href = `https://final-s1v0.onrender.com/seller/user_requirment1/${cover_id}/`
  
}

const handleManageTasks= () =>{
  const user_id = localStorage.getItem("user_id");
  console.log(user_id)
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

