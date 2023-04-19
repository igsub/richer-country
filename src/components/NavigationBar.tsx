import Link from "next/link"
import {
  Menubar,
  MenubarMenu,
} from "./ui/menubar"
 
export default function NavigationBar() {
  return (
    <Menubar className="flex justify-center gap-10 text-xl">
      <MenubarMenu>
        <Link href={"/"}>Home</Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link href={"/stats"}>Stats</Link>
      </MenubarMenu>
    </Menubar>
  )
}