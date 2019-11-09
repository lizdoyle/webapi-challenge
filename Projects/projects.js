const express = require('express');
const router = express.Router();

const projectDb = require('../data/helpers/projectModel');


router.post('/', (req, res) => {


} )

router.post('/:id', (req, res) => {

    
} )

router.get('/', (req, res) => {
    const projects = req.body;

    projectDb.get(projects)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catcch(err => {
            return res.status(500).json({error: "Cannot find any Project Information"})
        })
    
});

router.get('/:id', (req, res) => {
    const id = req.param.id;

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

router.delete('/', (req, res) => {


} )

router.put('/', (req, res) => {


} )






module.exports = router;