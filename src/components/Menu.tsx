import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./mode-toggle";
import { Link } from '@tanstack/react-router';

export function Menu() {
    return (
        <div className="flex justify-between">
            <Menubar className="gap-8">
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link to="/" className="[&.active]:font-bold">
                            Home
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link to="/jobs" className="[&.active]:font-bold">
                            Jobs
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                    <Link to="/profile" className="[&.active]:font-bold">
                            Profile
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link to="/login" className="[&.active]:font-bold">
                            Login
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
            </Menubar>

            <div className="pr-4">
                <ModeToggle />
            </div>
        </div>
    );
}
