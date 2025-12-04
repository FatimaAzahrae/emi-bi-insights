import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { segmentData, formatCurrency, formatPercent } from "@/data/kpiData";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "Analyse le segment C - Bottom 5%",
  "Quels sont les KPIs les plus importants ?",
  "Comment améliorer la marge bénéficiaire ?",
  "Quelles anomalies détectes-tu ?",
  "Propose des recommandations business",
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes("segment c") || q.includes("bottom 5")) {
      return `## 📊 Analyse du Segment C - Bottom 5%

### Résumé Exécutif
Le segment C représente les 5% de clients à plus faible contribution, avec un CA total de **${formatCurrency(segmentData.metrics.totalSales)}**.

### 🎯 KPIs Clés
| Métrique | Valeur | Interprétation |
|----------|--------|----------------|
| Panier Moyen | **${segmentData.metrics.averageBasket.toFixed(2)} €** | Inférieur à la moyenne globale |
| CLV | **${formatCurrency(segmentData.metrics.customerLifetimeValue)}** | Potentiel de fidélisation |
| Marge | **${formatPercent(segmentData.metrics.profitMarginPercent)}** | Acceptable mais optimisable |
| Croissance YTD | **${formatPercent(segmentData.metrics.ytdGrowthPercent)}** | ✅ Excellente dynamique |

### ⚠️ Anomalies Détectées
1. **Pénétration produit élevée (118.64%)** : Clients qui achètent plusieurs fois le même produit
2. **Fréquence d'achat modérée (6.56)** : Opportunité de programmes de fidélité

### 💡 Recommandations
- Implémenter un programme de fidélité ciblé
- Proposer des bundles pour augmenter le panier moyen
- Analyser les causes de la faible CLV pour améliorer la rétention`;
    }
    
    if (q.includes("kpi") || q.includes("important")) {
      return `## 🎯 KPIs Prioritaires

### Top 5 Indicateurs Stratégiques

1. **Chiffre d'Affaires Total** : ${formatCurrency(segmentData.metrics.totalSales)}
   - Croissance YTD : +${formatPercent(segmentData.metrics.ytdGrowthPercent)}
   
2. **Marge Bénéficiaire** : ${formatPercent(segmentData.metrics.profitMarginPercent)}
   - Profit généré : ${formatCurrency(segmentData.metrics.totalProfit)}
   
3. **Customer Lifetime Value** : ${formatCurrency(segmentData.metrics.customerLifetimeValue)}
   - Indicateur clé de la valeur client
   
4. **Panier Moyen** : ${segmentData.metrics.averageBasket.toFixed(2)} €
   - Levier d'optimisation revenue
   
5. **Croissance MoM** : ${formatPercent(segmentData.metrics.salesGrowthMoM)}
   - Dynamique mensuelle positive`;
    }
    
    if (q.includes("marge") || q.includes("profit")) {
      return `## 💰 Analyse de la Marge Bénéficiaire

### État Actuel
- **Marge** : ${formatPercent(segmentData.metrics.profitMarginPercent)}
- **Profit Total** : ${formatCurrency(segmentData.metrics.totalProfit)}
- **Coût Total** : ${formatCurrency(segmentData.metrics.totalCost)}

### Leviers d'Amélioration
1. **Optimisation des coûts d'approvisionnement** (-5% coûts = +5.7M€ profit)
2. **Révision du mix produit** vers les références à haute marge
3. **Négociation des conditions fournisseurs**
4. **Réduction des promotions non ciblées**

### Objectif Recommandé
Passer de 11.43% à **15%** de marge en 12 mois`;
    }
    
    if (q.includes("anomalie") || q.includes("problème")) {
      return `## ⚠️ Détection d'Anomalies

### Anomalies Identifiées

1. **Pénétration Produit > 100%** (${formatPercent(segmentData.metrics.productPenetrationPercent)})
   - Clients qui rachètent les mêmes produits multiples fois
   - Action : Analyser les patterns de réachat
   
2. **Écart CA/Profit**
   - CA : ${formatCurrency(segmentData.metrics.totalSales)}
   - Profit : ${formatCurrency(segmentData.metrics.totalProfit)}
   - Ratio : 11.43% seulement
   
3. **Ventes Cumulées** : ${formatPercent(segmentData.metrics.cumulativeSalesPercent)}
   - Le segment C contribue à presque 97% des ventes cumulées

### Recommandations
- Audit des coûts cachés
- Vérification des remises accordées
- Analyse des retours produits`;
    }
    
    return `## 📈 Analyse Business Intelligence

Merci pour votre question ! Voici une analyse basée sur les données du segment **${segmentData.segment}** :

### Métriques Principales
- **CA Total** : ${formatCurrency(segmentData.metrics.totalSales)}
- **Clients Uniques** : ${segmentData.metrics.uniqueCustomers.toLocaleString()}
- **Commandes** : ${segmentData.metrics.totalOrders.toLocaleString()}
- **Croissance** : +${formatPercent(segmentData.metrics.ytdGrowthPercent)}

### 💡 Insights
Les données montrent une dynamique positive avec une croissance YTD de **58%**. Le panier moyen de **${segmentData.metrics.averageBasket.toFixed(2)} €** offre des opportunités d'upselling.

Posez-moi des questions plus spécifiques pour une analyse approfondie !`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const response = generateResponse(userMessage);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    setIsLoading(false);
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card flex flex-col h-[600px]"
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Assistant IA - Power BI</h3>
            <p className="text-xs text-muted-foreground">Analyse intelligente des données</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Posez une question sur vos données Power BI
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestionClick(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <div className="p-2 rounded-lg bg-primary/10 h-fit">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50"
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <div 
                        className="text-sm whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ 
                          __html: message.content
                            .replace(/## /g, '<h4 class="text-base font-semibold mt-3 mb-2">')
                            .replace(/### /g, '<h5 class="text-sm font-medium mt-2 mb-1">')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br />')
                        }}
                      />
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="p-2 rounded-lg bg-muted h-fit">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="p-2 rounded-lg bg-primary/10 h-fit">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-muted/50 rounded-xl px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Posez votre question sur les données..."
            className="min-h-[44px] max-h-[120px] resize-none bg-muted/30 border-border/50"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
