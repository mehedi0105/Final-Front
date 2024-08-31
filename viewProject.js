
window.onload = () =>{
    const submited_job = localStorage.getItem('submited_job');
    const submited_seller = localStorage.getItem('submited_seller');
    const parent = document.getElementById("job_main");
    const token = localStorage.getItem("token");
    if (parent.innerHTML !== "") {
        parent.innerHTML = "";
    }
    
    fetch(`https://final-s1v0.onrender.com/seller/submited_project/`)
    .then((res) => res.json())
    .then(async (data) => {
        {
            let cnt =0 ;
            data.forEach(async(element) => {
                // console.log(element.id,"  ",id)
    const submited_seller = localStorage.getItem('submited_seller');
    if(String(element.job) == submited_job && cnt === 0 && String(element.seller) === submited_seller){
                    cnt++;
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
                              <button type="button" class="btn text-white job-details-btn" onclick="handleSubmitRequirment(event)" class="btn text-white" style="background-color: #26ae61; padding: 15px;" >Accept ProJect</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container my-5">
                    <div class="row">
                        
                        <div class="col-lg-12">
                            <div class="card" style="background: #fdfdfd;border: none;">
                                <div class="card-body">
                                    <h5 class="card-title">Job Requirment Overview</h5>
                                    <ul class="list-unstyled job-overview">
                                        <li><i class="fas fa-briefcase job-overview-icon"></i> Job Title: <br>
                                            <span class="text-muted" style="margin-left: 46px;">${tittle}</span>
                                        </li>
                                        <li><i class="fa-solid fa-envelope job-overview-icon"></i>Project: <br>
                                        <p style="margin-left: 46px;" class="Description">${element.project}</p>
                                        </li>
                                    </ul>
                                    <button type="button" class="btn text-white w-100" onclick="handleSubmitRequirment(event)" class="btn text-white" style="background-color: #26ae61; padding: 15px;" >Accept ProJect</button>
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



  
  const handleSubmitRequirment = async(event) =>{
    event.preventDefault();
    const cover_id = localStorage.getItem("submited_id");
    const token = localStorage.getItem("token");
    const {cover_letter, submit_reqirment, submit_project, is_accepted, reveiw, created_at, job, seller} = await viewSingleProposal(cover_id);
    const UpdateForm = {
        cover_letter :cover_letter,
        submit_reqirment : submit_reqirment,
        submit_project : submit_reqirment,
        is_accepted : true,
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
    .then(async(data)=>{
            // alert()
            await Requirmentnotify()
            window.location.href = './buyerDashbord.html'
        })
    
  }