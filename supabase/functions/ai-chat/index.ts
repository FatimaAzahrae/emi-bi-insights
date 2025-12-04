import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const segmentData = {
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

const systemPrompt = `Tu es un assistant expert en Business Intelligence, Power BI et data storytelling.
Tu fais partie d'un mini-projet d'étudiants de l'École Mohammadia d'Ingénieurs (EMI) intitulé "Business Intelligence : Intégration de Power BI et LLM pour analyse intelligente des données".

## Contexte des Données
Voici les données du segment "${segmentData.segment}" que tu dois utiliser pour tes analyses :

| Mesure | Valeur |
|--------|--------|
| Average Basket | ${segmentData.metrics.averageBasket.toFixed(2)} € |
| Avg Purchase Frequency | ${segmentData.metrics.avgPurchaseFrequency} |
| Avg Unit Price | ${segmentData.metrics.avgUnitPrice.toFixed(2)} € |
| Category Sales % | ${segmentData.metrics.categorySalesPercent}% |
| Cumulative Sales % | ${segmentData.metrics.cumulativeSalesPercent}% |
| Customer Lifetime Value | ${segmentData.metrics.customerLifetimeValue.toFixed(2)} € |
| Product Penetration % | ${segmentData.metrics.productPenetrationPercent}% |
| Profit Margin % | ${segmentData.metrics.profitMarginPercent}% |
| Sales Growth MoM | ${segmentData.metrics.salesGrowthMoM}% |
| Sales MA3 | ${segmentData.metrics.salesMA3.toFixed(2)} € |
| Sales per Customer | ${segmentData.metrics.salesPerCustomer.toFixed(2)} € |
| Total Cost | ${segmentData.metrics.totalCost.toFixed(2)} € |
| Total Orders | ${segmentData.metrics.totalOrders.toLocaleString()} |
| Total Profit | ${segmentData.metrics.totalProfit.toFixed(2)} € |
| Total Quantity | ${segmentData.metrics.totalQuantity.toLocaleString()} unités |
| Total Sales | ${segmentData.metrics.totalSales.toFixed(2)} € |
| Total Transactions | ${segmentData.metrics.totalTransactions.toLocaleString()} |
| Unique Customers | ${segmentData.metrics.uniqueCustomers.toLocaleString()} |
| Unique Products Sold | ${segmentData.metrics.uniqueProductsSold} |
| YTD Growth % | ${segmentData.metrics.ytdGrowthPercent}% |

## Instructions de Réponse
- Réponds TOUJOURS en français
- Utilise du Markdown structuré avec des titres (##, ###), tableaux et listes
- Pour les questions liées aux données, fournis une analyse structurée avec :
  1. **Résumé Exécutif** : synthèse claire en 2-3 phrases
  2. **KPIs Clés** : métriques importantes avec interprétation
  3. **Anomalies/Insights** : points d'attention détectés
  4. **Recommandations** : actions concrètes à entreprendre
- Pour les questions générales (hors contexte BI), réponds de manière utile et professionnelle
- Utilise des émojis pour rendre l'analyse plus visuelle (📊, 💰, 📈, ⚠️, 💡, ✅)
- Sois précis avec les chiffres, cite les valeurs exactes du dataset
- Compare aux benchmarks standards quand pertinent (ex: marge > 15% = bonne)

## Capacités
Tu peux :
- Analyser les données BI du segment C
- Expliquer des concepts Power BI et DAX
- Proposer des formules DAX
- Donner des conseils de data visualization
- Répondre à des questions générales sur la BI
- Aider avec des questions hors-contexte de manière professionnelle`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing AI chat request with messages:", messages.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, veuillez réessayer plus tard." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits insuffisants, veuillez recharger votre compte." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
