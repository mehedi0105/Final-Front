const notifyLogin = ()=> {
    Toastify({
        text: "First login to your account!",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#800000",
        close: true
    }).showToast();
}

const notifyPassword = (type) => {
    let val ="";
    if(type=="pass"){
        val = "Passwords do not match. Please try again.";
    }
    else if (type == "user") {
        val = "this username already exits pleace use diffarent email adress!";
    } else {
        val = "this email already exits pleace use diffarent email adress!";
    }
    Toastify({
        text: val,
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#800000",
        close: true
    }).showToast();
}

const notifyhowItworks = () =>{
    Toastify({
        text: "Only  bayer can access this section",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#800000",
        close: true
    }).showToast();
}

const notifyPostJob = () =>{
    Toastify({
        text: "Job Post Added Successfully",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#059212",
        close: true
    }).showToast();
}
const DataNotFound = () =>{
    Toastify({
        text: "Data Not Found",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#800000",
        close: true
    }).showToast();
}
const Requirmentnotify = () =>{
    Toastify({
        text: "Success Fully Send Offer",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#800000",
        close: true
    }).showToast();
}

const notifyJobDelete = () =>{
    Toastify({
        text: "Job Deleted SuccessFully",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#059212",
        close: true
    }).showToast();
}

const UpdateJobNotify = () =>{
    Toastify({
        text: "Job Details Updated SuccessFully",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#059212",
        close: true
    }).showToast();
}

const Reviewnotify = () =>{
    Toastify({
        text: "Reveiw Send SuccessFull",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#059212",
        close: true
    }).showToast();
}

const notifyJobApply = () =>{
    Toastify({
        text: "Your Proposal Submited Successfuly",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#059212",
        close: true
    }).showToast();
}

const notifyRegister = () =>{
    Toastify({
        text: "pleace check your email and click email varification link",
        duration: 3000,
        gravity: "top",
        position: "center", 
        backgroundColor: "#059212",
        close: true
    }).showToast();
}