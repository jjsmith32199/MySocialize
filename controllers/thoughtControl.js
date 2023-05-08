const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({}).populate({
            path: 'reactions',
            select: '-__v'
    }).select('-__v').sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
},
// get thought by id
getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id }).populate({
        path: 'reactions',
        select: '-__v',
        }).select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought was found with this id' });
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
},
// create new thought and add to user
createThought({ body }, res) {
    Thought.create(body).then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404)
            .json({ message: 'No user was found with this id' 
            });
        return;
        }
        res.json(dbUserData);
    }).catch(err => res.json(err));

},
// update thought by mathcing with id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, 
        body, { new: true, runValidators: true })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404)
            .json({ message: 'No thought was found with this id' });
            return;
        }
        res.json(dbThoughtData);
    }).catch(err => res.json(err));
},
// delete thought by matching with id
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404)
            .json({ message: 'No thought was found with this id' });
            return;
        }
    return User.findOneAndUpdate(
        { thoughts: params.id },
        { $pull: { thoughts: params.id } },
        { new: true }
    );
    }).then((dbuserData) => {
        if (!dbuserData) {
          return res.status(404).json({
            message: "Thought was created but no user associated with this id.",
          });
        }
        res.json({ message: "Thought deleted successfully!" });
      })
      .catch((err) => res.json(err));
},

addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
    ).then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404)
            .json({ message: 'No thought was found with this id' });
            return;
        }
        res.json(dbThoughtData);
    }).catch(err => res.json(err));
},

deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
};


module.exports = thoughtController;