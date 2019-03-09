const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

// router.post('/student/:studentId', async (req, res, next) => {
//   try {
//     const newTest = await Test.create({
//       id: req.body.id,
//       subject: req.body.subject,
//       grade: req.body.grade,
//       studentId: req.params.studentId,
//     });
//     console.log('------------------------newTest: ', newTest)
//     res.status(201).send(newTest);
//   } catch(error) {next(error)}
// })


router.post('/student/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId);
    const newTest = await Test.create(req.body);
    newTest.setStudent(student);
    res.status(201).send(newTest);
  } catch(error) {next(error)}
})

module.exports = router;
