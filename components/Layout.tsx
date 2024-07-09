import Link from "next/link";
import links from "@/config/links";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname()
   const [_, path0] = pathname?.split("/") || [];

  return (
  <div className="flex h-screen">
    <aside className="w-2/12 flex flex-col items-center gap-24 py-12 shadow-xl">
      <a href="/">
        <img className="w-44" src="/vercel.svg" alt="" />
      </a>

      <ul className="flex flex-col gap-8">
        {links.map((link) => {
          const LinkIcon = link.icon;
              return (              
              <Link 
                key={link.href} 
                href={link.href}
                className={`${
                  `/${path0}` === link.href
                    ? "border-[#0070f3] text-[#0070f3]"
                    : ""
                } text-black border-b-2 border-transparent hover:border-[#0070f3] hover:text-[#0070f3] flex items-center py-3 gap-4`}
                >
                  <LinkIcon className="w-8" />
                  <span className="text-nowrap">{link.name}</span>
              </Link>
          );
        })}
      </ul>
    </aside>    
    <main className="flex-grow flex justify-center items-center">
      {children}
    </main>  
  </div>    
  )
}
