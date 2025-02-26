import {User} from "firebase/auth";
import {api} from "@/lib/axios.ts";

export const createUserInDB = async (user: User) => {
    const databaseUser = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
    };

    const response = await api.post('/users', databaseUser);
    return response.data;
}
