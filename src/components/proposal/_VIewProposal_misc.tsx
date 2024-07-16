import { Button } from "../ui/button";
import { LinkIcon, TimerReset, User } from "lucide-react";
import { timeSince } from "@/lib/timeFormatter";
import { Link } from '@tanstack/react-router';

import type { Proposal } from "@/types/job.types";
import { Badge } from "../ui/badge";

export const UserInfo = ({ user }: { user: Proposal["user"] }) => (
    <div className="flex gap-x-2 items-center">
        <User />
        <span>{user?.name}</span>
        {user?.isAvailableNow &&
            <Badge className="bg-blue-700 py-1.5 px-3 text-xs text-white">Available now</Badge>
        }
    </div>
);

export const UserProfileLink = ({ username }: { username: string; }) => (
    <div className="flex items-center">
        <LinkIcon />
        <Button variant="link" className="pl-2 text-blue-500 hover:scale-110 hover:text-blue-400 underline decoration-dotted hover:decoration-solid">
            <Link
                to="/profile/$username"
                target="_blank"
                params={{ username }}
                className="flex items-center"
            >
                <span>@{username}</span>
            </Link>
        </Button>
    </div>
);

export const CreatedAt = ({ date }: { date: string; }) => (
    <div className="flex gap-x-2" title="CreatedAt">
        <TimerReset size={20} />
        <span>Created: </span>
        <span className="text-gray-500">{timeSince(date)}</span>
    </div>
);