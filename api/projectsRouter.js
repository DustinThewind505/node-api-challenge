const express = require('express')

const projectsDB  = require('../data/helpers/projectModel')

const router = express.Router()

// ============== ADD PROJECT ==============
router.post('/', validateProject, (req, res) => {
    projectsDB.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There has been an error making a new project.", "error": err })
        })
})

// ============== GET ALL PROJECTS ==============
router.get('/', (req, res) => {
    projectsDB.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There has been an error fetching the projects", "error": err })
        })
})

// ============== GET PROJECT BY ID ==============
router.get('/:id', (req, res) => {
    res.status(200).json(req.project)
})

// ============== GET PROJECTS ACTIONS ============== ✔✔✔✔✔✔✔✔✔
router.get('/:id/actions', (req, res) => {
    projectsDB.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There has been an error while getting the projects actions.", "error": err })
        })
})

// ============== UPDATE PROJECT BY ID ==============
router.put('/:id', validateProject, (req, res) => {
    projectsDB.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There has been an error while trying to update the project.", "error": err })
        })
})

// ============== DELETE PROJECT BY ID ==============
router.delete('/:id', (req, res) => {
    projectsDB.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Project deleted successfully." })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There has been an error while deleting the project.", "error": err })
        })
})


// ============== MIDDLEWARE/validate project ==============

function validateProject(req, res, next) {
    if(!req.body) {
        res.status(400).json({ message: "missing project data" })
    } else if(!req.body.name || !req.body.description) {
        res.status(400).json({ message: "Name and description is required." })
    } else {
        next();
    }
}

module.exports = router