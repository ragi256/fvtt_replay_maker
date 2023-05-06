import { fetchAudio } from "https://code4fukui.github.io/voicevox-api/fetchAudio.js";
import wav from "npm:node-wav@0.0.2";

const inputFilePath = Deno.args[0];
const fileName = inputFilePath.replace(".\\data\\", "");
const baseName = fileName.replace(".json", "");
const input = await Deno.readTextFile(inputFilePath);

type voiceMapping = {
  [key: string]: number;
}

const characterMapping: voiceMapping = {
  "ワク": 50,
  "ブランド": 80,
  "クロマ": 2004825409,
  "フィル": 70,
  "フィル（リタ）": 70,
  "リタ": 0,
};

const logData = input.split("\n").map((s) => JSON.parse(s));
const jsonArray: string[] = [];

for (const log of logData) {
  if (log.category === "talk") {
    const talk = log;
    const characterId = characterMapping[talk.owner];
    const bin = await fetchAudio(talk.content, characterId);

    const audioData = new wav.decode(bin);
    const durationInSeconds =
      audioData.channelData[0].length / audioData.sampleRate;
    await Deno.writeFile(`output/audio/${baseName}/${talk.logId}.wav`, bin);
    talk.duration = durationInSeconds;

    jsonArray.push(JSON.stringify(talk));
  } else {
    jsonArray.push(JSON.stringify(log));
  }
}
await Deno.writeTextFileSync(`output/json/${fileName}`, jsonArray.join("\n"));
