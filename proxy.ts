/**
 * 这个文件的作用监听页面渲染，并且是在渲染前进行执行
 * 进行权限等相关的认证，认证的配置是用的 auth.config.ts
 */

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
	// https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
	// 需要被包括的路由，下面的配置处理 api，静态资源，路由配置文件等不需要进行验证之外的所有理由都需要监听
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};