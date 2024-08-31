const handleCategory = () =>{
    
    fetch("https://final-s1v0.onrender.com/buyer/categories/")
        .then((res)=>res.json())
        .then((data)=>{
            data.forEach(element => {
                const parent = document.getElementById("category-view");
                const div = document.createElement("div");
                div.innerHTML = `
                <span class="wt-checkbox">  
                    <label onclick="handleCategorySlugPost('${element.slug}')"> ${element.cat_name}</label>
                </span>
                `
                parent.appendChild(div);
            });
        })
}

handleCategory();


const handleAllPost = () =>{
    fetch("https://final-s1v0.onrender.com/buyer/postJob/")
        .then((res)=>res.json())
        .then((data)=>{
            data.forEach(async (element) => {
                const parent = document.getElementById("view-all-post");
                const div = document.createElement("div");
                const company_name = await getIdSendUsername(element.company);

                const tagsHTMLArray = await Promise.all(
                    element.category.map(async (test) => {
                        const categoryName = await getIdSendCategoryname(test);
                        return `<a href="#" style="text-decoration:none;">${categoryName}</a>`;
                    })
                );
        
                const tagsHTML = tagsHTMLArray.join('');

                div.classList.add("wt-userlistinghold", "wt-featured", "wt-userlistingholdvtwo");
                div.innerHTML = `
                
               
                    
                    <div class="wt-userlistingcontent row">
                        <div class=" col-md-8">
                            <div class="wt-title">
                                <a href="#" style="text-decoration:none;"><i class="fa fa-check-circle"></i>${company_name} It Solutions</a>
                                <h2 class="job-ttile">${element.tittle}</h2>
                            </div>
                            <div class="wt-description">
                                <p>${element.description.slice(0,190)}.........</p>
                            </div>
                            <div class="wt-tag wt-widgettag">
                                ${tagsHTML}
                            </div>
                        </div>
                        <div class="col-md-4">
                            <ul class="list-style-none">
                                <li><span><i class="fa fa-dollar-sign wt-viewjobdollar"></i>${element.salary}</span></li>
                                <li><span><em><img src="https://amentotech.com/htmls/worktern/images/flag/img-01.png" alt="img description"></em>England</span></li>
                                <li><span><i class="far fa-folder wt-viewjobfolder"></i>Type: ${element.type}</span></li>
                                <li><span><i class="far fa-clock wt-viewjobclock"></i>Duration: 03 Months</span></li>
                                <li><span><i class="fa fa-tag wt-viewjobtag"></i>Job ID: ${element.id}</span></li>
                                <li class="wt-btnarea"><a onclick="handleSingleJobPost(${element.id})" style="cursor:pointer;" class="wt-btn">View Job</a></li>
                            </ul>
                        </div>
                    </div>
              
                
                `

                parent.appendChild(div);
            });
        })
}



const handleCategorySlugPost =  (slug) =>{
    fetch(`https://final-s1v0.onrender.com/seller/category_slug/${slug}/`)
        .then((res)=>res.json())
        .then( (data)=>{
            if(data.length > 0)
            {
                data.forEach(async(element) => {
                const parent = document.getElementById("view-all-post");
                const div = document.createElement("div");
                const company_name =await  getIdSendUsername(element.company);

                if (parent.innerHTML !== "") {
                    parent.innerHTML = "";
                  }

               
                const tagsHTMLArray = await Promise.all(
                    element.category.map(async (test) => {
                        const categoryName = await getIdSendCategoryname(test);
                        return `<a href="#" style="text-decoration:none;">${categoryName}</a>`;
                    })
                );
        
                const tagsHTML = tagsHTMLArray.join('');
                console.log(company_name);
                div.classList.add("wt-userlistinghold", "wt-featured", "wt-userlistingholdvtwo");
                div.innerHTML = `
                
               
                    
                    <div class="wt-userlistingcontent">
                        <div class="wt-contenthead">
                            <div class="wt-title">
                                <a href="#" style="text-decoration:none;"><i class="fa fa-check-circle"></i>${company_name} It Solutions</a>
                                <h2>${element.tittle}</h2>
                            </div>
                            <div class="wt-description">
                                <p>${element.description.slice(0,190)}.........</p>
                            </div>
                            <div class="wt-tag wt-widgettag">
                                ${tagsHTML}
                            </div>
                        </div>
                        <div class="wt-viewjobholder">
                            <ul>
                                <li><span><i class="fa fa-dollar-sign wt-viewjobdollar"></i>${element.salary}</span></li>
                                <li><span><em><img src="https://amentotech.com/htmls/worktern/images/flag/img-01.png" alt="img description"></em>England</span></li>
                                <li><span><i class="far fa-folder wt-viewjobfolder"></i>Type: ${element.type}</span></li>
                                <li><span><i class="far fa-clock wt-viewjobclock"></i>Duration: 03 Months</span></li>
                                <li><span><i class="fa fa-tag wt-viewjobtag"></i>Job ID: ${element.id}</span></li>
                                <li class="wt-btnarea"><a href="job_details.html" class="wt-btn">View Job</a></li>
                            </ul>
                        </div>
                    </div>
              
                
                `

                parent.appendChild(div);
                });
            }else{
                const parent = document.getElementById("view-all-post");
                if (parent.innerHTML !== "") {
                    parent.innerHTML = "";
                  }
                const div = document.createElement("div");
                div.classList.add("m-auto");
                div.innerHTML = `
                    <h1>Job Not Found</h1>
                `
                parent.appendChild(div);
            }
                
        })
}


const handleBudgetSearch = (event) =>{
    event.preventDefault();
    const form = document.getElementById("handleBudgetSearch");
    const form_data = new FormData(form);
    
    const min_value = parseFloat(form_data.get("mimimum-budget"));
    const max_value = parseFloat(form_data.get("maximum-budget"));


    fetch("https://final-s1v0.onrender.com/buyer/postJob/")
        .then((res)=>res.json())
        .then((data)=>{
            data.forEach(async (element) => {

                if (element.salary >= min_value && element.salary <= max_value) {

                const parent = document.getElementById("view-all-post");
                const div = document.createElement("div");
                const company_name = await getIdSendUsername(element.company);

                if (parent.innerHTML !== "") {
                    parent.innerHTML = "";
                  }

                const tagsHTMLArray = await Promise.all(
                    element.category.map(async (test) => {
                        const categoryName = await getIdSendCategoryname(test);
                        return `<a href="#" style="text-decoration:none;">${categoryName}</a>`;
                    })
                );
        
                const tagsHTML = tagsHTMLArray.join('');

                div.classList.add("wt-userlistinghold", "wt-featured", "wt-userlistingholdvtwo");
                div.innerHTML = `
                
               
                    
                    <div class="wt-userlistingcontent">
                        <div class="wt-contenthead">
                            <div class="wt-title">
                                <a href="#" style="text-decoration:none;"><i class="fa fa-check-circle"></i>${company_name} It Solutions</a>
                                <h2>${element.tittle}</h2>
                            </div>
                            <div class="wt-description">
                                <p>${element.description.slice(0,190)}.........</p>
                            </div>
                            <div class="wt-tag wt-widgettag">
                                ${tagsHTML}
                            </div>
                        </div>
                        <div class="wt-viewjobholder">
                            <ul>
                                <li><span><i class="fa fa-dollar-sign wt-viewjobdollar"></i>${element.salary}</span></li>
                                <li><span><em><img src="https://amentotech.com/htmls/worktern/images/flag/img-01.png" alt="img description"></em>England</span></li>
                                <li><span><i class="far fa-folder wt-viewjobfolder"></i>Type: ${element.type}</span></li>
                                <li><span><i class="far fa-clock wt-viewjobclock"></i>Duration: 03 Months</span></li>
                                <li><span><i class="fa fa-tag wt-viewjobtag"></i>Job ID: ${element.id}</span></li>
                                <li class="wt-btnarea"><a href="#" onclick = "handleSingleJobPost(${element.id})" class="wt-btn">View Job</a></li>
                            </ul>
                        </div>
                    </div>
              
                
                `

                parent.appendChild(div);
                }
                else{
                    const parent = document.getElementById("view-all-post");
                if (parent.innerHTML !== "") {
                    parent.innerHTML = "";
                  }
                const div = document.createElement("div");
                div.classList.add("m-auto");
                div.innerHTML = `
                    <h1>Job Not Found</h1>
                `
                parent.appendChild(div);
                }
            });
        })
}


const handleSingleJobPost = (pk) =>{
    localStorage.setItem('job_id',pk);
    window.location.href ="job_details.html";
}
const handleSingleJobPostPage = (pk) =>{
    const id = localStorage.getItem('job_id');
    const parent = document.getElementById("job_main")
    const token = localStorage.getItem("token")
    const user_type = localStorage.getItem("user_type")

    if (parent.innerHTML !== "") {
        parent.innerHTML = "";
      }

    fetch(`https://final-s1v0.onrender.com/seller/jobDetails/${id}/`)
        .then((res)=>res.json())
        .then((data)=>{
            if(user_type === "seller"){
                const div = document.createElement("div");
                div.innerHTML = ``
            }
        })
}

handleAllPost()
