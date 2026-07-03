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

    const authHeader = req.cookies?.accessToken

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
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

    return (req, res, next) => {
 
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "unauthorized"
            })
        }
        next()
    }
}

const generateRefreshToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })
    return token
}

const generateAccessToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" })
    return token
}


export { generateJwt, authenticateJWT, requireRole, generateAccessToken, generateRefreshToken }