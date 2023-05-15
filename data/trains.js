import fs from "fs/promises";
import path from "path";
import {nanoid} from "nanoid"

const trainsPath = path.resolve("data", "trains.json");

const trainsList = async () => {
    const data = await fs.readFile(trainsPath, { encoding: "utf-8"})
    const trains = JSON.parse(data)
    return trains
}

const addTrain = async (body) => {
    try {
      if (typeof body !== 'string') {
        body = JSON.stringify(body);
      }
      const data = await fs.readFile(trainsPath, 'utf-8');
      const trains = JSON.parse(data);
      const newTrain = {
        ...JSON.parse(body)
      };
      trains.push(newTrain);
      await fs.writeFile(trainsPath, JSON.stringify(trains, null, 2));
      console.log(newTrain);
      return newTrain;
    } catch (error) {
      throw new Error(`Could not add train: ${error.message}`);
    }
  };
  


export {trainsList, addTrain}