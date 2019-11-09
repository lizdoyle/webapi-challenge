const express = require('express');
const router = express.Router();

const actionDb = require('../data/helpers/actionModel');


router.post('/', validateAction, (req, res) => {
    const action = req.body;

    if(!action.notes) {
        return res.status(400).json({errorMessage: "Please provide a note for the action"})
    }
    else {
        actionDb.insert(action)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(err => {
                return res.status(500).json({error: "There was an error while saving the action"})
            })
    }


})

router.get('/', (req, res) => {
    actionDb.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            return res.status(500).json({error: "The actions information could not be retrieved"})
        })

})


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!id) {
        return res.status(404).json({message: 'The actions with the specified id does not exist'})
    }
    else {
        actionDb.remove(id) 
            .then(count => {
                return res.status(200).json({message: `The action with id of ${id} was deleted`})
            })
            .catch(err => {
                return res.status(500).json({error: `The action with id of ${id} could not be deleted`})
            })
        }


} )

router.put('/:id', validateAction, (req, res) => {
    const update = req.body;

    if(!id) {
        return res.status(404).json({ message: "The action with the specified ID does not exist." })
    }
    else if(!update.notes) {
        return res.status(400).json({ errorMessage: "Please provide notes for the action." })
    }

    else {
        actionDb.update(id, update)
            .then(action => {
                res.status(200).json(action)
            }) 
            .catch(err => {
                return res.status(500).json({ error: "The action information could not be modified." })
            })
    }


} )

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