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

                // console.log(credentials)

                const userdata={
                    email:credentials.email,
                    password:credentials.password
                }

                const user = await loginuser(userdata);

                const logeduser=user?.user;

                console.log(logeduser)

                return ({
                    email:logeduser.email,
                    name:logeduser.name,
                    massName:logeduser.messName
                });
            }
        })
    ]
}