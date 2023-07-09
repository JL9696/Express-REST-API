const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const conc = await Concert.findById(req.params.id);
        if (!conc) res.status(404).json({ message: 'Not found' });
        else res.json(conc);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getConcertByPerformer = async (req, res) => {
    try {
      const conc = await Concert.find({ performer: req.params.performer });
      if (!conc) res.status(404).json({ message: "Not found" });
      else res.json(conc);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getConcertByGenre = async (req, res) => {
    try {
      const conc = await Concert.find({ genre: req.params.genre });
      if (!conc) res.status(404).json({ message: "Not found" });
      else res.json(conc);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getConcertByPrice = async (req, res) => {
    try {
      const conc = await Concert.find({
        price: { $gte: req.params.price_min, $lte: req.params.price_max },
      });
      if (!conc) res.status(404).json({ message: "Not found" });
      else res.json(conc);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getConcertByDay = async (req, res) => {
    try {
      const conc = await Concert.find({ day: req.params.day });
      if (!conc) res.status(404).json({ message: "Not found" });
      else res.json(conc);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

exports.addConc = async (req, res) => {
    try {
        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
        await newConcert.save();
        res.json({ message: 'Ok' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.delConc = async (req, res) => {
    try {
        const conc = await Concert.findById(req.params.id);
        if (conc) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'Ok' })
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.updateConc = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    try {
        const conc = await Concert.findById(req.params.id);
        if (conc) {
            await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } });
            res.json({ message: 'Ok' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};