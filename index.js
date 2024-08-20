const handleJob = () =>{
     
         fetch("https://final-s1v0.onrender.com/buyer/postJob/")
             .then((res)=>res.json())
             .then((data)=>{
                let cnt = 0;
                 data.forEach(async (element) => {
                    if(cnt < 6 ){
                        cnt++;
                        const parent = document.getElementById("view-sixth-post");
                     const li = document.createElement("li");
                     const company_name = await getIdSendUsername(element.company);
     
                     const tagsHTMLArray = await Promise.all(
                         element.category.map(async (test) => {
                             const categoryName = await getIdSendCategoryname(test);
                             return `<a href="#" style="text-decoration:none;">${categoryName}</a>`;
                         })
                     );
             
                     const tagsHTML = tagsHTMLArray.join('');

                     li.classList.add("job-listing", "grid", "post-2490", "job_listing", "type-job_listing", "status-publish", "hentry", "job_listing_region-new-york","job_listing_category-healthcare", "job_listing_type-full-time", "job_listing_tag-healthcare", "job-type-full-time");
                     li.innerHTML = `
                     
                        <!-- Job Listing Details -->
                        <div class="job-listing-details" onclick="handleSingleJobPost(${element.id})">
                          <!-- Logo -->
                          <div class="job-listing-company-logo">
                            <img
                              class="company_logo"
                              src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-06-300x300.png"
                              alt=""
                            />
                          </div>

                          <!-- Details -->
                          <div class="job-listing-description">
                            <h4 class="job-listing-company">${company_name} It Solutions</h4>
                            <h3 class="job-listing-title">
                              ${element.tittle.slice(0,35)}....
                              <div class="listing-types-list">
                                <span class="job-type full-time"
                                  >${element.type}</span
                                >
                              </div>
                            </h3>
                          </div>
                        </div>

                        <!-- Job Listing Footer -->
                        <div class="job-listing-footer">
                          <ul>
                            <li class="job-listing-footer-company">
                              <i class="icon-material-outline-business"></i>
                              ${company_name} It Solutions
                            </li>

                            <li class="job-listing-footer-location">
                              <i class="icon-material-outline-location-on"></i>
                              ${element.location}
                            </li>

                            <li>
                              <i class="icon-material-outline-local-atm"></i>
                              ${element.salary}$
                            </li>
                          </ul>
                        </div>
                        <a
                          href="https://workscout.in/job/senior-health-and-nutrition-advisor/"
                          class="workscout-grid-job-link-handler"
                        ></a>
                     
                     `
     
                     parent.appendChild(li);
                    }
                     
                 });
             })
}
 

const handleSingleJobPost = (pk) =>{
    localStorage.setItem('job_id',pk);
    window.location.href ="job_details.html";
}
handleJob()

const howItworks = () =>{

  const user_type = localStorage.getItem("user_type");
    if(!user_type){
      notifyLogin()
    }else if(user_type === "seller"){
      notifyhowItworks()
    }
    else{
      window.location.href = "./buyerDashbord.html";
    }
}