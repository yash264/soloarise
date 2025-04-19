const express = require('express');
const { protect } = require('../Middleware/authMiddleware');
const { createQuest, getQuest } = require('../Controller/questController');

const questRouter = express.Router();

questRouter.route('/')
.get(protect, getQuest)
.post(protect, createQuest);

module.exports = questRouter;