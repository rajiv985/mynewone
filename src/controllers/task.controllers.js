import Task from "../model/task.model.js";

const createTask = (async (req, res) => {
    try {

        const { title, description } = req.body;
        console.log(req.body);

        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newTask = new Task({
            title,
            description,
        });

        await newTask.save();

        res.status(201).json({
            message: "Task created successfully",
        });

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error. Could not create task." });
    }
});

// get all task 

const getalltask = (async (req, res) => {
    const tasks = await Task.find();
    if (tasks.length == 0) {
        return res.status(400).json({ message: "no task found !" });
    } else {
        res.status(200).json(tasks) 
    }
})     

const GetTaskById= (async(req,res)=>{  

    const taskId= req.params.id; 

    const task= await Task.findById(taskId)    
    console.log(task);
    if (!task){
        return res.status(400).json({message :"task not found "})
    }else{
        res.status(200).json(task)
    }
})   



const updatetask=(async(req,res)=>{

    const taskId=req.params.id;  
    const updatedata =req.body; 


    console.log(updatedata); 
    
    const Utask = await Task.findByIdAndUpdate(taskId,updatedata) ;

    if (Utask){
        res.status(200).json({message:"task updated sucessfullly"})
    }
})

const deletetask=(async(req,res)=>{  

    const taskId=req.params.id;
    const Dtask= await Task.findByIdAndDelete(taskId);

    if (Dtask){
        res.status(200).json({message:"task delete sucessfully"})
    }
})  





export { createTask, getalltask,GetTaskById,deletetask,updatetask};

