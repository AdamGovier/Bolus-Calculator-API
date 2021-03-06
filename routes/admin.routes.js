// Imports
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import Hotshot from "../api/Hotshots/Models/hotshot.schema.js";

const router = express.Router();

// Sign in Form.

router.get('/', (req, res) => {
    if(req.session.authenticated === "admin") return res.redirect("/admin/dashboard");
    res.render('pages/admin/login');
});

// User Schema.

const { Schema } = mongoose;

const adminSchema = new Schema({
    username: {required: true, type: String},
    password: {required: true, type: String},
})

const Admin = mongoose.model('admin', adminSchema);

// Authentication.

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
 
    // Find if user exists in the database.
    const user = await Admin.findOne({username});
    if(!user) return res.render('pages/admin/login', {error: {msg:"No user with that email was found."}});

    // Compare the entered password with the hashed password in the database.
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if(!passwordsMatch) return res.render('pages/admin/login', {error: {msg:"Incorrect password."}});

    // No plans to add any other roles right now.
    req.session.authenticated = "admin";
    res.redirect('/admin/dashboard');
});

// Authentication middleware
const requireAuthenticatedUser = function (req, res, next) {
    if(req.session.authenticated !== "admin") return res.redirect("/admin");
    next();
}


// Dashboard.

router.get("/dashboard", requireAuthenticatedUser, async (req, res) => {
    const uptime = process.uptime();

    const pendingCount = await Hotshot.find({status: "pending"});
    const activeCount = await Hotshot.find({status: "active"});


    res.render('pages/admin/dashboard', {uptime, pendingCount: pendingCount.length ?? 0, activeCount: activeCount.length ?? 0});
});

// Hotshot Manager

router.get("/hotshotManager", requireAuthenticatedUser, async (req, res) => {
    const {type, search} = req.query;
    const hotshots = await Hotshot.find({status: type ?? "pending", name: { $regex: search ?? "", $options: 'i' }});

    res.render('pages/admin/hotshotManager', {hotshots, type: type ?? "pending", search: search ?? ""});
});

// Approve Hotshot

router.post("/hotshotManager/approve", requireAuthenticatedUser, async (req, res) => {
    const {id} = req.body;
    await Hotshot.findByIdAndUpdate(id, {status: "active"});
    res.redirect("/admin/hotshotManager");
});

// Reject Hotshot

router.post("/hotshotManager/reject", requireAuthenticatedUser, async (req, res) => {
    const {id} = req.body;
    await Hotshot.findByIdAndUpdate(id, {status: "archived"});
    res.redirect("/admin/hotshotManager");
});



export default router;