import crypto from "crypto";

export const generateHash = async (data: string) => {
  return crypto
    .createHmac("sha256", process.env.HASH_SECRET as string)
    .update(data)
    .digest("hex");
};
