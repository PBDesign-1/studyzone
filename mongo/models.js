const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stacks: {
    type: Array,
    default: [],
  },
});

const Subjects = mongoose.model("Subject", SubjectSchema);

module.exports = Subjects;