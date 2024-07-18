import Link from "next/link";
import links from "@/config/links";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "../components/theme-toggle-button";
import VercelSVG from "../components/svg/vercelSVG";
import LoginLogout from "@/components/LoginLogout";
import { useUser } from "@auth0/nextjs-auth0/client";

function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname()
  const [_, path0] = pathname?.split("/") || [];

  //obtener datos del usuario
  const { error, isLoading, user } = useUser();
  if (isLoading) return <div>Cargando...</div>;
  if (error)return <div>Error</div>;        

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      >
      <div className="flex h-screen">
        <aside className="w-2/12 flex flex-col items-center gap-24 py-12 shadow-xl">
          <a href="/">
            <VercelSVG />
          </a>

          <ul className="flex flex-col gap-8">
            {links.map((link) => {
              {
                const LinkIcon = link.icon;

                if(link.permission === user?.role || user?.role === 'ADMIN') {
                  return (              
                    <Link 
                    key={link.href} 
                    href={link.href}
                    className={`${
                      `/${path0}` === link.href
                      ? "border-[#0070f3] text-[#0070f3]"
                      : ""
                    } border-b-2 border-transparent hover:border-[#0070f3] hover:text-[#0070f3] flex items-center py-3 gap-4`}
                    >
                      <LinkIcon className="w-8" />
                      <span className="text-nowrap">{link.name}</span>
                  </Link>
                  );
                }

              }
            })}            
            <LoginLogout />
            </ul>
            </aside>
            <main className="flex-grow flex justify-center items-center ">
          {children}
        </main>  
        <div className="fixed right-4 top-4">
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Layout
