const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.send(allStudents)
  } catch(error) {next(error)}
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.send(student);
    } else {
      res.status(404).send(`The student does not exist`);
    }
  } catch(error) {next(error)}
});

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).send(newStudent);
  } catch(error) {next(error)}
});

router.put('/:id', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    const [numRows, updatedRows] = await Student.update(req.body, {
      where: {id: req.body.id},
      returning: true,
      plain: true
    });
    // console.log('returnArr: ', returnArr);
    res.send(updatedRows)
  } catch(error) {next(error)}
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Student.destroy({where: {id: req.params.id}});
    res.status(204).send();
  } catch(error) {next(error)}
});

module.exports = router;
