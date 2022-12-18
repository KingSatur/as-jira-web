import { formatDistanceToNow } from "date-fns";
import { enAU } from "date-fns/locale";

export const getFormatDistanteToNow = (date: number) => {
  const fromNow = formatDistanceToNow(date, { locale: enAU });

  return `${fromNow} ago`;
};
