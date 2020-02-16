const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const slugs = require('slugs');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  slug: String,
  email: {
    type: String,
    required: 'Please provide an email',
    unique: true,
    // TODO: Validators
  },
  password: {
    type: String,
    required: 'Please provide a password',
  },
  name: {
    type: String,
    required: 'Please provide a Name',
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      //! FIXME
    },
  ],
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(Number(process.env.ROUND));
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    return next();
  }
  this.slug = slugs(this.name);
  const regex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`);
  const withSlugs = await this.constructor.find({
    slug: regex,
  });
  if (withSlugs.length) {
    this.slug = `${this.slug}-${withSlugs.length + 1}`;
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
