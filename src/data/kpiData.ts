export interface KPIData {
  name: string;
  value: number;
  formatted: string;
  unit?: string;
  trend?: number;
  category: 'sales' | 'customer' | 'product' | 'financial';
}

export const segmentData = {
  segment: "C - Bottom 5%",
  metrics: {
    averageBasket: 905.62,
    avgPurchaseFrequency: 6.56,
    avgUnitPrice: 465.18,
    categorySalesPercent: 100,
    cumulativeSalesPercent: 96.58,
    customerLifetimeValue: 38966.61,
    productPenetrationPercent: 118.64,
    profitMarginPercent: 11.43,
    salesGrowthMoM: 3.26,
    salesMA3: 4244550.58,
    salesPerCustomer: 5940.45,
    totalCost: 97257907.95,
    totalOrders: 121253,
    totalProfit: 12551366.25,
    totalQuantity: 274776,
    totalSales: 109809274.20,
    totalTransactions: 121253,
    uniqueCustomers: 18485,
    uniqueProductsSold: 350,
    ytdGrowthPercent: 58.01,
  }
};

export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M €`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K €`;
  }
  return `${value.toFixed(2)} €`;
};

export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString('fr-FR');
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const kpiCards: KPIData[] = [
  {
    name: "Chiffre d'Affaires Total",
    value: segmentData.metrics.totalSales,
    formatted: formatCurrency(segmentData.metrics.totalSales),
    trend: 58.01,
    category: 'sales'
  },
  {
    name: "Profit Total",
    value: segmentData.metrics.totalProfit,
    formatted: formatCurrency(segmentData.metrics.totalProfit),
    trend: 11.43,
    category: 'financial'
  },
  {
    name: "Clients Uniques",
    value: segmentData.metrics.uniqueCustomers,
    formatted: formatNumber(segmentData.metrics.uniqueCustomers),
    category: 'customer'
  },
  {
    name: "Commandes Totales",
    value: segmentData.metrics.totalOrders,
    formatted: formatNumber(segmentData.metrics.totalOrders),
    category: 'sales'
  },
  {
    name: "Panier Moyen",
    value: segmentData.metrics.averageBasket,
    formatted: `${segmentData.metrics.averageBasket.toFixed(2)} €`,
    category: 'customer'
  },
  {
    name: "CLV Moyen",
    value: segmentData.metrics.customerLifetimeValue,
    formatted: formatCurrency(segmentData.metrics.customerLifetimeValue),
    category: 'customer'
  },
  {
    name: "Marge Bénéficiaire",
    value: segmentData.metrics.profitMarginPercent,
    formatted: formatPercent(segmentData.metrics.profitMarginPercent),
    category: 'financial'
  },
  {
    name: "Croissance YTD",
    value: segmentData.metrics.ytdGrowthPercent,
    formatted: formatPercent(segmentData.metrics.ytdGrowthPercent),
    trend: 58.01,
    category: 'sales'
  }
];

export const salesTrendData = [
  { month: 'Jan', sales: 8500000, profit: 970000 },
  { month: 'Fév', sales: 9200000, profit: 1050000 },
  { month: 'Mar', sales: 8800000, profit: 1005000 },
  { month: 'Avr', sales: 9500000, profit: 1085000 },
  { month: 'Mai', sales: 10200000, profit: 1165000 },
  { month: 'Juin', sales: 9800000, profit: 1120000 },
  { month: 'Juil', sales: 10500000, profit: 1200000 },
  { month: 'Août', sales: 9000000, profit: 1030000 },
  { month: 'Sept', sales: 10800000, profit: 1235000 },
  { month: 'Oct', sales: 11200000, profit: 1280000 },
  { month: 'Nov', sales: 11500000, profit: 1315000 },
  { month: 'Déc', sales: 10809274, profit: 1095366 },
];

export const segmentDistribution = [
  { name: 'Segment A - Top 20%', value: 65, color: 'hsl(162, 63%, 41%)' },
  { name: 'Segment B - Middle 75%', value: 30, color: 'hsl(199, 89%, 48%)' },
  { name: 'Segment C - Bottom 5%', value: 5, color: 'hsl(280, 65%, 60%)' },
];

export const productCategories = [
  { category: 'Électronique', sales: 35000000, quantity: 85000 },
  { category: 'Vêtements', sales: 28000000, quantity: 72000 },
  { category: 'Maison', sales: 22000000, quantity: 58000 },
  { category: 'Alimentation', sales: 15000000, quantity: 42000 },
  { category: 'Sports', sales: 9809274, quantity: 17776 },
];
