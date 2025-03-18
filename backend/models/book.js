import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Author Schema
const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  bio: {
    type: String
  },
  photoUrl: {
    type: String
  },
  location: {
    type: String
  },
  booksCount: {
    type: Number,
    default: 0
  },
  followersCount: {
    type: Number,
    default: 0
  }
});

// Genre Schema
const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

// Review Schema
const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  likesCount: {
    type: Number,
    default: 0
  },
  replies: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

// Book Schema
const BookSchema = new Schema({
    title: {
      type: String,
      required: true,
      index: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },
    coverImageUrl: {
      type: String
    },
    description: {
      type: String
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    ratingsCount: {
      type: Number,
      default: 0
    },
    genres: [{
      type: Schema.Types.ObjectId,
      ref: 'Genre'
    }],
    series: {
      name: String,
      position: Number
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }],
    publishedDate: {
      type: Date
    },
    isNewRelease: {
      type: Boolean,
      default: false
    }
});

// Create models from schemas
const Author = mongoose.model('Author', AuthorSchema);
const Book = mongoose.model('Book', BookSchema);
const Genre = mongoose.model('Genre', GenreSchema);
const Review = mongoose.model('Review', ReviewSchema);

export { Author, Book, Genre, Review };