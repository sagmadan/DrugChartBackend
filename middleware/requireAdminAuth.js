const requireAdminAuth = async (req, res, next) => {
    if (!req.isAdmin) {
        return res.status(401).json({ error: 'Request is not authorized' })
    }
    next()
}

module.exports = requireAdminAuth