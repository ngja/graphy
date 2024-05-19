import {Menu} from "./components/menu"
import {Sidebar} from "./components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Menu/>
      <div className="grid grid-cols-6">
        <Sidebar/>
        <div className="col-span-5 border-l">
          <div className="h-screen px-4 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}