interface ProgressBarProps {
    progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const progressBarStyle = `w-${progress} bg-secondary-light text-white px-1 py-1`;

    return (
        <div className="w-full bg-gray-200 overflow-hidden rounded-full">
            <div className={`text-center text-xs ${progressBarStyle}`} style={{ width: `${progress}%` }} />
        </div>
    );
};
