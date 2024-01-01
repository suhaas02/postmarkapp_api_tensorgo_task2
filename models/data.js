// const mongoose = require('mongoose');
// import mongoose from 'mongoose';
// const emailSchema = new mongoose.Schema({
//     sender: String, 
//     recipient: String, 
//     subject: String, 
//     body: String,
//     timestamp: {type: Date, default: Date.now}
// });

// const Email = mongoose.model('Email', emailSchema);

import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    sender: String, 
    recipient: String, 
    subject: String, 
    body: String,
    timestamp: { type: Date, default: Date.now }
});

export const Email = mongoose.model('Email', emailSchema);