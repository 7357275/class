const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
// 加载网页文件
app.use(express.static("."));

// 文件上传保存位置
const upload = multer({

    storage: multer.diskStorage({

        destination:function(req,file,cb){

            cb(null,"uploads/");

        },


        filename:function(req,file,cb){

            cb(null,file.originalname);

        }

    })

});


// 测试服务器



// 上传文件接口
app.post("/upload",
upload.single("file"),
(req,res)=>{

    console.log(req.file);

    res.send({
        message:"上传成功"
    });

});
// 获取文件列表
app.get("/files",(req,res)=>{

    fs.readdir("uploads",(err,files)=>{

        if(err){

            res.json([]);

            return;

        }


        res.json(files);

    });

});

// 启动服务器
app.listen(3000,()=>{

    console.log(
        "服务器启动成功 http://localhost:3000"
    );

});