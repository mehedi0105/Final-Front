const getIdSendUsername = (id) =>{
    return fetch(`https://final-s1v0.onrender.com/getUserName/${id}/`)
         .then((res)=>res.json())
         .then((data)=>{
             return data.username;
         });
 }

const getIdSendTittle = (id) =>{
    return fetch(`https://final-s1v0.onrender.com/seller/jobDetails/${id}/`)
      .then((res) => res.json())
      .then((data) => {
          return data.tittle;
      })
  }

window.onload = () =>{
    const id = localStorage.getItem('apply_id');
    // const id = localStorage.getItem('job_id');
    const parent = document.getElementById("job_main");
    const token = localStorage.getItem("token");
    if (parent.innerHTML !== "") {
        parent.innerHTML = "";
    }

    fetch(`https://final-s1v0.onrender.com/seller/apply_job/`)
    .then((res) => res.json())
    .then(async (data) => {
     {
         
         data.forEach(async(element) => {
            console.log(element.id,"  ",id)
             if(String(element.id) === id){
                const company_name = await getIdSendUsername(element.seller);
                const tittle = await getIdSendTittle(element.job);
                const div = document.createElement("div");
            div.innerHTML = `
                <div class="container my-5">

                    <div class="card top-box mt-4" style="border: none">
                        <div class="card-body top-box-body d-flex">
                            <div class="mr-4">
                                <img class="company_logo"
                                     src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-03-150x150.png"
                                     height="117px;" alt=""/>
                            </div>
                            <div class="flex-grow-1">
                                <h5>${company_name}</h5>
                                <p class="text-muted">${company_name} It Soluation</p>
                                <div class="d-flex mb-3">
                                    <a href="#" class="btn btn-light btn-sm mr-2">🌐 Website</a>
                                    <a href="#" class="btn btn-light btn-sm mr-2">✉️ ${company_name}@test.com</a>
                                    <a href="#" class="btn btn-light btn-sm mr-2">🐦 Twitter</a>
                                    <a href="#" class="btn btn-light btn-sm mr-2">📘 Facebook</a>
                                    <a href="#" class="btn btn-light btn-sm">📞 123456789</a>
                                </div>
                            </div>
                            <div>
                              <button type="button" class="btn text-white" style="background-color: #26ae61; padding: 15px" data-bs-toggle="modal" data-bs-target="#applyModal">Crate Offer</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container my-5">
                    <div class="row">
                        <div class="col-lg-8">
                            <p class="Description">${element.cover_letter}</p>
                        </div>
                        <div class="col-lg-4">
                            <div class="card" style="background: #fdfdfd;border: none;">
                                <div class="card-body">
                                    <h5 class="card-title">cover_letter Overview</h5>
                                    <ul class="list-unstyled job-overview">
                                        <li><i class="fas fa-briefcase job-overview-icon"></i> Job Title: <br>
                                            <span class="text-muted" style="margin-left: 46px;">${tittle.slice(0,40)}.....</span>
                                        </li>
                                    </ul>
                                    <button type="button" class="btn text-white" style="background-color: #26ae61; padding: 15px; display:block;width: 100%;" data-bs-toggle="modal" data-bs-target="#applyModal">Crate Offer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            parent.appendChild(div);
            }
        });
               
        }
    });
}

const handleApplyJob =async (event) =>{
    event.preventDefault();
    const seller = localStorage.getItem("user_id");
    const job_id = localStorage.getItem("job_id");
    // const title = await getIdSendTittle(job_id);
    console.log(seller," ",job_id," ",title);
    const form = document.getElementById("submit-proposal");
    const form_data = new FormData(form);

    const JobApplyForm = {
      "cover_letter": form_data.get("cover-latter"),
      "submit_reqirment": false,
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
        .then((data) => {
            alert("Your Proposal Submited Successfuly");
            // window.location.href = "./browse_job.html"
        })
        .catch((error) => {
            console.error(error);
        });

  }

const viewProposal = (id) =>{
    const parent = document.getElementById("proposal-list");
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
                              <span class="badge bg-primary mb-1">View Proposal</span>
                          </div>
                      </div>
                  </div>
                  </div>
                </ul>
              `
              parent.appendChild(div);
            }
          });
          if (parent.innerHTML === "") {
              alert("Data Not Found")
          }

        })
    }
  }

const handleProjectRequ = (event) =>{
    event.preventDefault();
    const form = document.getElementById("submit-proposal");
    const job = localStorage.getItem("job_id");
    const buyer = localStorage.getItem("user_id");
    const form_data = new FormData(form);

    const Requirment = {
        "requirment": form_data.get("cover-latter"),
        "job": job,
        "buyer": buyer
    }

    console.log(Requirment);

    fetch("https://final-s1v0.onrender.com/seller/project_requirment/",{
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(Requirment),
    })
        .then((res)=>res.json())
        .then((data)=>{
            alert("Success Fully Send Offer")
            window.location.href = './buyerDashbord.html';
        })
        .catch((error)=>{
            console.log(error);
        })
}