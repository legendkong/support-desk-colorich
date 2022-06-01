// A schema, all the fields we want for user
const mongoose = requier('mongoose')

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please add a name']
   },
   email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true
   },
   password: {
      type: String,
      required: [true, 'Please add a password'],
   },
   isAdmin: {
      type: Boolean,
      required: true,
      default: false,
   }
},
{  
   //Automatically add timestamp fields
   timestamps: true,
}
)

module.exports = mongoose.model('User', userSchema)