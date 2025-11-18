import { useGridHeight } from "@/store/grid-height-store";
import React, { useEffect, useRef } from "react";

interface AutoResponsiveProps {
    children: React.ReactNode;
}

const AutoResponsive: React.FC<AutoResponsiveProps> = ({ children }) => {
    const isFormVisible = false;
    const { height, setHeight } = useGridHeight();
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTableHeight = () => {
            const windowHeight = window.innerHeight;
            const containerTop = containerRef.current?.offsetTop || 0;
            const formHeight = formRef.current?.offsetHeight || 0;
            const newTableHeight = windowHeight - containerTop - (isFormVisible ? formHeight : 0) - 20;

            setHeight(newTableHeight > 200 ? newTableHeight : 200); // Minimum height
        };

        updateTableHeight();
        window.addEventListener("resize", updateTableHeight);
        return () => window.removeEventListener("resize", updateTableHeight);
    }, [isFormVisible]);

    return (
        <div ref={containerRef} style={{ width: "100%" }}>
            {/* Table */}
            <div style={{ height: height }}>
                {children}
            </div>
        </div>
    );
};

export default AutoResponsive;
