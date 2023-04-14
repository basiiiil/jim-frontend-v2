import { format } from "date-fns";
import { de } from "date-fns/locale";

export const formatDE = (date:Date, formatString:string) =>
  format(date, formatString, { locale: de })