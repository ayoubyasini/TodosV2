import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";

import User from "models/User";
import { verifyPassword } from "utils/auth";
import connectDB from "utils/connectDB";

const authOption = {
  session: {strategy: "jwt"},
    providers: [
      CredentialsProvider({
          async authorize(credentials, req) {
            const {email, password} = credentials;

            try {
              await connectDB()
            }catch(err) {
              throw new Error("Error in connecting to DB!")
            }

            if(!email || !password) {
              throw new Error("Error in connecting to DB!")
            }

            const existingUser = await User.findOne({email: email});
            if(!existingUser) {
              throw new Error("User dosen't exist");
            }

            const isValid = await verifyPassword(password, existingUser.password)
            if(!isValid) throw new Error("Username or password is incorrect!")

            return {email}
            
          } 

        })
      ],
}

export default NextAuth(authOption);