import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { productCategories } from "@/data/kpiData";

export function ProductBarChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="chart-container col-span-2"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Ventes par Catégorie</h3>
        <p className="text-sm text-muted-foreground">Performance des catégories de produits</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={productCategories} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 18%)" horizontal={false} />
          <XAxis
            type="number"
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <YAxis
            type="category"
            dataKey="category"
            stroke="hsl(215, 20%, 55%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222, 47%, 10%)",
              border: "1px solid hsl(217, 33%, 18%)",
              borderRadius: "8px",
              color: "hsl(210, 40%, 98%)",
            }}
            formatter={(value: number) => [`${(value / 1000000).toFixed(2)}M €`, 'Ventes']}
          />
          <Bar
            dataKey="sales"
            fill="hsl(199, 89%, 48%)"
            radius={[0, 4, 4, 0]}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
