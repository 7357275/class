const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.static("."));


// 自动创建 uploads 文件夹

if(!fs.existsSync("uploads")){
    fs.mkdirSync("uploads");
}


const upload = multer({

    storage: multer.diskStorage({

        destination:function(req,file,cb){

            cb(null,"uploads");

        },


        filename:function(req,file,cb){

            cb(null,file.originalname);

        }

    })

});



app.post("/upload",
upload.single("file"),
(req,res)=>{


    console.log(req.file);


    res.json({

        message:"上传成功"

    });


});



app.get("/files",(req,res)=>{


    fs.readdir("uploads",(err,files)=>{


        if(err){

            res.json([]);

            return;

        }


        res.json(files);


    });


});



const PORT=process.env.PORT || 3000;


app.listen(PORT,()=>{


console.log(
"服务器启动成功"
);


});