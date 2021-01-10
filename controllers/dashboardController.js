const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models').User
const Role = require('../models').Role
const Question = require('../models').Question
const Answer = require('../models').Answer
const Comment = require('../models').Comment
const ViewLog = require('../models').Question_view_log
const db = require('../models/index')
const moment = require('moment')
const {Op} = require("sequelize")


module.exports = {

    dashboardCount: async (req, res) => {
        const approve_questions = await Question.count({where: {approval: true}})
        const pending_questions = await Question.count({where: {approval: false}})
        const users = await User.count()
        const verified_user = await User.count({where: {emailVerification: true}})
        const non_verified_user = await User.count({where: {emailVerification: false}})
        const ban_user = await User.count({where: {banned: false}})
        const weeklyUsers = await User.count({
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(7, 'days').toDate()
                }
            }
        })

        const weeklyQuestions = await Question.count({
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(7, 'days').toDate()
                }
            }
        })

        return res.status(222).json({
            approve_questions,
            pending_questions,
            users,
            verified_user,
            non_verified_user,
            ban_user,
            weeklyUsers,
            weeklyQuestions
        })
    }

}