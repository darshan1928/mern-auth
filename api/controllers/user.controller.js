


const userDetail=async (req,res)=>{



    try {
      
        res.json({
            message:"its working.connected successfully"
         })
    } catch (error) {
        console.log(error);
    }
   
}

export {userDetail}