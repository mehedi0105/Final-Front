const jobDetails = (button) =>{
    const id = localStorage.getItem('job_id');
    const parent = document.getElementById("job_main");
    
    if (parent.innerHTML !== "") {
        parent.innerHTML = "";
    }
    fetch(`https://final-s1v0.onrender.com/seller/jobDetails/${id}/`)
    .then((res) => res.json())
    .then(async(data)=>{


        let buttonHTML = "";
        if (button === "seller") {
           buttonHTML =`<button type="button" class="btn text-white w-100" style="background-color: #26ae61; padding: 15px" data-bs-toggle="modal" data-bs-target="#applyModal">Apply For Job</button>`
        }
        else if (button === "buyer") {
            buttonHTML = `<button type="button" class="btn text-white w-100" style="background-color: #26ae61; padding: 15px; display: block;" onclick="viewProposal('${data.id}')">View Proposal List</button>`;
        } else {
           buttonHTML = ` <button type="button" class="btn text-white w-100" style="background-color: #26ae61; padding: 15px; display:block;" onclick="notifyLogin()">Apply For Job</button>`

        }
            const company_name = await getIdSendUsername(data.company);

            const div = document.createElement("div");
            div.innerHTML = `
                <div class="container my-5">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="text-muted">Food Services</h6>
                            <h3 style="font-size:17px;">${data.tittle}</h3>
                            <span class="badge badge-primary">${data.type}</span>
                        </div>
                        <div></div>
                    </div>

                    <div class="card top-box mt-4" style="border: none">
                        <div class="card-body top-box-body d-flex">
                            <div class="mr-4" style="margin-right:20px;">
                                <img class="company_logo company_logo-ress"
                                     src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-03-150x150.png"
                                     height="117px;" alt=""/>
                            </div>
                            <div class="flex-grow-1 flex-grow-1-ress">
                                <h5>${company_name}</h5>
                                <p class="text-muted">${company_name} in tech industry</p>
                                <div class="d-flex mb-3">
                                    <a href="#" class="btn btn-light btn-sm mr-2">🌐 Website</a>
                                    <a href="#" class="btn btn-light btn-sm mr-2">✉️ ${company_name}@test.com</a>
                                    <a href="#" class="btn btn-light btn-sm mr-2 job-details-btn">🐦 Twitter</a>
                                    <a href="#" class="btn btn-light btn-sm mr-2 job-details-btn">📘 Facebook</a>
                                    <a href="#" class="btn btn-light btn-sm job-details-btn">📞 123456789</a>
                                </div>
                            </div>
                            <div class="job-details-btn">
                              ${buttonHTML}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container my-5">
                    <div class="row">
                        <div class="col-lg-8">
                            <p class="Description">${data.description}</p>
                        </div>
                        <div class="col-lg-4">
                            <div class="card" style="background: #fdfdfd;border: none;">
                                <div class="card-body">
                                    <h5 class="card-title">Job Overview</h5>
                                    <ul class="list-unstyled job-overview">
                                        <li><i class="fas fa-calendar-alt job-overview-icon"></i> Date Posted: <br>
                                            <span class="text-muted" style="margin-left: 46px;">Posted 1 day ago</span>
                                        </li>
                                        <li><i class="fas fa-clock job-overview-icon"></i> Expiration date: <br>
                                            <span class="text-muted" style="margin-left: 46px;">April 15, 2027</span>
                                        </li>
                                        <li><i class="fas fa-map-marker-alt job-overview-icon"></i> Location:  <br>
                                            <span class="text-muted" style="margin-left: 46px;">${data.location}</span>
                                        </li>
                                        <li><i class="fas fa-briefcase job-overview-icon"></i> Job Title: <br>
                                            <span class="text-muted" style="margin-left: 46px;">${data.tittle.slice(0,40)}</span>
                                        </li>
                                        <li><i class="fas fa-dollar-sign job-overview-icon"></i> Salary: <br>
                                            <span class="text-muted" style="margin-left: 46px;">${data.salary}</span>
                                        </li>
                                    </ul>
                                    ${buttonHTML}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="proposal-list"></div>
                </div>
            `;
            parent.appendChild(div);
        })

}

window.onload = () =>{
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");

    if(token){
        if(user_type === "seller"){
            jobDetails("seller");
        }else{
            jobDetails("buyer");
        }
    }else{
        jobDetails(45)
    }
}


const handleApplyJob =async (event) =>{
event.preventDefault();
const seller = localStorage.getItem("user_id");
const job_id = localStorage.getItem("job_id");

const form = document.getElementById("submit-proposal");
const form_data = new FormData(form);

const JobApplyForm = {
"cover_letter": form_data.get("cover-latter"),
"is_accepted": false,
"job": job_id,
"seller": seller,
};
console.log(JobApplyForm);

fetch("https://final-s1v0.onrender.com/seller/apply_job/", {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify(JobApplyForm),
}
)
  .then((res) => res.json())
  .then(async(data) => {
    await notifyJobApply()
      window.location.href = "./sellerDashboard.html"
  })
  .catch((error) => {
      console.error(error);
  });

}


const viewProposal = (id) =>{
    const parent = document.getElementById("proposal-list");
    console.log(parent)
    if(parent){
      if (parent.innerHTML !== "") {
              parent.innerHTML = "";
          }
        console.log(id)
      fetch("https://final-s1v0.onrender.com/seller/apply_job/")
        .then((res)=>res.json())
        .then((data)=>{
          data.forEach(async(element) => {
            console.log("job",element.job)
            if(element.job == String(id)){
              const company_name = await getIdSendUsername(element.seller);
              const div = document.createElement("div");
              div.innerHTML = `
              <ul class="dashboard-box-list" style="cursor:pointer;">
                  <div class="my-bid-bottoms">
                    <div class="card mb-3 job-card" style="border-left: 5px solid #FFDD57;     background-color: rgba(80, 80, 80,0.05)">
                      <div class="card-body d-flex justify-content-between align-items-center">
                          <div class="d-flex">
                              <img src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-03-150x150.png" alt="King Logo" class="me-3" style="height: 60px;">
                              <div style="padding-left: 25px;">
                                  <h5 class="card-title">${company_name} </h5>
                                  <p class="card-text d-flex gap-2" style="color: #808080;">
                                      <small class="text-muted">Company: ${element.cover_letter.slice(0,100)}........</small><br>
                                      
                                  </p>
                              </div>
                          </div>
                          <div class="d-flex flex-column text-end">
                              <span class="btn btn-primary mb-1" onclick = "transerViewProposal(${element.id})">View Proposal</span>
                          </div>
                      </div>
                  </div>
                  </div>
                </ul>
              `
              parent.appendChild(div);
            }
          });
          
        })
    }
    if (parent.innerHTML == "") {
        DataNotFound()
    }
  }

const transerViewProposal = (pk) =>{
localStorage.setItem("apply_id",pk);
window.location.href = "./veiw_proposal.html";
}
