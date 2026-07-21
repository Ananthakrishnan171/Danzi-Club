const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const Image = require('../models/Image');
const GeneratedImage = require('../models/GeneratedImage');
const ProductDetails = require('../models/ProductDetails');
const Keyword = require('../models/Keyword');
const Packaging = require('../models/Packaging');
const Compliance = require('../models/Compliance');
const Pricing = require('../models/Pricing');
const Notification = require('../models/Notification');
const Log = require('../models/Log');
const { runAIPipeline } = require('../utils/aiPipeline');

// Route to run the AI Pipeline on product upload
router.post('/upload', protect, async (req, res) => {
  const { imageBase64, fileName } = req.body;

  try {
    if (!imageBase64) {
      return res.status(400).json({ success: false, message: 'No product image provided' });
    }

    // 1. Create Base Product
    const nameOnly = (fileName || 'Unnamed Product').replace(/\.[^/.]+$/, "");
    const product = await Product.create({
      userId: req.user._id,
      name: nameOnly,
      status: 'Pending'
    });

    // 2. Save Original Image Details
    const imageRecord = await Image.create({
      productId: product._id,
      imageUrl: imageBase64.substring(0, 100) === 'data:image' ? imageBase64 : `data:image/png;base64,${imageBase64}`,
      fileName: fileName || 'product.png',
      fileSize: Math.round((imageBase64.length * 3) / 4),
      mimeType: imageBase64.includes('jpeg') ? 'image/jpeg' : 'image/png'
    });

    // 3. Trigger 16-step AI Pipeline (dominant colors, harmony, synthesis, NLP copywriting, price, compliance)
    const pipelineResult = await runAIPipeline(imageRecord.imageUrl, nameOnly);

    // Update product status
    product.status = 'Processed';
    await product.save();

    // 4. Save Generated Background Removed & Synthesized Images
    const bgRemovedImage = await GeneratedImage.create({
      productId: product._id,
      originalImageId: imageRecord._id,
      imageUrl: pipelineResult.backgroundRemovedUrl,
      type: 'background_removed',
      dominantColors: pipelineResult.colors
    });

    const bgSynthesizedImage = await GeneratedImage.create({
      productId: product._id,
      originalImageId: imageRecord._id,
      imageUrl: pipelineResult.backgroundGeneratedUrl,
      type: 'background_generated',
      promptUsed: `A professional luxury studio product shot of a ${nameOnly} with premium setup, soft lighting, 8k resolution.`
    });

    // 5. Save ProductDetails (Suggested titles & descriptions)
    const details = await ProductDetails.create({
      productId: product._id,
      seoTitle: pipelineResult.details.title,
      seoDescription: pipelineResult.details.description,
      categorySuggested: pipelineResult.details.category,
      bulletPoints: pipelineResult.details.bulletPoints
    });

    // 6. Save Keywords
    const keywordPromises = pipelineResult.details.keywords.map((kw, index) => {
      return Keyword.create({
        productId: product._id,
        keyword: kw,
        relevanceScore: 1.0 - (index * 0.1)
      });
    });
    const keywords = await Promise.all(keywordPromises);

    // 7. Save Packaging suggestion
    const packaging = await Packaging.create({
      productId: product._id,
      materialSuggested: pipelineResult.details.packaging.material,
      dimensionsSuggested: pipelineResult.details.packaging.dimensions,
      ecoFriendly: pipelineResult.details.packaging.ecoFriendly,
      description: pipelineResult.details.packaging.description
    });

    // 8. Save Compliance
    const compliance = await Compliance.create({
      productId: product._id,
      passed: pipelineResult.details.compliance.passed,
      rulesChecked: pipelineResult.details.compliance.rulesChecked,
      certificationsNeeded: pipelineResult.details.compliance.certificationsNeeded,
      warnings: pipelineResult.details.compliance.warnings
    });

    // 9. Save Pricing
    const pricing = await Pricing.create({
      productId: product._id,
      suggestedPrice: pipelineResult.details.pricing.suggestedPrice,
      minPriceRange: pipelineResult.details.pricing.minPriceRange,
      maxPriceRange: pipelineResult.details.pricing.maxPriceRange,
      competitorAverages: pipelineResult.details.pricing.competitorAverages
    });

    // 10. Notify user
    await Notification.create({
      userId: req.user._id,
      title: 'Listing Generated Successfully!',
      message: `AI has completed processing listing for "${nameOnly}".`,
      type: 'pipeline'
    });

    // 11. Log process
    await Log.create({
      userId: req.user._id,
      action: 'AI_PIPELINE_SUCCESS',
      details: `Processed product id ${product._id}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return res.status(200).json({
      success: true,
      productId: product._id,
      product,
      images: {
        original: imageRecord.imageUrl,
        removed: bgRemovedImage.imageUrl,
        synthesized: bgSynthesizedImage.imageUrl
      },
      details,
      colors: pipelineResult.colors,
      harmony: pipelineResult.harmony,
      palette: pipelineResult.palette,
      keywords,
      packaging,
      compliance,
      pricing
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user listings
router.get('/my-listings', protect, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    // Enrich listings
    const enrichedListings = await Promise.all(products.map(async (prod) => {
      const originalImage = await Image.findOne({ productId: prod._id }).select('imageUrl');
      const genBgRemoved = await GeneratedImage.findOne({ productId: prod._id, type: 'background_removed' }).select('imageUrl dominantColors');
      const genBgGenerated = await GeneratedImage.findOne({ productId: prod._id, type: 'background_generated' }).select('imageUrl');
      const details = await ProductDetails.findOne({ productId: prod._id });
      const pricing = await Pricing.findOne({ productId: prod._id });
      const packaging = await Packaging.findOne({ productId: prod._id });
      const compliance = await Compliance.findOne({ productId: prod._id });
      const keywords = await Keyword.find({ productId: prod._id });

      return {
        id: prod._id,
        name: prod.name,
        status: prod.status,
        createdAt: prod.createdAt,
        originalImage: originalImage?.imageUrl || '',
        backgroundRemovedImage: genBgRemoved?.imageUrl || '',
        synthesizedImage: genBgGenerated?.imageUrl || '',
        dominantColors: genBgRemoved?.dominantColors || [],
        details,
        pricing,
        packaging,
        compliance,
        keywords: keywords.map(k => k.keyword)
      };
    }));

    return res.status(200).json({ success: true, listings: enrichedListings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update listing (edit before publishing)
router.put('/update/:id', protect, async (req, res) => {
  const { seoTitle, seoDescription, categorySuggested, suggestedPrice, bulletPoints } = req.body;

  try {
    const product = await Product.findOne({ _id: req.params.id, userId: req.user._id });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product listing not found' });
    }

    if (seoTitle || seoDescription || categorySuggested || bulletPoints) {
      await ProductDetails.findOneAndUpdate(
        { productId: product._id },
        { seoTitle, seoDescription, categorySuggested, bulletPoints },
        { new: true, upsert: true }
      );
    }

    if (suggestedPrice) {
      await Pricing.findOneAndUpdate(
        { productId: product._id },
        { suggestedPrice },
        { new: true, upsert: true }
      );
    }

    await Log.create({
      userId: req.user._id,
      action: 'LISTING_UPDATE',
      details: `Updated listing ID ${product._id}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return res.status(200).json({ success: true, message: 'Product listing updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete product listing (soft delete)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, userId: req.user._id });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product listing not found' });
    }

    // Call softDelete hooks/logic
    product.isDeleted = true;
    product.deletedAt = new Date();
    await product.save();

    // Soft delete child collections
    await Image.updateMany({ productId: product._id }, { isDeleted: true });
    await GeneratedImage.updateMany({ productId: product._id }, { isDeleted: true });
    await ProductDetails.updateMany({ productId: product._id }, { isDeleted: true });
    await Keyword.updateMany({ productId: product._id }, { isDeleted: true });
    await Packaging.updateMany({ productId: product._id }, { isDeleted: true });
    await Compliance.updateMany({ productId: product._id }, { isDeleted: true });
    await Pricing.updateMany({ productId: product._id }, { isDeleted: true });

    await Log.create({
      userId: req.user._id,
      action: 'LISTING_SOFT_DELETE',
      details: `Soft deleted listing ID ${product._id}`,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return res.status(200).json({ success: true, message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user notifications
router.get('/notifications', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(20);
    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mark notification read
router.put('/notifications/:id/read', protect, async (req, res) => {
  try {
    await Notification.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, { isRead: true });
    return res.status(200).json({ success: true, message: 'Notification marked read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
