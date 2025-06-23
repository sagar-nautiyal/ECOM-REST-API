import multer from "multer";


const storageConfig = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './public/images')
    },
    filename:(req, file, cb)=>{
        const name = new Date().toISOString().replace(/:/g, '-') + "-"+ file.originalname;
        cb(null , name)
    }
})

export const upload = multer({storage:storageConfig});