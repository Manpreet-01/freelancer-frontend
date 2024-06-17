import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./mode-toggle";

export function Menu() {
    return (
        <div className="flex justify-between">
            <Menubar className="gap-8">
                <MenubarMenu>
                    <MenubarTrigger>Home</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Jobs</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Profile</MenubarTrigger>
                </MenubarMenu>
            </Menubar>

            <div className="pr-4">
                <ModeToggle />
            </div>
        </div>
    );
}
