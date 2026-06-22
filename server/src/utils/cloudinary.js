import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})
const uploadToCloudinary = async (filePath) => {


    try {
        console.log("filePath", filePath);
        const image = await cloudinary.uploader.upload(filePath, { resource_type: "image" });
        return image
    } catch (err) {
        console.log("Error Occured while uploading file to Cloudinary", err);
        throw err;
    }

}

async function deleteFromCloudinary(id) {
    try {
        const res = await cloudinary.uploader.destroy(id, { resource_type: "image" })
        console.log(res)
        return;
    } catch (err) {
        console.log("Error:", err)
    }
}
export { uploadToCloudinary, deleteFromCloudinary };