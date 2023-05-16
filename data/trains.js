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
  
  const removeTrain = async (trainId) => {
    try {
      const data = await fs.readFile(trainsPath, 'utf-8');
      const trains = JSON.parse(data);
      const updatedTrains = trains.filter((train) => train.id !== trainId);
      if (updatedTrains.length === trains.length) {
        throw new Error(`Train not found with ID ${trainId}`);
      }
      await fs.writeFile(trainsPath, JSON.stringify(updatedTrains, null, 2));
    } catch (error) {
      throw new Error(`Could not remove train with ID ${trainId}: ${error.message}`);
    }
  };

  const updateTrain = async (trainId, body) => {
    try {
      const data = await fs.readFile(trainsPath, 'utf-8');
      const trains = JSON.parse(data);
      const train = trains.find((train) => train.id === trainId);
      if (!train) {
        throw new Error(`Train not found with ID ${trainId}`);
      }
      const updatedTrain = {
        ...train,
        ...body,
        id: trainId
      };
      const updatedTrains = trains.map((t) => (t.id === trainId ? updatedTrain : t));
      await fs.writeFile(trainsPath, JSON.stringify(updatedTrains, null, 2));
      return updatedTrain;
    } catch (error) {
      throw new Error(`Could not update train with ID ${trainId}: ${error.message}`);
    }
  };
  

export {trainsList, addTrain, removeTrain, updateTrain}