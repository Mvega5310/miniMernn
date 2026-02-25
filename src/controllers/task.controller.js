import Task from '../models/task.js';

export async function getTasks(req, res) {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.json(tasks)
}

export async function createTask(req, res) {
    const {title} = req.body
    if (!title) return res.status(400).json({message: 'el titulo es requerido'})

        const task = await Task.create({title})
        res.status(201).json(task)
}

export async function updateTask(req, res) {
    const {id} = req.params
    const update = await Task.findByIdAndUpdate(id, req.body, {new: true})
    if (!update) return res.status(404).json({message: 'tarea no encontrada'})
    res.json(update)
}

export async function deleteTask(req, res) {
    const {id} = req.params
    const deleted = await Task.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({message: 'tarea no encontrada'})
    res.json({ok: true})
}
