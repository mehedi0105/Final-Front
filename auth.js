const handleRegistration = (event) => {
  event.preventDefault();
  const form = document.getElementById("registration-form");
  const form_data = new FormData(form);

  username = form_data.get("username");
  email = form_data.get("email");
  password = form_data.get("password");
  confirm_password = form_data.get("confirmpassword");

  // Check if password and confirm password match
  if (password !== confirm_password) {
    const parent = document.getElementById("eorror");

    if (parent.innerHTML !== "") {
      parent.innerHTML = "";
    }
    const div = document.createElement("div");
    div.classList.add("m-auto", "p-3");
    div.innerHTML = `
        <p class="text-danger">Passwords do not match. Please try again.</p>
        `;
    parent.appendChild(div);

    return;
  }

  // check username and email
  fetch("https://final-s1v0.onrender.com//GetAllUser/")
    .then((res) => res.json())
    .then((array) => {
      array.forEach((element) => {
        if (element.username == username) {
          const parent = document.getElementById("eorror");

          if (parent.innerHTML !== "") {
            parent.innerHTML = "";
          }
          const div = document.createElement("div");
          div.classList.add("m-auto", "p-3");
          div.innerHTML = `
                    <p class="text-danger">this username already exits pleace use diffarent email adress.</p>
                    `;
          parent.appendChild(div);

          return;
        }
        if (element.email == email) {
          const parent = document.getElementById("eorror");

          if (parent.innerHTML !== "") {
            parent.innerHTML = "";
          }
          const div = document.createElement("div");
          div.classList.add("m-auto", "p-3");
          div.innerHTML = `
                    <p class="text-danger">this email already exits pleace use diffarent email adress.</p>
                    `;
          parent.appendChild(div);

          return;
        }
      });
    });

  // console.log(form_data);
  const registrationFormData = {
    username: form_data.get("username"),
    first_name: form_data.get("first_name"),
    last_name: form_data.get("last_name"),
    email: form_data.get("email"),
    account_type: form_data.get("account_type"),
    password: form_data.get("password"),
    confirm_password: form_data.get("confirmpassword"),
  };

  console.log(registrationFormData);

  fetch("https://final-s1v0.onrender.com/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationFormData),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("chek your main and confirm email link")
      console.log("Redirecting to login...");
      window.location.href = "login.html";
    })
    .catch((error) => {
      error.json().then((errorMessage) => {
        console.error(
          "There was a problem with the registration:",
          errorMessage
        );
      });
    });
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
          .then((user) => {
            localStorage.setItem("username", username);
            localStorage.setItem("user_type", user.account_type);
            localStorage.setItem("user_id", user.id);
  
            console.log(user.account_type)
            if (user.account_type === "buyer") {
              window.location.href = 'buyerDashbord.html';
            } else {
              window.location.href = 'sellerDashboard.html';
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
    .then((res)=>{
      if(res.ok){
        localStorage.removeItem("token");
        localStorage.removeItem("username")
        localStorage.removeItem("user_type");
        localStorage.removeItem("user_id");
        localStorage.removeItem("bids");

        window.location.href = "./login.html";
      }
    })
    .catch((error) => console.error(error));
}
