import jwt from "jsonwebtoken"


const generateJwt = (user) => {
    console.log(user)
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
    return token
}

const authenticateJWT = (req, res, next) => {

    const authHeader = req.cookies?.token

    if (!authHeader) {
        return res.status(400).json({
            success: false,
            message: "missing auth header"
        })
    }
    if (authHeader) {
        const token = authHeader

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: err.message
                })
            }
            if (user) {

                req.user = user;
                next()

            }
        })
    }
}

const requireRole = (...role) => {
    const roles = ["Admin", "Author"]
    return (req, res, next) => {
        // console.log("roles", role)
        console.log("user role", req.user.role)
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "unauthorized"
            })
        }
        next()
    }
}

export { generateJwt, authenticateJWT, requireRole }