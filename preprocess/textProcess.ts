import { crypto } from "https://deno.land/std@0.185.0/crypto/crypto.ts";
import { toHashString } from "https://deno.land/std@0.185.0/crypto/to_hash_string.ts";

const inputFilePath = Deno.args[0];
const outputFilePath = Deno.args[1];
const pattern1 = /\[\d+\/\d+\/\d+, \d+:\d+:\d+ (PM|AM)\] /g;

const data = await Deno.readTextFile(inputFilePath);
const messages = data.split("---------------------------\n");
const result = (
  await Promise.all(
    messages.map(async (m) => {
      const hash = await crypto.subtle.digest(
        "MD5",
        new TextEncoder().encode(m)
      );
      const logId = toHashString(hash);
      const [owner, ...body] = m.replace(pattern1, "").split("\n");
      const b = body.filter((s) => s.trim() !== "");

      let category: string;
      const attackRegex = /^→(ヒット|ミス|ファンブル！|クリティカル！)：/;
      const savingRegex1 = /^のセーヴ > (成功|失敗) : /;
      const savingRegex2 = / セーヴ DC: /;
      if (b.length === 1) {
        category = "talk";
      } else if (/^\d+(\.\d+)?$/.test(b[0])) {
        category = "roll";
      } else if (b.some((s) => attackRegex.test(s))) {
        category = "attack";
      } else if (b.some((s) => savingRegex1.test(s) || savingRegex2.test(s))) {
        category = "savingthrow";
      } else if (b.includes("HP更新 倍率 適用 戻す")) {
        category = "updateHp";
      } else {
        category = "other";
      }

      const content = b.join("\n");
      const log = { category, owner, content, logId };
      if (content === "") return;

      return JSON.stringify(log);
    })
  )
).filter((x) => x !== undefined);

Deno.writeTextFileSync(outputFilePath, result.join("\n"));
