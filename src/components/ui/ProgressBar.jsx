import { cn } from "../../utils/cn";

export function ProgressBar({ progress, className }) {
    return (
        <div className={cn("w-full bg-gray-200 rounded-full h-2.5", className)}>
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
        </div>
    );
}
