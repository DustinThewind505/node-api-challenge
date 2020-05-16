const express = require('express')

const projectsDB = require('../data/helpers/projectModel')

const router = express.Router()

// ============== ADD PROJECT ==============
router.post('/', validateProject, (req, res) => {
    projectsDB.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There has been an error making a new project." })
        })
})

// ============== GET ALL PROJECTS ==============
router.get('/', (req, res) => {
    projectsDB.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There has been an error fetching the projects" })
        })
})

// ============== GET PROJECT BY ID ==============
router.get('/:id', validateProjectId ,(req, res) => {
    res.status(200).json(req.project)
})

// ============== UPDATE PROJECT BY ID ==============
router.put('/:id', validateProjectId, validateProject, (req, res) => {
    projectsDB.update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There has been an error while trying to update the project." })
        })
})

// ============== DELETE PROJECT BY ID ==============
router.delete('/:id', validateProjectId, (req, res) => {
    projectsDB.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Project deleted successfully." })
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There has been an error while deleting the project." })
        })
})

// ============== GET PROJECTS ACTIONS ============== ✔✔✔✔✔✔✔✔✔✔✔✔✔✔✔
router.get('/:id/actions', validateProjectId, (req, res) => {
    projectsDB.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "There has been an error while getting the projects actions." })
        })
})


// ============== MIDDLEWARE/validate project ==============

function validateProjectId(req, res, next) {
    projectsDB.get(req.params.id)
        .then(project => {
            if(project) {
                req.project = project
                next();
            } else {
                res.status(400).json({ errorMessage: "Could not find a project with that id." })
            }
        })
}

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