import { pool } from "../db.js"

export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        res.send(rows)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getEmployee = async (req, res) => {    
    const idEmployee = req.params.id
    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [idEmployee])

        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        res.send(rows[0])
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


export const createEmployee = async (req, res) => {    
    const { name, salary } = req.body;
    try {
        const [rows] = await pool.query("INSERT INTO employee (name, salary) VALUES (?,?)", [name, salary])
        res.send({
            id: rows.insertId,
            name: name,
            salary: salary
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        console.log(result)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
export const updateEmployee = async (req, res) => {    
    const id = req.params.id;
    const { name, salary } = req.body;
    try {
        const [result] = await pool.query("UPDATE employee SET name = ?, salary = ? WHERE id = ?", [name, salary, id])

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Employee not found'
        })
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

