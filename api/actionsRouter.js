const express = require('express')

const actionsDB = require('../data/helpers/actionModel')
const projectsDB = require('../data/helpers/projectModel')

const router = express.Router()

// ============== ADD ACTION ==============
router.post('/', (req, res) => {
    actionsDB.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There was an error creating the action." })
        })
})

// ============== GET ALL ACTIONS ==============
router.get('/', (req, res) => {
    actionsDB.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There was an error fetching all actions." })
        })
})

// ============== GET ACTION BY ID ==============
router.get('/:id', verifyActionId, (req, res) => {
    res.status(200).json(req.action)
})

// ============== UPDATE ACTION ==============
router.put('/:id', verifyAction, verifyActionId, (req, res) => {
    actionsDB.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There was an error updating this action." })
        })
})

// ============== DELETE ACTION BY ID ==============
router.delete('/:id', verifyActionId, (req, res) => {
    actionsDB.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Action successfully deleted" })
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There was an error deleting this action." })
        })
})


// ============== MIDDLEWARE/validate action ==============

function verifyActionId (req, res, next) {
    db.get(req.params.id)
        .then(action => {
            if(!action) {
                res.status(400).json({ errorMessage: "There was not an action found with this id" })
            } else {
                req.action = action
                next();
            }
        })
}

function verifyAction (req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing action data" })
    } else if(!req.body.project_id || !req.body.description || !req.body.notes) {
        res.status(400).json({ message: "actions require a project id, description, and notes." })
    } else {
        projectsDB.get(req.params.project_id)
            .then(project => {
                if(project) {
                    next();
                } else {
                    res.status(400).json({ errorMessage: "Could not find a matching project." })
                }
            })
    }
}

module.exports = router;