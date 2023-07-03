const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
        console.log(err);
    }
};

exports.getById = async (req, res) => {
    try {
        const testi = await Testimonial.findById(req.params.id);
        if (!testi) res.status(404).json({ message: 'Not found...' });
        else res.json(testi);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const testi = await Testimonial.findOne().skip(rand);
        if (!testi) res.status(404).json({ message: 'Not found' });
        else res.json(testi);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.addTesti = async (req, res) => {
    try {
        const { author, text } = req.body;
        const newTesti = new Testimonial({ author: author, text: text });
        await newTesti.save();
        res.json({ message: 'Ok' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.updateTesti = async (req, res) => {
    const { author, text } = req.body;
    try {
        const testi = await Testimonial.findById(req.params.id);
        if (tesi) {
            await Testimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text } });
            res.json({ message: 'Ok' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteTesti = async (req, res) => {
    try {
        const testi = await Testimonial.findById(req.params.id);
        if (testi) {
            await Testimonial.deleteOne({ _id: id });
            res.json({ message: 'Ok' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.json({ message: err });
    }
};