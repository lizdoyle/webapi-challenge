const express = require('express');
const router = express.Router();

const actionDb = require('../data/helpers/actionModel');


router.post('/', (req, res) => {


})

router.get('/', (req, res) => {


})

router.get('/:id', (req, res) => {


})
router.delete('/:id', (req, res) => {
    const id = req.params.id;


} )

router.put('/:id', (req, res) => {
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