import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import React from "react";
import Link from "next/link";

export function Menu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="font-bold">
          <Link href="/dashboard" key="/dashboard">
            Graphy
          </Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Register</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Link href="/dashboard/artist/register">
              Artist
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}