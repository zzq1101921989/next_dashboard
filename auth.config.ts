import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		// 用户将被重定向到我们的自定义登录页面，而不是 NextAuth.js 的默认页面
		signIn: '/login',
	},
	// 阻止用户在未登录的情况下访问仪表板页面
	callbacks: {
		/**
		 * authorized 回调用于验证请求是否被授权通过 Next.js 代理访问页面
		 * @param auth 包含用户的会话信息
		 * @param nextUrl 包含传入的请求
		 */
		authorized({ auth, request: { nextUrl } }) {
			// 是否已经登录（存在用户信息）
			const isLoggedIn = !!auth?.user;

			// 当前页面是数据看板页面
			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/dashboard', nextUrl)); // 只要登录了，就自动跳转到数据看板页面
			}
			return true;
		},
	},

	// 列举出不同的登录选项（谷歌登录，FaceBook，Github等）
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;