import admin from '../config/firebaseConfig.js';
import * as userService from '../services/userService.js';

export default (req) => {
    const tokenId = req.headers['x-authorization'];

    if (!tokenId) return undefined;

    return admin
        .auth()
        .verifyIdToken(tokenId)
        .then(async (token) => {
            const email = token.email;

            const dbUser = await userService.getUserByEmail(email);

            if (!dbUser) return { uid: token.uid };

            const firebaseUser = await admin.auth().getUser(token.uid);
            return {
                _id: dbUser._id,
                email: dbUser.email,
                uid: token.uid,
                role: firebaseUser.customClaims ? firebaseUser.customClaims['role'] : null,
            };
        })
        .catch((err) => console.log(err));
};
