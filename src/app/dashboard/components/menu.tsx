import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import React from "react";

export function Menu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="font-bold">Graphy</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About Graphy</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Register</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Artist</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}