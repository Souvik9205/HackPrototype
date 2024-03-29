import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    GitHubProvider({
      async profile(profile) {
        let userRole = "Github client";
        const GitHubEmail = profile.email;

        try {
          const foundUser = await User.findOne({ email: GitHubEmail });

          if (foundUser) {
            console.log("User Exists");
            return {
              ...profile,
              role: userRole,
            };
          } else {
            const newUser = await User.create({
              email: GitHubEmail,
            });
            console.log("User registered successfully");
            return {
              ...profile,
              role: userRole,
            };
          }
        } catch (error) {
          console.error("Error during profile handling:", error);
          return profile;
        }
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      async profile(profile) {
        // Make the profile function asynchronous
        let userRole = "Google client";
        const GoogleEmail = profile.email;
        try {
          const foundUser = await User.findOne({ email: GoogleEmail });
          if (foundUser) {
            console.log("User Exists");
            return {
              ...profile,
              id: profile.sub,
              role: userRole,
            };
          } else {
            const newUser = await User.create({
              email: GoogleEmail,
            });
            console.log("User registered successfully");
            return {
              ...profile,
              id: profile.sub,
              role: userRole,
            };
          }
        } catch (error) {
          console.error("Error during profile handling:", error);
          return profile;
        }
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            console.log("User Exists");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("Good Pass");
              delete foundUser.password;

              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
          if (!foundUser) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await User.create({
              email: credentials.email,
              password: hashedPassword,
            });

            console.log("User registered successfully");
            return newUser;
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
