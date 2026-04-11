import { loginuser } from "@/server/user/auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {

    providers: [
        CredentialsProvider({

            name: 'Credentials',

            credentials: {
                // username: { label: "Username", type: "text", placeholder: "jsmith" },
                // password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const userdata={
                    email:credentials.email,
                    password:credentials.password
                }

                const user = await loginuser(userdata);


                console.log(user)


                if (user?.success && user?.user) {
                    return user.user;
                }
                
                return null;
            }
        })
    ]
}