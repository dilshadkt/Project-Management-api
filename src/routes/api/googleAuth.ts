import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../../models/user';

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: 'http://localhost:8080/api/auth/google/callback',
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any,
    ) {
      try {
        // Check if user already exists in our DB
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return cb(null, user);
        }
        // If not, create new user
        user = new User({
          googleId: profile.id,
          firstName: profile.displayName,
          lastName: profile.name.familyName,
          avatar: profile.photos[0].value,
          email: profile.emails[0].value,
        });
        await user.save();
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    },
  ),
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done: any) => {
  done(null, obj);
});
