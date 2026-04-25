import { loginuser } from "@/server/user/auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                const user = await loginuser({
                    email: credentials.email,
                    password: credentials.password
                });

                console.log("LOGIN USER:", user);

                if (user?.success && user?.user) {
                    return {
                        id: user.user._id,
                        name: user.user.Name,
                        email: user.user.email,
                        messName: user.user.messName,
                        accountType: user.user.accountType,
                        secretCode: user.user.secretCode
                    };
                }

                return null;
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.messName = user.messName;
                token.accountType = user.accountType;
                token.secretCode = user.secretCode;
            }

            return token;
        },

        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                messName: token.messName,
                accountType: token.accountType,
                secretCode: token.secretCode,
            };

            return session;
        }
    }
};