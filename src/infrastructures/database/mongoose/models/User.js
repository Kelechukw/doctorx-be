import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userRoles = ["user", "doctor"];

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
    },
    role: {
      type: String,
      enum: userRoles,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    //  exam of interest
    regExam: {
      examId: {
        type: Schema.Types.ObjectId,
        default: null,
      },
      subjectCombination: {
        type: Array,
        default: [],
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
