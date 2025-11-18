import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

type Props = {
    children: React.ReactNode | string,
    message: string;
}

export default function TooTip({ children, message }: Props) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent>
                    <p className="dark:text-white">{message}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}