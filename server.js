const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// تشغيل ملفات واجهة المستخدم من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// نقطة الاتصال برابط الذكاء الاصطناعي السحابي
app.post('/api/chat', async (req, res) => {
    const { userPrompt } = req.body;
    if (!userPrompt) return res.status(400).json({ error: 'الرجاء كتابة طلبك البرمجي' });

    try {
        const response = await axios.post('https://openrouter.ai', {
            model: 'qwen/qwen-2.5-coder-32b-instruct:free', // النموذج الخارق والمجاني للأكواد
            messages: [
                { role: 'system', content: 'You are an expert AI software engineer. Provide strictly accurate, clean, and well-formatted code.' },
                { role: 'user', content: userPrompt }
            ]
        }, {
            headers: {
                'Authorization': Bearer ${process.env.OPENROUTER_API_KEY},
                'Content-Type': 'application/json'