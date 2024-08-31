
window.onload = () =>{
    const id = localStorage.getItem('apply_id');
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
                if(String(element.id) == id){

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
                                    <a href="#" class="btn btn-light btn-sm mr-2 job-details-btn">🐦 Twitter</a>
                                    <a href="#" class="btn btn-light btn-sm mr-2 job-details-btn">📘 Facebook</a>
                                    <a href="#" class="btn btn-light btn-sm job-details-btn">📞 123456789</a>
                                </div>
                            </div>
                            <div>
                              <button type="button" class="btn text-white job-details-btn" onclick = "SaveData(${element.id})" style="background-color: #26ae61; padding: 15px" data-bs-toggle="modal" data-bs-target="#applyModal">Accept Proposal</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container my-5">
                    <div class="row">
                        
                        <div class="col-lg-12">
                            <div class="card" style="background: #fdfdfd;border: none;">
                                <div class="card-body">
                                    <h5 class="card-title">cover_letter Overview</h5>
                                    <ul class="list-unstyled job-overview">
                                        <li><i class="fas fa-briefcase job-overview-icon"></i> Job Title: <br>
                                            <span class="text-muted" style="margin-left: 46px;">${tittle}</span>
                                        </li>
                                        <li><i class="fa-solid fa-envelope job-overview-icon"></i>Cover Letter: <br>
                                        <p style="margin-left: 46px;" class="Description">${element.cover_letter}</p>
                                        </li>
                                    </ul>
                                    <button type="button" class="btn text-white" onclick = "SaveData(${element.id})" style="background-color: #26ae61; padding: 15px; width: 48%;" data-bs-toggle="modal" data-bs-target="#applyModal">Accept Proposal</button>
                                    <button type="button" class="btn text-white" style="background-color: red; padding: 15px;width: 48%;" onclick="handleRejectProposal(${element.id})">Reject Proposal</button>
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

const handleRejectProposal = (id) =>{
    fetch(`https://final-s1v0.onrender.com/seller/ProposalDelete/${id}/`,{
        method:"Delete",
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((data)=>{
          notifyJobDelete("jobs deleted SuccessFull")
          window.location.href="./buyerDashbord.html";
        })
}

const SaveData = (id) =>{
    
    localStorage.setItem("ssss",id);
}


const UpdateApplyjobOne = async()=>{
    const cover_id = localStorage.getItem("ssss");
    const token = localStorage.getItem("token");
    const {cover_letter, submit_reqirment, submit_project, is_accepted, reveiw, created_at, job, seller} = await viewSingleProposal(cover_id);
    const UpdateForm = {
        cover_letter :cover_letter,
        submit_reqirment : true,
        submit_project : submit_project,
        is_accepted : is_accepted,
        reveiw : reveiw,
        created_at : created_at,
        job : job,
        seller:seller
    };
    
    console.log(UpdateForm)

    fetch(`https://final-s1v0.onrender.com/seller/apply_job/${cover_id}/`,{
        method : 'PUT',
        headers: {
        "Content-Type": "application/json",
        Authorization : `Token ${token}`
        },
        body: JSON.stringify(UpdateForm),
    })
        .then((res)=>res.json())
        .then((data)=>{
            Requirmentnotify()
        })
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
        .then(async(data)=>{
            await UpdateApplyjobOne()
            window.location.href = "./buyerDashbord.html"
        })
        .catch((error)=>{
            console.log(error);
        })
}