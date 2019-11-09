const express = require('express');
const router = express.Router();

const projectDb = require('../data/helpers/projectModel');


router.post('/', validateProject, (req, res) => {
    const pjInfo = req.body;

    if(!pjInfo.name || pjInfo.description) {
        return res.status(400).json({error: "Please provide name and description for the project."})
    }
    else {
        projectDb.insert(pjInfo)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                return res.status(500).json({error: 'There was an error while saving the project'})
            })
    }

})

router.post('/:id/actions', validateProjectId, validateProject, validateAction, (req, res) => {
    const pjInfo = req.body;
    const id = req.params.id;

    if(!id) {
        res.status(404).json({message: "The project with the specified id does not exist"})
    }
    else {
        projectDb.insert(userInfo)
            .then(user => {
                res.status(201).json(pjInfo)
            })
            .catch(err => {
                return res.status(500).json({error: "There was an error saving the action for the specified project id"})
            })
    }

    
} )

router.get('/', (req, res) => {
    const projects = req.body;

    projectDb.get(projects)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            return res.status(500).json({error: "Cannot find any Project Information"})
        })
    
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).json({message: "The project with the specified ID does not exist"})
    }
    else{
        projectDb.getById(id)
            .then(projects => {
                return res.status(200).json(projects)
            })
            .catch(err => {
                return res.status(500).json({error: "The project information could not be retrieved"})
            })
    }
    
});

router.get('/:id/actions', validateAction, validateProjectId, (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).json({message: " There are no actions for this project"})
    }
    else {
        projectDb.getProjectActions(id) 
            .then(actions => {
                return res.status(200).json(actions)
            })
            .catch(err => {
                return res.status(500).json({error: "There was an error returning actions for this project"})
            })
    }
})

router.delete('/', validateProjectId, (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).json({message: "The project with the specified id doesn't exist"})
    }
    else {
        projectDb.remove(id)
            .then(count => {
                return res.status(200).json({message: `The project with id of ${id} was deleted successfully`})
            })
            .catch(err => {
                return res.status(500).json({error: `The project with id of ${id} could not be deleted`})
            })
    }

} )

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;

    if(!id) {
        return res.status(404).json({message: "The project with the specified ID does not exist."})
    }
    else {
        projectDb.update(id, update)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                return res.status(500).json({error: "The project info could not be modified."})
            })
    }

} )

function validateProjectId(req, res, next) {
    const id = req.params.id;

    if(id) {
        return res.status(200).json({project: req.project})
    }
    if(!id) {
        return res.status(400).json({message: "Invalid project Id"})
    }

    next();
}

function validateProject(req, res, next) {
    const body = req.body;

    if(Object.entries(body).length === 0) {
        return res.status(400).json({ message: "missing project data" })
     
      }
      else if (!body.name || !body.description) {
        return res.status(400).json({ message: "missing required name or description field" })
      }
      next();

}

function validateAction(req, res, next ) {
   
    const body = req.body;

    if(!body) {
      return res.status(400).json({ message: "missing action data" })
  
    }
    else if(!body.notes) {
      return res.status(400).json({ message: "A note is required" })
  
    }
    else if(!body.project_id) {
        return res.status(400).json({ message: "missing required project id " })
    
      }
  
    next();

}



module.exports = router;