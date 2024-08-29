export function formatToMoney(
  amount: number,
  locale: string = "pt-BR",
  currency: string = "BRL"
): string {
  return amount.toLocaleString(locale, { style: "currency", currency });
}
