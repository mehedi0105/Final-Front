
const handleJob = () => {
  fetch("https://final-s1v0.onrender.com/buyer/postJob/")
      .then((res) => res.json())
      .then((data) => {
          let cnt = 0;
          data.forEach(async (element) => {
              if (cnt < 6) {
                  cnt++;
                  const parent = document.getElementById("view-sixth-post");
                  const colDiv = document.createElement("div");
                  colDiv.classList.add("col-lg-4", "col-md-6", "mb-4");

                  const li = document.createElement("li");
                  const company_name = await getIdSendUsername(element.company);

                  const tagsHTMLArray = await Promise.all(
                      element.category.map(async (test) => {
                          const categoryName = await getIdSendCategoryname(test);
                          return `<a href="#" class="badge badge-primary">${categoryName}</a>`;
                      })
                  );

                  const tagsHTML = tagsHTMLArray.join('');

                  li.classList.add(
                      "job-listing", "card", "h-100", "shadow-sm", "p-3"
                  );
                  li.innerHTML = `
                      <!-- Job Listing Details -->
                      <div class="job-listing-details" onclick="handleSingleJobPost(${element.id})">
                          <!-- Logo -->
                          <div class="job-listing-company-logo text-center mb-3">
                              <img class="company_logo img-fluid" src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-06-300x300.png" alt="Company Logo" />
                          </div>

                          <!-- Details -->
                          <div class="job-listing-description text-center" style="width: 72%;">
                              <h4 class="job-listing-company" style="font-size:16px;">${company_name} IT Solutions</h4>
                              <h5 class="job-listing-title" style="font-size:17px;">
                                  ${element.tittle.slice(0, 35)}...
                              </h5>
                              <div class="listing-types-list">
                                  <span class="badge badge-success">${element.type}</span>
                              </div>
                          </div>
                      </div>

                      <!-- Job Listing Footer -->
                      <div class="job-listing-footer">
                          <ul class="list-unstyled text-center ms-auto" style="display: flex; flex-wrap: wrap; gap: 1pc;">
                              <li class="job-listing-footer-company mb-2">
                                  <i class="icon-material-outline-business"></i>
                                  ${company_name} IT Solutions
                              </li>

                              <li class="job-listing-footer-location mb-2">
                                  <i class="icon-material-outline-location-on"></i>
                                  ${element.location}
                              </li>

                              <li>
                                  <i class="icon-material-outline-local-atm"></i>
                                  ${element.salary}$
                              </li>
                          </ul>
                      </div>
                      <a href="https://workscout.in/job/senior-health-and-nutrition-advisor/" class="workscout-grid-job-link-handler"></a>
                  `;

                  colDiv.appendChild(li);
                  parent.appendChild(colDiv);
              }
          });
      });
};


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