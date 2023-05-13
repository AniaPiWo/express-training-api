import fs from "fs/promises";
import path from "path";

const trainsPath = path.resolve("data", "trains.json");

const trainsList = async () => {
    const data = await fs.readFile(trainsPath, { encoding: "utf-8"})
    const trains = JSON.parse(data)
    return trains
}

export {trainsList}