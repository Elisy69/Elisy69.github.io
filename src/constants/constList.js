import CryptoJS from "crypto-js";
import { getTimestamp } from "../helpers/getTimestamp";

export const URL = "http://api.valantis.store:40000/";
export const KEY = CryptoJS.MD5(`Valantis_${getTimestamp()}`).toString();
export const LIMIT = 50;
