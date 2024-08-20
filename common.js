const handleLogo = () =>{
    const user_type = localStorage.getItem("user_type");
    if(!user_type|| user_type === "seller"){
        window.location.href = "./index.html";
    }
}

const getIdSendTittle = (id) =>{
    return fetch(`https://final-s1v0.onrender.com/seller/jobDetails/${id}/`)
      .then((res) => res.json())
      .then((data) => {
          return data.tittle;
      })
  }


const getIdSendUsername = (id) =>{
    return fetch(`https://final-s1v0.onrender.com/getUserName/${id}/`)
         .then((res)=>res.json())
         .then((data)=>{
             return data.username;
         })
 }

const getIdSendCategoryname = (id) =>{
     return fetch(`https://final-s1v0.onrender.com/buyer/categoriy/${id}/`)
             .then((res)=>res.json())
             .then((data)=>{
                return data.cat_name;
             })
 }


window.onload = () =>{
    const user_type = localStorage.getItem("user_type");
    const parent = document.getElementById("footer");
    
    if(parent){
        if(parent.innerHTML != ""){
            parent.innerHTML = "";
        }
    }
    if(!user_type){
        const div = document.createElement("div");
        div.classList.add("footer");
        div.innerHTML = `
        <div class="container">
          <div class="row">
              <div class="col-md-2">
                  <h5>For Candidates</h5>
                  <ul class="list-unstyled">
                      <li><a href="#" onclick="notifyLogin()">Browse Jobs</a></li>
                      <li><a href="#" onclick="notifyLogin()">Add Resume</a></li>
                      <li><a href="#" onclick="notifyLogin()">Candidate Dashboard</a></li>
                      <li><a href="#" onclick="notifyLogin()">Job Alerts</a></li>
                      <li><a href="#" onclick="notifyLogin()">My Bookmarks</a></li>
                  </ul>
              </div>
              <div class="col-md-2">
                  <h5>For Employers</h5>
                  <ul class="list-unstyled">
                      <li><a href="#" onclick="notifyLogin()">Browse Candidates</a></li>
                      <li><a href="#" onclick="notifyLogin()">Employer Dashboard</a></li>
                      <li><a href="#" onclick="notifyLogin()">Add Job</a></li>
                      <li><a href="#" onclick="notifyLogin()">Job Packages</a></li>
                  </ul>
              </div>
              <div class="col-md-2">
                  <h5>Other</h5>
                  <ul class="list-unstyled">
                      <li><a href="#" onclick="notifyLogin()">Job Page</a></li>
                      <li><a href="#" onclick="notifyLogin()">Task Page</a></li>
                      <li><a href="#" onclick="notifyLogin()">Resume Page</a></li>
                      <li><a href="#" onclick="notifyLogin()">Blog</a></li>
                      <li><a href="#" onclick="notifyLogin()">Contact</a></li>
                  </ul>
              </div>
              <div class="col-md-2">
                  <h5>Legal</h5>
                  <ul class="list-unstyled">
                      <li><a href="#" onclick="notifyLogin()">Privacy Policy</a></li>
                      <li><a href="#" onclick="notifyLogin()">Terms of Use</a></li>
                      <li><a href="#" onclick="notifyLogin()">FAQ</a></li>
                  </ul>
              </div>
              <div class="col-md-4">
                  <h5>Sign Up For a Newsletter</h5>
                  <form class="form-inline">
                      <input type="email" style="background-color: #909090;" class="form-control mb-2 mr-sm-2" placeholder="Enter your email here">
                      <button type="submit" onclick="notifyLogin()"  class="btn btn-primary mb-2">Subscribe</button>
                  </form>
              </div>
          </div>
          
          <div class="row mt-4">
              <div class="col-md-12 text-center">
                  <p style="color: #909090; border-top: 1px solid gray; padding-top: 10px;">© 2024 workscout Company. All Rights Reserved.</p>
              </div>
          </div>
      </div>
        `
        parent.appendChild(div);
    }else{
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="small-footer margin-top-15">
            <div class="small-footer-copyrights">
            © Theme by workscout.net. All Rights Reserved.	</div>    
            <div class="clearfix"></div>
        </div>
        `
        parent.appendChild(div);
    }
 }



const viewSingleProposal =(id)=>{
    return fetch(`https://final-s1v0.onrender.com/seller/apply_job/${id}/`)
        .then((res)=>res.json())
        .then((data)=>{
            return {
                cover_letter : data.cover_letter,
                submit_reqirment : data.submit_reqirment,
                submit_project : data.submit_project,
                is_accepted : data.is_accepted,
                reveiw : data.reveiw,
                created_at : data.created_at,
                job : data.job,
                seller : data.seller
            };
        })
}