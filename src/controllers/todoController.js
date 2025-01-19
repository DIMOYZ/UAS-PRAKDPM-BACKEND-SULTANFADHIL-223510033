const Todo = require('../models/todo');

class TodoController {
    // Membuat Todo baru
    async createTodo(req, res) {
        const { day, exercises } = req.body;
        const userId = req.user.id;

        console.log("✅ Menerima request untuk menambahkan Todo:", { day, exercises, userId });

        try {
            const newTodo = new Todo({
                day,
                exercises,
                userId,
            });
            await newTodo.save();
            console.log("✅ Todo berhasil disimpan di MongoDB:", newTodo);
            res.status(201).json({ message: 'Todo created successfully', data: newTodo });
        } catch (error) {
            console.error("❌ Error saat menyimpan Todo:", error.message);
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: 'Validation error', error: messages });
            } else {
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
    }

    // Mengambil semua Todos untuk pengguna yang terautentikasi
    async getTodos(req, res) {
        const userId = req.user.id;
        console.log("📡 Mengambil Todos untuk user ID:", userId);

        try {
            const todos = await Todo.find({ userId });
            console.log("✅ Todos berhasil diambil:", todos.length, "items");
            res.status(200).json({ data: todos });
        } catch (error) {
            console.error("❌ Error saat mengambil Todos:", error.message);
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Mengambil Todo berdasarkan ID
    async getTodoById(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const todo = await Todo.findOne({ _id: id, userId });
            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            res.status(200).json({ data: todo });
        } catch (error) {
            console.error("❌ Error saat mengambil Todo:", error.message);
            if (error.name === 'CastError') {
                return res.status(400).json({ message: 'Invalid Todo ID' });
            }
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Memperbarui Todo berdasarkan ID
    async updateTodoById(req, res) {
        const { id } = req.params;
        const { day, exercises, completed } = req.body;
        const userId = req.user.id;

        try {
            const updatedTodo = await Todo.findOneAndUpdate(
                { _id: id, userId },
                { day, exercises, completed },
                { new: true, runValidators: true }
            );
            if (!updatedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            console.log("✅ Todo berhasil diperbarui:", updatedTodo);
            res.status(200).json({ message: 'Todo updated successfully', data: updatedTodo });
        } catch (error) {
            console.error("❌ Error saat memperbarui Todo:", error.message);
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((val) => val.message);
                return res.status(400).json({ message: 'Validation error', error: messages });
            } else if (error.name === 'CastError') {
                return res.status(400).json({ message: 'Invalid Todo ID' });
            }
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    // Menghapus Todo berdasarkan ID
    async deleteTodoById(req, res) {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId });
            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            console.log("✅ Todo berhasil dihapus:", deletedTodo);
            res.status(200).json({ message: 'Todo deleted successfully' });
        } catch (error) {
            console.error("❌ Error saat menghapus Todo:", error.message);
            if (error.name === 'CastError') {
                return res.status(400).json({ message: 'Invalid Todo ID' });
            }
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

module.exports = new TodoController();
