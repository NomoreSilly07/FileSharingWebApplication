import { cn } from "../../utils/cn";

export function Card({ children, className }) {
    return (
        <div className={cn("bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8", className)}>
            {children}
        </div>
    );
}
