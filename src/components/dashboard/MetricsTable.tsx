import { motion } from "framer-motion";
import { segmentData, formatCurrency, formatNumber, formatPercent } from "@/data/kpiData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const metricsRows = [
  { label: "Panier Moyen", value: formatCurrency(segmentData.metrics.averageBasket) },
  { label: "Fréquence d'Achat Moy.", value: segmentData.metrics.avgPurchaseFrequency.toFixed(2) },
  { label: "Prix Unitaire Moyen", value: formatCurrency(segmentData.metrics.avgUnitPrice) },
  { label: "CLV Moyen", value: formatCurrency(segmentData.metrics.customerLifetimeValue) },
  { label: "Pénétration Produit", value: formatPercent(segmentData.metrics.productPenetrationPercent) },
  { label: "Marge Bénéficiaire", value: formatPercent(segmentData.metrics.profitMarginPercent) },
  { label: "Croissance MoM", value: formatPercent(segmentData.metrics.salesGrowthMoM) },
  { label: "Moyenne Mobile (3m)", value: formatCurrency(segmentData.metrics.salesMA3) },
  { label: "Ventes par Client", value: formatCurrency(segmentData.metrics.salesPerCustomer) },
  { label: "Coût Total", value: formatCurrency(segmentData.metrics.totalCost) },
  { label: "Quantité Totale", value: formatNumber(segmentData.metrics.totalQuantity) },
  { label: "Produits Uniques", value: segmentData.metrics.uniqueProductsSold.toString() },
];

export function MetricsTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="chart-container"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Métriques Détaillées</h3>
        <p className="text-sm text-muted-foreground">Segment {segmentData.segment}</p>
      </div>
      <div className="max-h-[320px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Métrique</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Valeur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metricsRows.map((row, index) => (
              <TableRow key={row.label} className="border-border/30 hover:bg-muted/30">
                <TableCell className="text-sm">{row.label}</TableCell>
                <TableCell className="text-sm font-medium text-right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
