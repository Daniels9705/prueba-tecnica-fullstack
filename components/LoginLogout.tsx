import { useUser } from "@auth0/nextjs-auth0/client";
import { PowerIcon, UserIcon } from "@heroicons/react/24/outline";

export default function LoginLogout() {

    //obtener datos del usuario
    const { isLoading, user } = useUser();
    if (isLoading) return null;  
    
    return (
    <>
        {
            user ?
            <a 
                href="/api/auth/logout"
                className={`hover:text-[#0070f3] flex items-center py-3 gap-4`}
                >
                <PowerIcon className="w-8" />
                <span>Cerrar Sesión</span>
            </a>
            :
            <a 
                href="/api/auth/login"
                className={`hover:text-[#0070f3] flex items-center py-3 gap-4`}
                >
                <UserIcon className="w-8" />
                <span>Iniciar Sesión</span>
            </a>
            
        }
    </>
    )
}
