import User from '../models/user.model'
import Profile from '../models/profile.model'

UserSchema.pre('save', async function (next) {
    try {
        // Check if a profile document already exists for this user
        const profile = await Profile.findOne({ user_id: this._id });

        // If a profile document doesn't exist, create a new one
        if (!profile) {
            const newProfile = new Profile({ user_id: this._id });
            await newProfile.save();
        }
  
        next();
    } catch (err) {
        next(err);
    }
});