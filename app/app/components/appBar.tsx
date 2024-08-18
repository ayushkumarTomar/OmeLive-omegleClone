import Image from 'next/image'
import { Poppins } from 'next/font/google';
import Link from 'next/link';


const textFont = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
function AppBar({
    online
}: {
    online: string
}) {
    return (
        <div className=" top-0 left-0 w-full z-10 bg-zinc-900 shadow-md pt-2 pb-1 flex flex-wrap justify-between items-center border-b border-zinc-900">
    <Link href="/">
        <Image
            src="/removeBGOmegle.png"
            width={100}
            height={70}
            alt="logo"
            className="ml-4 md:ml-8"
        />
    </Link>
    <div className="flex flex-wrap gap-4 items-center text-white font-semibold mr-4 md:mr-8">
        <h1 className="text-sm md:text-base">ONLINE USERS 🔴 {online}</h1>
        <Link href="/">
            <div className="rounded-lg bg-slate-600 p-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </div>
        </Link>
    </div>
</div>

    )
}

export default AppBar