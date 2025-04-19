const express = require('express');
const { protect } = require('../Middleware/authMiddleware');
const { createQuest, getQuest, updateQuest } = require('../Controller/questController');
const { create } = require('../Model/quest.model');

const questRouter = express.Router();

questRouter.route('/')
.get(protect, createQuest)
// .post(protect, createQuest)
.patch(protect, updateQuest);

module.exports = questRouter;