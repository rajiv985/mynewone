import { createTask,getalltask,GetTaskById,deletetask,updatetask } from "../controllers/task.controllers.js";  

import { Router } from "express";  


const router =Router(); 

router.route("/Ctask").post(createTask);  
router.route("/Cgetalltask").get(getalltask);   
router.route("/GetTaskById/:id").get(GetTaskById);
router.route("/deletetask/:id").delete(deletetask);
router.route("/updatetask/:id").put(updatetask);
 
export default router;  
