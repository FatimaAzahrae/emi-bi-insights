import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { segmentDistribution } from "@/data/kpiData";

export function SegmentPieChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="chart-container"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Segmentation ABC</h3>
        <p className="text-sm text-muted-foreground">Distribution des clients par segment</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={segmentDistribution}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {segmentDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 47%, 10%)",
              border: "1px solid hsl(217, 33%, 18%)",
              borderRadius: "8px",
              color: "hsl(210, 40%, 98%)",
            }}
            formatter={(value: number) => [`${value}%`, '']}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-2 mt-2">
        {segmentDistribution.map((segment) => (
          <div key={segment.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-muted-foreground">{segment.name}</span>
            </div>
            <span className="font-medium">{segment.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
