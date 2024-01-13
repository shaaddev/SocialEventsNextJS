const mongoose = require('mongoose');

mongoose.connect(process.env.DEV)
  .then(() => console.log("MongoDB Connected"))
  .catch((err: any) => console.error("MongoDB connection error: ", err))

const postSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
  title: { type: String, required: true, maxlength: 25},
  caption: { type: String, required: true, maxlength: 255},
  location: { type: String, required: true, maxlength: 25},
  event_date: { type: String, required: true, maxlength: 25},
  },
  {
    timestamp: true,
  }
);

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true},
  username: { type:String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true},
})

const posts = mongoose.models.Posts || mongoose.model("Posts", postSchema);
const user = mongoose.models.Users || mongoose.model("Users", userSchema);

module.exports = { posts, user };