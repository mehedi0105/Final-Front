const handleRegistration = async(event) => {
  event.preventDefault();
  const form = document.getElementById("registration-form");
  const form_data = new FormData(form);

  username = form_data.get("username");
  email = form_data.get("email");
  password = form_data.get("password");
  confirm_password = form_data.get("confirmpassword");

  if (password !== confirm_password) {
    await notifyPassword("pass");
    return;
  }

  // check username and email
  let check = "1";
  fetch("https://final-s1v0.onrender.com//GetAllUser/")
    .then((res) => res.json())
    .then(async(array) => {
      array.forEach(async(element) => {
        console.log(element.username," ",username)
        // console.log(username)
        if ((element.username) == username) {
          await notifyPassword("user");
          check ="2";
        }
        if (element.email == email) {
          await notifyPassword("email");
          check ="2";

        }
      });
    });
console.log(check)
localStorage.setItem("check",check)
  if(check === "1")
  {
    const registrationFormData = {
    username: form_data.get("username"),
    first_name: form_data.get("first_name"),
    last_name: form_data.get("last_name"),
    email: form_data.get("email"),
    account_type: form_data.get("account_type"),
    password: form_data.get("password"),
    confirm_password: form_data.get("confirmpassword"),
  };


  fetch("https://final-s1v0.onrender.com/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationFormData),
  })
    .then((res) => res.json())
    .then(async(data) => {
      await notifyRegister ()
    })
    .catch((error) => {
      error.json().then((errorMessage) => {
        console.error(
          "There was a problem with the registration:",
          errorMessage
        );
      });
    });
  }
};

const handleLogin = (event) => {
  event.preventDefault();
  const form = document.getElementById("login-form");
  const form_data = new FormData(form);

  username= form_data.get("username");

  const loginFormData = {
    username: form_data.get("username"),
    email: form_data.get("email"),
    password: form_data.get("password"),
  };


  let check = "1";
  fetch("https://final-s1v0.onrender.com//GetAllUser/")
    .then((res) => res.json())
    .then(async(array) => {
      array.forEach(async(element) => {
        console.log(element.username," ",form_data.get("username"))
        // console.log(username)
        if ((element.username) == form_data.get("username")) {
          check ="2";
        }
        if (element.email == form_data.get("email")) {
          check ="2";

        }
      });
      if(check == 1){
    console.log("woe")
    notifyLoginInvalid()
    return;
  }
 });
  


  fetch("https://final-s1v0.onrender.com/api/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginFormData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.key) {
        localStorage.setItem("token", data.key);

        fetch(`https://final-s1v0.onrender.com/Getdetails/${username}/`)
          .then((res) => res.json())
          .then(async(user) => {
            localStorage.setItem("username", username);
            localStorage.setItem("user_type", user.account_type);
            localStorage.setItem("user_id", user.id);
            await notifyLogin()
            console.log(user.account_type)
            if (user.account_type === "buyer") {
              window.location.href = './buyerDashbord.html';
            } else {
              window.location.href = './browse_job.html';
            }
          })
          .catch((error) => console.error("Error:", error));
      }
     
    })

  
};

const handleLogout = () => {
  const token = localStorage.getItem("token");
  fetch("https://final-s1v0.onrender.com/api/auth/logout/",{
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
      Authorization :`Token ${token}`,
    },
  })
    .then(async(res)=>{
      if(res.ok){
        localStorage.removeItem("token");
        localStorage.removeItem("username")
        localStorage.removeItem("user_type");
        localStorage.removeItem("user_id");
        
       await notifyLogin()
        window.location.href = "./index.html";
      }
    })
    .catch((error) => console.error(error));
}
