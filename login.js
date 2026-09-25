function login(){

    let username=document.getElementById("username").value;

    let password=document.getElementById("password").value;


    //管理员账号
    if(username=="admin" && password=="123456"){

        localStorage.setItem("role","admin");

        location.href="home.html";

    }


    //学生账号
    else if(username=="student" && password=="123456"){

        localStorage.setItem("role","student");

        location.href="home.html";

    }


    else{

        alert("账号或密码错误");

    }

}