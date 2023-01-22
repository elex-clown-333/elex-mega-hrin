const { Router } = require('express')
const {Patient, Conclusion} = require("./entities");

// Patients Router
const p = Router()

p.get('/', async function (req, res) {
    const result = await Patient.findAll()

    res.send(result)
})

p.get('/:id', async function (req, res) {
    const result = await Patient.findOne({ where: { id: req.params.id } })

    if (result === null) {
        res.status(404).send()
        return
    }

    res.send(result)
})

p.post('/', async function (req, res) {
    const patient = await Patient.create(req.body)

    res.send(patient)
})

p.patch('/:id', async function (req, res) {
    const updRes = await Patient.update({...req.body}, {where: { id: req.params.id }})

    if (updRes[0] === 0) {
        res.status(404).send()
        return
    }

    console.log({updRes})

    res.send({...req.body, id: req.params.id})
})

p.delete('/:id', async function (req, res) {
    const patient = await Patient.findOne({id: req.params.id})

    if (patient === null) {
        res.status(404).send()
        return
    }

    await patient.destroy()

    res.status(204).send()
})

// Conclusions Router
const c = Router()

c.get('/', async function (req, res) {
    const result = await Conclusion.findAll()

    const { patientID } = req.query

    if (patientID !== undefined) {
        res.send(await Conclusion.findAll({ where: { patientID: Number(patientID) } }))
        return
    }

    res.send(result)
})

c.get('/:id', async function (req, res) {
    const result = await Conclusion.findOne({ where: { id: req.params.id } })

    if (result === null) {
        res.status(404).send()
        return
    }

    res.send(result)
})

c.post('/', async function (req, res) {
    const patient = await Patient.findOne({ where: { id: req.body.patientID } })

    if (patient === null) {
        res.status(404).send()
        return
    }

    console.log({
        patient, type: typeof patient
    })

    const conclusion = await Conclusion.create({ ...req.body, patientID: patient.get('id') })

    res.send(conclusion)
})

c.patch('/:id', async function (req, res) {
    const updRes = await Conclusion.update({...req.body}, {where: { id: req.params.id }})

    if (updRes[0] === 0) {
        res.status(404).send()
        return
    }

    console.log({updRes})

    res.send({...req.body, id: req.params.id})
})

c.delete('/:id', async function (req, res) {
    const conclusion = await Conclusion.findOne({id: req.params.id})

    if (conclusion === null) {
        res.status(404).send()
        return
    }

    await conclusion.destroy()

    res.status(204).send()
})

module.exports = {patients: p, conclusions: c};