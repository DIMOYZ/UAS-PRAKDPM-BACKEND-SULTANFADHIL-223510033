const mongoose = require('mongoose');

// Definisi skema untuk setiap gerakan
const ExerciseSchema = new mongoose.Schema({
    exerciseType: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
});

// Definisi skema Todo yang diperbarui
const todoSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    },
    exercises: {
        type: [ExerciseSchema],
        validate: {
            validator: function (arr) {
                return arr.length > 0;
            },
            message: 'Todo harus memiliki setidaknya satu gerakan',
        },
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Middleware untuk memastikan "day" tetap valid dengan huruf kapital di awal
todoSchema.pre('save', function (next) {
    if (this.day) {
        // Format hari agar hanya huruf pertama kapital
        this.day = this.day.charAt(0).toUpperCase() + this.day.slice(1).toLowerCase();
    }
    next();
});

module.exports = mongoose.model('Todo', todoSchema);
