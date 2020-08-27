module.exports = {

    //register controller
    register: (req, res) =>{
        return res.status(200).json({
            "data" : {
                "name":"Md Tajal Islam",
                "Address":"Rajshahi",
                "Occupation":"Software Engineer"
            }
        })
        }//end

}