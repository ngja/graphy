import {Button} from "@/components/ui/button";
import Link from "next/link";

const sidebarButtons = [
  {
    name: "Person",
    href: "/dashboard/person",
  },
  {
    name: "Song",
    href: "/dashboard/song",
  },
  {
    name: "artist",
    href: "/dashboard/artist",
  }
]

export function Sidebar() {
  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Discover
          </h2>
          <div className="space-y-1">
            {
              sidebarButtons.map((sidebarButton, index) => (
                <Link href={sidebarButton.href} key={sidebarButton.href}>
                  <Button variant="ghost" className="w-full justify-start">
                    {sidebarButton.name}
                  </Button>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}