import { query as q } from "faunadb"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
// import { FaBluetooth } from "react-icons/fa"

import { fauna } from "../../../services/fauna"




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

     
       



        callbacks: {

          async signIn({ user, account, profile }) {   
            const {email} = user;
            try{
              
              await fauna.query(   
                    // se não existe usuario ao qual ele realize um match -> ao qual o index usuario por email não existir então crie  
                q.If(
                  q.Not(
                    q.Exists(
                      q.Match(
                        q.Index('user_by_email'),
                        q.Casefold(user.email)
                      )
                    )
                  ),
                  // crie ele
                  q.Create(
                    q.Collection('users'),
                    {data: {email}}
                  ),
                  // busque as informações dele
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(user.email)
                    )
                  )
                )
              )
              return true;
            }catch (err){
              console.log(err)
              return false;
            }
                
          },
        }
      
      })
    