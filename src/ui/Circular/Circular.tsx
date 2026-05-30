
interface CircularProps {
    progress?: number;
    size?: number;
    strokeWidth?: number;
}
export const Circular = ({
    progress = 75,
    size = 241,
    strokeWidth = 24
}: CircularProps) => {
    const center = size / 2;
    const radius = center - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (progress / 100) * circumference;
    return (
        <div
            style={{
                width: size,
                height: size,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <svg width={size} height={size}>
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="#FFFAEC"
                    stroke="#FFE7AE"
                    strokeWidth={strokeWidth}
                />

                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke="#008616"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform={`rotate(-140 ${center} ${center})`}
                />

                <text
                    x="50%"
                    y="48%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="28"
                    fill="#333"
                    fontWeight="500"
                >
                    {progress}%
                </text>

                <text
                    x="50%"
                    y="60%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontSize="20"
                    fill="#333"
                >
                    Изучено
                </text>
            </svg>
        </div>
    )
}
