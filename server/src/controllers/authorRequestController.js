import AuthorRequest from "../models/authorRequestSchema.js";
import User from "../models/userSchema.js";



const createAuthorRequest = async (req, res) => {
    try {
        const userid = req.user.id;
        console.log(userid)
        const user = await User.findById(userid);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            })
        }
        const requestAuthor = await AuthorRequest.findOne({ userId: userid });
        if (requestAuthor) {
            if (requestAuthor.status == "pending") {
                return res.status(400).json({
                    success: false,
                    message: "Your request is already in pending"
                })
            }
            requestAuthor.status = "pending";
            await requestAuthor.save()
            return res.status(200).json({
                success: true,
                message: "Request for admin approval"
            })
        }
        const authorREquest = new AuthorRequest({
            userId: userid,
            status: "pending",
            message: "Give me author request",
        })

        await authorREquest.save();
        res.status(200).json({
            success: true,
            message: "Requested for admin approvel"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getMyAuthorRequest = async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            })
        }

        const authorRequest = await AuthorRequest.findOne({
            userId: userid
        })

        if (!authorRequest) {
            return res.status(404).json({
                success: false,
                message: "Author request not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Author request found",
            authorRequest
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const cancelAuthorRequest = async (req, res) => {
    try {
        const userid = req.user.id;
        const authorRequest = await AuthorRequest.findOne({
            userId: userid
        })

        if (!authorRequest) {
            return res.status(404).json({
                success: false,
                message: "Author request not found"
            })
        }

        await AuthorRequest.deleteOne({
            userId: userid
        })
        res.status(200).json({
            success: true,
            message: "Author request cancelled successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    createAuthorRequest,
    getMyAuthorRequest,
    cancelAuthorRequest
}