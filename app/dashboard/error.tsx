// app/invoice/error.tsx
'use client'; // 错误边界必须是客户端组件

import { useEffect } from 'react';
import Link from "next/link";

export default function Error({
	                              error,
	                              reset,
                              }: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// 可以在这里记录错误到日志服务
		console.error('Invoice Error:', error);
	}, [error]);

	return (
		<div className="flex h-[60vh] flex-col items-center justify-center">
			<h2 className="text-2xl font-bold text-red-600">系统出现错误</h2>
			<p className="mt-2 text-gray-600">{error.message}</p>
			<button
				onClick={() => reset()} // 尝试重新渲染
				className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			>重试操作
			</button>
			<Link
				href="/dashboard/invoices"
				className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
			>回退
			</Link>
		</div>
	);
}