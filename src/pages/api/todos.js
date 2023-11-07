import {getSession} from "next-auth/react";
import connectDB from "utils/connectDB";
import User from "models/User";
import { sortTodos } from "utils/sortTodos";

async function handler(req, res) {
    try {
        await connectDB();
    }catch(err) {
        console.log(err);
        return res
        .status(500)
        .json({status: "failed", message: "Error in connecting DB"})
    }

    const session = await getSession({req});
    if(!session) {
        return res.status(401).json({status: "failed", message: "You are not authrized "})
    }

    const user = await User.findOne({email: session.user.email});
    if(!user) {
        return res.status(404).json({status: "failed", message: "User dosen't exist! "});
    }


    if(req.method === "POST") {
        const {title, status, description} = req.body;
        if(!title || !status || !description) {
            return res.status(422).json({status: "failed", message: "Invalid data!"})
        }
        user.todos.push({title, description,  status});
        user.save()
        res.status(201).json({status: "success", message: "Todo crated!"})

    }else if(req.method === "GET") {
        const sortedData = sortTodos(user.todos);
        res.status(200).json({status: "success", data: {todos: sortedData}})
    }else if(req.method === "PATCH") {
        const {id, status} = req.body;
        if(!id || !status) {
            res.status(422).json({status: "failed", message: ""})
        }
        
        const result = await User.updateOne({"todos._id": id}, {$set: {"todos.$.status": status}});
        res.status(200).json({status: "success"})

    }
}

export default handler;