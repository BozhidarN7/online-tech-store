import * as userService from '../services/userService.js';
import { setUserRole } from '../utils/setUserRole.js';

const signUp = async (parent, args, context, info) => {
    await setUserRole(context.user.uid);
    return await userService.createUser(args);
};

const signIn = async (parent, args, context, info) => {
    return await userService.getUserByEmail(args.email);
};

export default { signUp, signIn };
