import mongoose from "mongoose";
import Blog from "../models/blog";
import User from "../models/user";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blogs Found" });
  }
  return res.status(200).json({ blogs: blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Unauthorized unable to find User" });
  }
  const blog = new Blog({
    title: title,
    description: description,
    image: image,
    user: user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session: session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session: session });
    await session.commitTransaction();
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: error });
  }
  return res.status(200).json({ blog: blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title: title,
      description: description,
    });
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ blog: blog });
};

export const blogById = async (req, res, next) => {
  const { id } = req.params;
  let blogById;
  try {
    blogById = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blogById) {
    res.status(404).json({ message: "Not Found" });
  }
  return res.status(200).json({ blog: blogById });
};

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  let blogById;
  let user;
  try {
    blogById = await Blog.findById(id);
    user = await User.findById(blogById.user);
    await user.blogs.pull(blogById);
    await user.save();
    await Blog.deleteOne(blogById);
  } catch (error) {
    console.log(error);
  }
  if (!blogById) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};

export const userBlogs = async (req, res, next) => {
  const { id } = req.params;
  let existingUser;
  let userBlogs;
  try {
    existingUser = await User.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    res.staus(400).json({ message: "User Not Exist" });
  }
  try {
    userBlogs = existingUser.blogs;
  } catch (error) {
    console.log(error);
  }
  if (userBlogs.length === 0) {
    return res.status(200).json({ message: "User has no blogs" });
  }
 res.send(userBlogs)
};
