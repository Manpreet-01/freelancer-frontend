import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, ButtonProps } from "@/components/ui/button";
import { MouseEvent, MouseEventHandler, ReactNode } from "react";


type Props = {
    onContinue: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
} & ButtonProps;

export function ConfirmPopup({ children, onContinue, ...rest }: Props) {

    function handleContinue(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        onContinue(e);
    }

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
    }

    function handleCancel(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button onClick={handleClick} variant="outline" {...rest}>{children}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-x-2">
                    <AlertDialogCancel
                        onClick={handleCancel}
                        className="hover:scale-x-105"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleContinue}
                        className="hover:bg-destructive hover:text-destructive-foreground hover:scale-x-105"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
