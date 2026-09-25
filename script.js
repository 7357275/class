function upload(){

    let fileInput=document.getElementById("file");

    if(fileInput.files.length==0){

        alert("请选择文件");
        return;

    }


    let formData=new FormData();

    formData.append(
        "file",
        fileInput.files[0]
    );


    fetch("/upload",{

    method:"POST",

    body:formData

})
.then(res=>{

    if(!res.ok){
        throw new Error("上传失败");
    }

    return res.json();

})
.then(data=>{

    alert(data.message);

})
.catch(err=>{

    console.log(err);
    alert("上传出错");

});

}
//加载文件列表

fetch("/files")

.then(res=>res.json())

.then(files=>{


    let list=document.getElementById("fileList");


    files.forEach(file=>{


        let li=document.createElement("li");


        let role = localStorage.getItem("role");

let deleteButton = "";


if(role=="admin"){

    deleteButton = 
    `
    <button onclick="deleteFile('${file}')">
    删除
    </button>
    `;

}


li.innerHTML =

file+

`
<a href="uploads/${file}" download>
下载
</a>

${deleteButton}

`;


        list.appendChild(li);


    });


});


function deleteFile(file){


    fetch("/delete/"+file,{

        method:"DELETE"

    })

    .then(res=>res.json())

    .then(data=>{


        alert(data.message);

        location.reload();


    });


}