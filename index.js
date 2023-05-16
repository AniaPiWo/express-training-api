import express from 'express';
import colors from 'colors';
import { trainsList, addTrain, removeTrain,updateTrain } from './data/trains.js';

const app = express()
const router = express.Router()
app.use(express.json());
app.use('/trains', router);

const PORT = process.env.PORT || 3000

router.get('/', async (req, res, next) => {
    try {
        const trains = await trainsList();
        res.json(trains);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newTrain = await addTrain(req.body);
        res.json(newTrain)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
      await removeTrain(req.params.id);
      res.status(200).json({ message: 'Train deleted successfully' });
    } catch (error) {
      next(error);
    }
  });
  
  router.put('/:id', async (req, res, next) => {
    const trainId = req.params.id;
    const body = req.body;
    try {
      const updatedTrain = await updateTrain(trainId, body);
      res.json(updatedTrain);
    } catch (error) {
      next(error);
    }
  });

app.listen(PORT, () => {
    console.log(`[server] Server listening on port ${PORT}`.magenta)
})




