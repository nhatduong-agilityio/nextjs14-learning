import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import type { User } from '@/app/lib/definitions'
import bcrypt from 'bcrypt'

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await fetch(`${process.env.API_ENDPOINT}users?email=${email}`)

    return await user.json()
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        // if (parsedCredentials.success) {
        //   const { email, password } = parsedCredentials.data
        //   const user = await getUser(email)

        //   console.log('user', user)

        //   if (!user) return null
        //   const passwordsMatch = await bcrypt.compare(password, user.password)

        //   if (passwordsMatch) return user
        // }

        if (!parsedCredentials.success) return null

        const { email } = parsedCredentials.data

        const user = await getUser(email)

        return user ? user : null
      },
    }),
  ],
})
