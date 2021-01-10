module.exports = {
    imageUrl: (req, imagePath) => {

        let imageUrl

        if (imagePath === null) {
            imageUrl = null
        } else {
            const profileSplit = imagePath.split("/")
            const fileName = profileSplit[2]
            imageUrl = req.protocol + '://' + req.get('host') + '/' + 'profile' + '/' + fileName
        }//else

        return imageUrl;

    }
}