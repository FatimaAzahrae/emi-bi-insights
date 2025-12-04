import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  trend?: number;
  icon: React.ReactNode;
  delay?: number;
}

export function KPICard({ title, value, trend, icon, delay = 0 }: KPICardProps) {
  const getTrendIcon = () => {
    if (!trend) return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-accent" />;
    return <TrendingDown className="h-4 w-4 text-destructive" />;
  };

  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground";
    if (trend > 0) return "text-accent";
    return "text-destructive";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="stat-card group"
    >
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        {trend !== undefined && (
          <div className={cn("flex items-center gap-1 text-sm font-medium", getTrendColor())}>
            {getTrendIcon()}
            <span>{Math.abs(trend).toFixed(1)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
