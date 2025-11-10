interface EnergyBadgeProps {
  energy: "high" | "low" | "virtual";
  size?: "sm" | "md" | "lg";
  showBackground?: boolean;
}

export function EnergyBadge({ energy, size = "md", showBackground = true }: EnergyBadgeProps) {
  const configs = {
    high: {
      label: "High Energy",
      color: "#CEFEB8",
      bgColor: "bg-[#CEFEB8]/10",
      textColor: "text-[#CEFEB8]",
    },
    low: {
      label: "Low Energy",
      color: "#E8B8FE",
      bgColor: "bg-[#E8B8FE]/10",
      textColor: "text-[#E8B8FE]",
    },
    virtual: {
      label: "Virtual",
      color: "#7DD3FC",
      bgColor: "bg-[#7DD3FC]/10",
      textColor: "text-[#7DD3FC]",
    },
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const config = configs[energy];

  if (!showBackground) {
    return (
      <span className={`${config.textColor} ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}`}>
        {config.label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-lg ${config.bgColor} ${config.textColor} ${sizeClasses[size]}`}
    >
      {config.label}
    </span>
  );
}
