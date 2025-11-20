import { Button } from "./ui/button";
type Props = {
    icon: React.ReactNode;
    className?: string;
    variant?:  "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
    onClick?: () => void;
}

export default function IconButton({ icon, className, variant, onClick }: Props) {
    return (
        <Button variant={variant} className={className} onClick={onClick}>{icon}</Button>
    )
}