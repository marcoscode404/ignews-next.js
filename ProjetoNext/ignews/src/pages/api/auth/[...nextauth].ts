import NextAuth from "next-auth"
import  GithubProvider from "next-auth/providers/github"
// import GitHubProvider from "next-auth/providers/github";

// criando a autentication com o github
// read:user  pega as informações mais basicas do usaurio no github


export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
              params: {
                scope: 'read:user',
              },
            },
          }),

        ],
})

    