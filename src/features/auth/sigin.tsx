import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

const Signin = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/dashboard", { replace: true });
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <Button onClick={handleNavigation}>Navigate to Dashbaord</Button>
        </div>
    )
}

export default Signin;