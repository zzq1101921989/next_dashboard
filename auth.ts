import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * 寻找数据库里面的数据
 * @param email
 */
async function getUser(email: string): Promise<User | undefined> {
	try {
		const user = await sql<User[]>`SELECT *
                                   FROM users
                                   WHERE email = ${ email }`;
		return user[0];
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [ Credentials({
		async authorize(credentials) {
			// 验证用户输入的信息
			const parsedCredentials = z
				.object({ email: z.string().email(), password: z.string().min(6) })
				.safeParse(credentials);

			// 验证通过
			if (parsedCredentials.success) {
				const { email, password } = parsedCredentials.data;

				const user = await getUser(email); // 通过邮箱去找用户的数据

				if (!user) return null; // 没找到直接返回

				const passwordsMatch = await bcrypt.compare(password, user.password); // 找到之后比对密码是否一致

				if (passwordsMatch) return user; // 一致直接返回
			}

			console.log('Invalid credentials');
			return null;
		}
	}) ],
});