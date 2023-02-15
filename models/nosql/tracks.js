const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete');

const tracksModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    album: {
      type: String,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        menssage: "ERROR_URL"
      }
    },
    artist: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    duration: {
      start: {
        type: Number,
      },
      end: {
        type: Number,
      }
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    }

  },
  {
    timestamps: true,
    versionKey: false
  }
)
tracksModel.plugin(mongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model("tracks", tracksModel)