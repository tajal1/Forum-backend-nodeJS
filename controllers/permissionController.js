const permissions = require('../controllers/permissionObject')

module.exports = {

    permissions: (req, res) => {
        return res.status(200).json({
            permissions
        })
    }

}
