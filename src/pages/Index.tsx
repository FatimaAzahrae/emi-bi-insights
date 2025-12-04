import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, ShoppingCart, TrendingUp, Percent, Target, BarChart3, Activity } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { KPICard } from "@/components/dashboard/KPICard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { SegmentPieChart } from "@/components/dashboard/SegmentPieChart";
import { ProductBarChart } from "@/components/dashboard/ProductBarChart";
import { MetricsTable } from "@/components/dashboard/MetricsTable";
import { AIChat } from "@/components/dashboard/AIChat";
import { kpiCards, segmentData, formatCurrency, formatPercent } from "@/data/kpiData";
import { cn } from "@/lib/utils";

const tabContent = {
  overview: {
    title: "Vue d'ensemble",
    subtitle: "Analyse globale des performances business"
  },
  customers: {
    title: "Analyse Clients",
    subtitle: "Segmentation ABC et comportements d'achat"
  },
  sales: {
    title: "Performance Ventes",
    subtitle: "Tendances et évolution du chiffre d'affaires"
  },
  products: {
    title: "Analyse Produits",
    subtitle: "Catégories et performances produits"
  },
  assistant: {
    title: "Assistant IA",
    subtitle: "Analyse intelligente avec Power BI + LLM"
  }
};

const iconMap = {
  sales: DollarSign,
  customer: Users,
  product: ShoppingCart,
  financial: Percent
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const content = tabContent[activeTab as keyof typeof tabContent];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main className={cn(
        "transition-all duration-300 p-6",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <Header title={content.title} subtitle={content.subtitle} />

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Chiffre d'Affaires"
                value={formatCurrency(segmentData.metrics.totalSales)}
                trend={58.01}
                icon={<DollarSign className="h-5 w-5" />}
                delay={0}
              />
              <KPICard
                title="Profit Total"
                value={formatCurrency(segmentData.metrics.totalProfit)}
                trend={11.43}
                icon={<TrendingUp className="h-5 w-5" />}
                delay={0.1}
              />
              <KPICard
                title="Clients Uniques"
                value={segmentData.metrics.uniqueCustomers.toLocaleString()}
                icon={<Users className="h-5 w-5" />}
                delay={0.2}
              />
              <KPICard
                title="Commandes"
                value={segmentData.metrics.totalOrders.toLocaleString()}
                icon={<ShoppingCart className="h-5 w-5" />}
                delay={0.3}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SalesChart />
              <SegmentPieChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ProductBarChart />
              <MetricsTable />
            </div>
          </motion.div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Clients Uniques"
                value={segmentData.metrics.uniqueCustomers.toLocaleString()}
                icon={<Users className="h-5 w-5" />}
                delay={0}
              />
              <KPICard
                title="CLV Moyen"
                value={formatCurrency(segmentData.metrics.customerLifetimeValue)}
                icon={<Target className="h-5 w-5" />}
                delay={0.1}
              />
              <KPICard
                title="Panier Moyen"
                value={`${segmentData.metrics.averageBasket.toFixed(2)} €`}
                icon={<ShoppingCart className="h-5 w-5" />}
                delay={0.2}
              />
              <KPICard
                title="Fréquence Achat"
                value={segmentData.metrics.avgPurchaseFrequency.toFixed(2)}
                icon={<Activity className="h-5 w-5" />}
                delay={0.3}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SegmentPieChart />
              <MetricsTable />
            </div>
          </motion.div>
        )}

        {/* Sales Tab */}
        {activeTab === "sales" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="CA Total"
                value={formatCurrency(segmentData.metrics.totalSales)}
                trend={58.01}
                icon={<DollarSign className="h-5 w-5" />}
                delay={0}
              />
              <KPICard
                title="Croissance MoM"
                value={formatPercent(segmentData.metrics.salesGrowthMoM)}
                trend={3.26}
                icon={<TrendingUp className="h-5 w-5" />}
                delay={0.1}
              />
              <KPICard
                title="Ventes/Client"
                value={formatCurrency(segmentData.metrics.salesPerCustomer)}
                icon={<BarChart3 className="h-5 w-5" />}
                delay={0.2}
              />
              <KPICard
                title="Marge"
                value={formatPercent(segmentData.metrics.profitMarginPercent)}
                icon={<Percent className="h-5 w-5" />}
                delay={0.3}
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <SalesChart />
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Produits Vendus"
                value={segmentData.metrics.uniqueProductsSold.toString()}
                icon={<ShoppingCart className="h-5 w-5" />}
                delay={0}
              />
              <KPICard
                title="Quantité Totale"
                value={segmentData.metrics.totalQuantity.toLocaleString()}
                icon={<BarChart3 className="h-5 w-5" />}
                delay={0.1}
              />
              <KPICard
                title="Prix Unitaire Moy."
                value={`${segmentData.metrics.avgUnitPrice.toFixed(2)} €`}
                icon={<DollarSign className="h-5 w-5" />}
                delay={0.2}
              />
              <KPICard
                title="Pénétration"
                value={formatPercent(segmentData.metrics.productPenetrationPercent)}
                icon={<Target className="h-5 w-5" />}
                delay={0.3}
              />
            </div>

            <ProductBarChart />
          </motion.div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === "assistant" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <AIChat />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;
