import { UserGroupIcon, NewspaperIcon, PresentationChartBarIcon } from "@heroicons/react/24/outline";

const links = [
  {
    name: "Ingresos y Egresos",
    description: "Sistema de gestión de ingresos y gastos",
    href: "/ingresos-egresos",
    icon: NewspaperIcon,
    permission: 'USER'
  },
  {
    name: "Usuarios",
    description: "Gestión de usuarios",
    href: "/usuarios",
    icon: UserGroupIcon,
    permission: 'ADMIN'
  },
  {
    name: "Reportes",
    description: "Reportes",
    href: "/reportes",
    icon: PresentationChartBarIcon,
    permission: 'ADMIN'
  }
]

export default links