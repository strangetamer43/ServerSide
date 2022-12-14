import express from "express";
import { v2 as cloudinary } from 'cloudinary';



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
});


const imageUpload = async (req, res) => {
    console.log("Fdf")
    const image = req.files.image;

    console.log(image)
    try {

        await cloudinary.uploader.upload(image.tempFilePath, async (err, resultB) => {

            const img = resultB.url;
            fs.unlinkSync(image.tempFilePath)

            res.status(203).json(img)

        })

    } catch (error) {
        res.status(403).json({ message: error.message })
    }



}

export default imageUpload;

