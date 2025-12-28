const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit, skip, status = 'PUBLISHED' } = req.query;
    
    const where = { status };
    
    if (category) {
      where.category = category;
    }
    
    if (featured === 'true') {
      where.featured = true;
    }
    
    const posts = await prisma.blogPost.findMany({
      where,
      take: parseInt(limit) || 20,
      skip: parseInt(skip) || 0,
      orderBy: { date: 'desc' }
    });
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug }
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Increment view count
    const updatedPost = await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: post.views + 1 }
    });
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create blog post
router.post('/', async (req, res) => {
  try {
    const post = await prisma.blogPost.create({
      data: req.body
    });
    
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update blog post
router.put('/:id', async (req, res) => {
  try {
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: req.body
    });
    
    res.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(400).json({ message: error.message });
  }
});

// Like a blog post
router.post('/:id/like', async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id }
    });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const updatedPost = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: { likes: post.likes + 1 }
    });
    
    res.json({ likes: updatedPost.likes });
  } catch (error) {
    console.error('Error liking blog post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;