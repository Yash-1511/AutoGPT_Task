import Navbar from '@/components/Navbar'
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({subsets:['latin'],weight:"400"})
export const metadata = {
  title: 'AutoGPT Task',
  description: 'AutoGPT',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
