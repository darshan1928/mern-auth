import express from "express"
import{userDetail} from "../controllers/user.controller.js"




const router = express.Router()

router.get("/",userDetail)



export default router