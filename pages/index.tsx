import Link from "next/link";
import links from "@/config/links";

export default function Home() {
  return <>
    <div className="flex gap-8">
        {
          links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded"
                >
                  {link.description}
              </Link>
          ))
        }
      </div>
  </>;
}
