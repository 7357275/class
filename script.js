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
    .then(res=>res.json())
    .then(data=>{

        alert(data.message);

    });


}
//加载文件列表

fetch("/files")

.then(res=>res.json())

.then(files=>{


    let list=document.getElementById("fileList");


    files.forEach(file=>{


        let li=document.createElement("li");


        li.innerHTML=

        file+

        `
        <a href="uploads/${file}" download>
        下载
        </a>
        `;


        list.appendChild(li);


    });


});