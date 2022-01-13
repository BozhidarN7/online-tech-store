import admin from '../config/firebaseConfig.js';

export const setUserRole = (uid) => {
    admin
        .auth()
        .setCustomUserClaims(uid, { role: 'user' })
        .catch((err) => console.log(err));
};

export const setAdminRole = (uid) => {
    admin
        .auth()
        .setCustomUserClaims(uid, { role: 'admin' })
        .catch((err) => console.log(err));
};
