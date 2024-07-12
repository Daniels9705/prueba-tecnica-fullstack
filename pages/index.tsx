import Link from "next/link";
import links from "@/config/links";
import { useTheme } from 'next-themes'

export default function Home() {
  
  const { theme } = useTheme()

  return <>
    <div className="flex gap-8">
        {
          links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`${theme === 'dark' ? 'bg-[#0070f3] text-white' : 'bg-black text-white hover:bg-[#0070f3]'} font-medium py-4 px-4 rounded w-[250px] flex items-center justify-center text-center shadow-[0_0_15px_0_rgba(0,0,0,0.1)]`}
                >
                  {link.description}
              </Link>
          ))
        }
      </div>
  </>;
}
