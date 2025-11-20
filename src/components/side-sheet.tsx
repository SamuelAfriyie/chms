import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import type { ReactNode } from "react"

interface SheetProps {
    open: boolean,
    title?: string,
    description?: string,
    children?: ReactNode,
    footer?: ReactNode,
    onOpenChange?: (v: boolean) => void
}

export function SideSheet({ open, title, description, children, footer, onOpenChange }: SheetProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader >
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                {children}
                <SheetFooter>
                    {footer}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
