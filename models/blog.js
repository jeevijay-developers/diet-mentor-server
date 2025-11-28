const mongoose = require("mongoose");

const slugify = (title) => {
  return (
    title
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") +
    "-" +
    Math.random().toString(36).substring(2, 7)
  );
};

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    bannerImage: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

blogSchema.pre("validate", function () {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
});

module.exports = mongoose.model("Blog", blogSchema);
