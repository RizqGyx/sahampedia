import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function StockCard({ card, index }) {
  const selisih = card.predicted_price_today - card.predicted_price_yesterday;
  const selisihFormatted = selisih.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const icon = card.change_percent > 0 ? "▲" : "▼";
  const colorClass =
    card.change_percent > 0
      ? "text-green-600 dark:text-green-500"
      : "text-red-600 dark:text-red-500";

  const badgeColor =
    card.change_percent > 0
      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: false }}
    >
      <Link
        to={`/prediction/${card.stock.toLowerCase()}`}
        className="group relative bg-white dark:bg-gray-800 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700"
      >
        <div className="absolute -inset-px bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10"></div>

        <div className="w-16 h-16 mb-4 overflow-hidden rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
          {card.image ? (
            <img
              src={card.image}
              alt={`${card.stock} logo`}
              className="w-12 h-12 object-contain"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-300 text-xl font-bold">
              {card.stock.substring(0, 1)}
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {card.stock}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Kemarin: Rp{" "}
          <span className="font-medium">{card.predicted_price_yesterday}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Hari Ini: Rp{" "}
          <span className="font-medium">{card.predicted_price_today}</span>
        </p>

        <p className={`text-lg font-semibold ${colorClass}`}>
          {icon} Rp {selisihFormatted}
        </p>

        <div
          className={`flex items-center justify-between mt-1 px-3 py-1 rounded-full ${badgeColor}`}
        >
          <p className="text-sm">
            {card.change_percent > 0 ? "+" : ""}
            {card.change_percent}%
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
