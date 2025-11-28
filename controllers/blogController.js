const Blog = require("../models/blog");
const { blogValidation } = require("../utils/validation");
const cloudinary = require("../utils/cloudinar");

const isDataUriImage = (value) =>
  typeof value === "string" && /^data:image\/[a-zA-Z]+;base64,/.test(value);

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { error } = blogValidation.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let blogData = { ...req.body };

    // Upload only when we receive a fresh image payload (e.g., data URI)
    if (isDataUriImage(blogData.bannerImage)) {
      const uploadResult = await cloudinary.uploader.upload(
        blogData.bannerImage,
        {
          folder: "blogs",
          transformation: [
            { width: 1200, height: 600, crop: "limit", quality: "auto" },
            { fetch_format: "auto" },
          ],
        }
      );
      blogData.bannerImage = uploadResult.secure_url;
    }

    const blog = new Blog(blogData);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Get all Blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get single Blog by ID
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get single Blog by Slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    let updateData = { ...req.body };

    const { error } = blogValidation.validate(updateData);
    if (error) return res.status(400).json({ error: error.details[0].message });

    if (isDataUriImage(updateData.bannerImage)) {
      const uploadResult = await cloudinary.uploader.upload(
        updateData.bannerImage,
        {
          folder: "blogs",
          transformation: [
            { width: 1200, height: 600, crop: "limit", quality: "auto" },
            { fetch_format: "auto" },
          ],
        }
      );
      updateData.bannerImage = uploadResult.secure_url;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
