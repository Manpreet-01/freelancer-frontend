import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createLazyFileRoute, Outlet } from '@tanstack/react-router';
import { Search } from 'lucide-react';

export const Route = createLazyFileRoute('/(search)/search')({
    component: SearchsLayout,
});

function SearchsLayout() {
    return (
        <div className='m-4'>
            <div className="flex justify-between  items-center">
                <h1 className='m-8 text-3xl font-bold'>Search</h1>
                <div className="flex gap-x-2">
                    <div className="flex gap-x-2">
                        <Input />
                        <ModeToggle />
                    </div>
                    <Button>
                        <Search />
                    </Button>
                </div>
            </div>

            <Outlet />
        </div>
    );
};



import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';

export function ModeToggle() {
    const [searchType, setSearchType] = useState("Jobs");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default">{searchType}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSearchType("Freelancers")}>
                    Freelancers
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchType("Jobs")}>
                    Jobs
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
