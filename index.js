import express from 'express';
import { trainsList } from './data/trains.js';

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', async (req, res, next) => {
    try {
        const trains = await trainsList();
        res.json(trains);
      } catch (error) {
        next(error);
      }
})

app.listen(PORT, () => {
    console.log('[server] Server listening on port 3000')
})
