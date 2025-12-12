import '@/app/ui/global.css'
import { inter } from "@/app/ui/fonts"

/**
 * 根框架组件
 * @param children
 * @constructor
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
	console.log('刷新了嘛')
	return (
		<html lang="en">
			<body className={ `${ inter.className } antialiased` }>{ children }</body>
		</html>
	);
}
