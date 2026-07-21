const axios = require('axios');

// Simulated K-Means color detection & harmonies
function getDominantColorsAndHarmony(productHint = 'general') {
  const colorMap = {
    watch: {
      colors: ['#1A1A1A', '#C0C0C0', '#D4AF37'], // Matte Black, Silver, Gold
      harmony: 'Monochromatic with Metallic Accents',
      palette: ['#1A1A1A', '#333333', '#C0C0C0', '#D4AF37', '#E5E5E5']
    },
    shoe: {
      colors: ['#FF3366', '#FFFFFF', '#1A1A1A'], // Crimson Pink, Clean White, Dark Slate
      harmony: 'High-Contrast Split Complementary',
      palette: ['#FF3366', '#FFFFFF', '#1A1A1A', '#FF99B2', '#4D4D4D']
    },
    headphone: {
      colors: ['#00E5FF', '#121212', '#7C4DFF'], // Cyber Cyan, Dark Ash, Neon Purple
      harmony: 'Triadic Cyberpunk Palette',
      palette: ['#00E5FF', '#121212', '#7C4DFF', '#0097A7', '#311B92']
    },
    bag: {
      colors: ['#8B4513', '#D2B48C', '#3E2723'], // Saddle Brown, Warm Tan, Espresso
      harmony: 'Analogous Earthy Tones',
      palette: ['#8B4513', '#D2B48C', '#3E2723', '#A0522D', '#5D4037']
    },
    cosmetics: {
      colors: ['#FFD8D8', '#FF8E8E', '#4E3629'], // Rose Petal, Coral Red, Mahogany
      harmony: 'Soft Complementary Pastel',
      palette: ['#FFD8D8', '#FF8E8E', '#4E3629', '#FFF0F0', '#FFCDD2']
    },
    general: {
      colors: ['#4F46E5', '#10B981', '#1F2937'], // Indigo, Emerald, Charcoal
      harmony: 'Modern UI Corporate Palette',
      palette: ['#4F46E5', '#10B981', '#1F2937', '#E0E7FF', '#D1FAE5']
    }
  };

  const key = Object.keys(colorMap).find(k => productHint.toLowerCase().includes(k)) || 'general';
  return colorMap[key];
}

// Simulated vision-to-listing metadata generator
function generateMockListing(productHint = 'general') {
  const dataMap = {
    watch: {
      category: 'Electronics & Wearable Devices',
      title: 'ChronoShield Elite - Modern Waterproof Quartz Watch',
      description: 'Upgrade your wrist game with ChronoShield Elite. Engineered for the modern professional, this watch blends timeless analog craft with modern aerospace durability. Features scratch-resistant sapphire crystal glass, a surgical-grade stainless steel casing, and a water resistance rating of up to 50 meters.',
      bulletPoints: [
        'Premium Japanese Quartz movement for razor-sharp accuracy.',
        'High-density leather strap with contrast double-stitching.',
        'Luminescent hands for unmatched readability in dark conditions.',
        'Corrosion-resistant steel alloy bezel with premium polish.'
      ],
      keywords: ['quartz watch', 'waterproof watch', 'men luxury watch', 'chronograph dial', 'stainless steel watch'],
      packaging: {
        material: 'Recycled rigid cardboard box with velvet cushion insert',
        dimensions: '11cm x 11cm x 8.5cm',
        ecoFriendly: true,
        description: 'Biodegradable matte black exterior with organic soybean ink print.'
      },
      compliance: {
        passed: true,
        rulesChecked: [
          { rule: 'CE safety certification standards', status: 'Passed', comments: 'Complies with battery and electronic limits.' },
          { rule: 'RoHS environmental regulation compliance', status: 'Passed', comments: 'Zero lead, mercury, or cadmium detected.' },
          { rule: 'ISO 22810 water-resistance standards', status: 'Passed', comments: 'Meets 5 ATM pressure specifications.' }
        ],
        certificationsNeeded: ['CE Mark', 'RoHS compliance sticker', 'ISO 22810 Quality Cert'],
        warnings: ['Avoid exposing the leather band to salt water for extended durations.']
      },
      pricing: {
        suggestedPrice: 129,
        minPriceRange: 99,
        maxPriceRange: 159,
        competitorAverages: [
          { competitor: 'TimeCraft Studio', price: 145 },
          { competitor: 'AeroDial Wear', price: 120 }
        ]
      }
    },
    shoe: {
      category: 'Footwear & Athletic Apparel',
      title: 'AeroPace Knit - Lightweight Running Shoes',
      description: 'Step into effortless speed with the AeroPace Knit. Designed with an ultra-breathable engineered mesh upper and a high-rebound responsive EVA midsole, this running shoe offers peak impact absorption and maximum comfort for long-distance training or everyday errands.',
      bulletPoints: [
        'Engineered breathable weave mimics second-skin comfort.',
        'Dynamic energy-return sole reduces muscle fatigue.',
        'Traction-optimized vulcanized rubber pods prevent slipping.',
        'Zero-pressure padded collar guards against blisters.'
      ],
      keywords: ['running shoe', 'breathable sneakers', 'lightweight footwear', 'orthopedic athletic shoe', 'mesh trainer'],
      packaging: {
        material: 'Molded post-consumer pulp fiber box with hemp secure twine',
        dimensions: '33cm x 20cm x 12cm',
        ecoFriendly: true,
        description: 'Glue-less single-sheet cardboard folding design that reduces waste.'
      },
      compliance: {
        passed: true,
        rulesChecked: [
          { rule: 'ASTM D3786 textile burst strength standards', status: 'Passed', comments: 'Tested upper weave integrity.' },
          { rule: 'ISO 17707 outsole flex endurance criteria', status: 'Passed', comments: 'Withstood 50,000 bend cycles.' },
          { rule: 'REACH toxic chemicals testing criteria', status: 'Passed', comments: 'Free of phthalates or forbidden azo dyes.' }
        ],
        certificationsNeeded: ['ASTM Quality Seal', 'REACH chemical compliance', 'Vegan Certified Product Label'],
        warnings: ['Hand-wash only. Do not machine dry to preserve adhesive longevity.']
      },
      pricing: {
        suggestedPrice: 85,
        minPriceRange: 69,
        maxPriceRange: 99,
        competitorAverages: [
          { competitor: 'FitSprint Elite', price: 95 },
          { competitor: 'StrideRight Wear', price: 79 }
        ]
      }
    },
    headphone: {
      category: 'Audio & Consumer Electronics',
      title: 'AcoustiZ-900 Pro ANC Wireless Headphones',
      description: 'Immerse yourself in pure studio sound with AcoustiZ-900 Pro. Featuring 40mm customized beryllium dynamic drivers and multi-mic Active Noise Cancellation, these headphones suppress ambient noise by up to 35dB, leaving you alone with your music, podcasts, or client calls.',
      bulletPoints: [
        'Smart Hybrid ANC blocks up to 95% of background noise.',
        'Beryllium composite diaphragm delivers warm bass and crystal highs.',
        'Extended 45-hour battery life with Fast Charge support (10m = 5h).',
        'Pressure-relieving memory foam earcups with sweatproof coating.'
      ],
      keywords: ['anc headphones', 'wireless stereo headset', 'bluetooth over ear', 'hi res audio headphones', 'studio monitor'],
      packaging: {
        material: 'Corrugated premium box with EVA protective storage shell',
        dimensions: '22cm x 19cm x 9cm',
        ecoFriendly: false,
        description: 'Heavy duty drop protection shell included for secure travel.'
      },
      compliance: {
        passed: true,
        rulesChecked: [
          { rule: 'FCC radiation emission limits testing', status: 'Passed', comments: 'Bluetooth radiation safety verified.' },
          { rule: 'WEEE electronic recycling compliance', status: 'Passed', comments: 'Standard electronic recycling stamp applied.' },
          { rule: 'UN38.3 lithium battery transport test', status: 'Passed', comments: 'Rechargeable battery safety approved.' }
        ],
        certificationsNeeded: ['FCC Certification', 'WEEE Symbol', 'UN38.3 Certificate'],
        warnings: ['Avoid using high-output chargers (above 15W) to protect battery health.']
      },
      pricing: {
        suggestedPrice: 199,
        minPriceRange: 179,
        maxPriceRange: 249,
        competitorAverages: [
          { competitor: 'SonicSound ANC', price: 220 },
          { competitor: 'AudioAura Studio', price: 189 }
        ]
      }
    },
    bag: {
      category: 'Luggage & Leather Goods',
      title: 'Nomad Roll-Top Waxed Canvas Backpack',
      description: 'Built for wet city streets and rugged hiking trails alike, the Nomad Roll-Top backpack is handcrafted from heavy duty water-resistant waxed canvas and reinforced with full-grain cowhide leather straps. Features an anti-theft laptop pocket and a multi-compartment design.',
      bulletPoints: [
        '18oz weather-shielded waxed cotton canvas build.',
        'Ergonomically contoured breathable shoulder strap panels.',
        'Padded laptop compartment protects devices up to 16 inches.',
        'Rust-proof solid brass hardware buckles.'
      ],
      keywords: ['canvas backpack', 'rolltop rucksack', 'waterproof schoolbag', 'leather travel pack', 'commuting laptop bag'],
      packaging: {
        material: 'Unbleached canvas dust sleeve in reusable cardboard envelope',
        dimensions: '45cm x 35cm x 6cm',
        ecoFriendly: true,
        description: 'Cotton bag can be repurposed as laundry or shoe storage sleeve.'
      },
      compliance: {
        passed: true,
        rulesChecked: [
          { rule: 'ISO 105-X12 dye rubbing colorfastness standard', status: 'Passed', comments: 'Zero staining detected.' },
          { rule: 'ASTM D1683 seam slippage durability test', status: 'Passed', comments: 'Handles loads up to 25kg.' }
        ],
        certificationsNeeded: ['GOTS certified canvas print', 'ASTM Tensile Certificate'],
        warnings: ['Do not wash with warm water or standard detergents. Use cold water spot cleaning only.']
      },
      pricing: {
        suggestedPrice: 110,
        minPriceRange: 89,
        maxPriceRange: 135,
        competitorAverages: [
          { competitor: 'UrbanGear Canvas', price: 125 },
          { competitor: 'PathFinder Outpost', price: 95 }
        ]
      }
    },
    cosmetics: {
      category: 'Health, Beauty & Skincare',
      title: 'HydraGlow Organic Hyaluronic Serum',
      description: 'Rejuvenate your skin barrier with HydraGlow Organic Hyaluronic Serum. Combining double-weight botanical hyaluronic molecules with cold-pressed rosehip seed extract, this clean formula plumps fine lines, locks in lasting hydration, and leaves a dewy finish without feeling greasy.',
      bulletPoints: [
        'Cold-pressed botanical extracts rich in Vitamin C & E.',
        'Ultra-pure hyaluronic acid plumps skin within 10 minutes.',
        'Fragrance-free formula safe for highly sensitive skin.',
        'Non-comedogenic (won’t block pores).'
      ],
      keywords: ['hyaluronic serum', 'organic skincare', 'anti aging treatment', 'glow booster', 'hydrating face oil'],
      packaging: {
        material: 'Amber glass dropper bottle with bamboo pipette collar',
        dimensions: '4.5cm x 4.5cm x 11.5cm',
        ecoFriendly: true,
        description: 'Amber glass blocks UV rays to extend formula potency naturally.'
      },
      compliance: {
        passed: true,
        rulesChecked: [
          { rule: 'FDA cosmetics formulation regulation standards', status: 'Passed', comments: 'Zero prohibited ingredients.' },
          { rule: 'ISO 22716 Good Manufacturing Practices guidelines', status: 'Passed', comments: 'Certified cleanroom bottling process.' },
          { rule: 'Cruelty-Free product testing clearance', status: 'Passed', comments: 'PETA-approved vegan testing protocols.' }
        ],
        certificationsNeeded: ['FDA Registered', 'Ecocert Bio Seal', 'Cruelty-Free Certification'],
        warnings: ['Keep out of reach of direct sunlight. Patch test on wrist before full application.']
      },
      pricing: {
        suggestedPrice: 38,
        minPriceRange: 29,
        maxPriceRange: 45,
        competitorAverages: [
          { competitor: 'SkinDew Organic', price: 42 },
          { competitor: 'PureNectar Bio', price: 35 }
        ]
      }
    },
    general: {
      category: 'Home & Kitchen Utilities',
      title: 'SleekInfuse Stainless Thermal Travel Flask',
      description: 'Keep your hot beverages steaming for up to 12 hours or cold juices chilled for 24 hours with SleekInfuse. Made of premium food-grade double-walled 18/8 stainless steel, it is the ultimate zero-condensation travel companion for coffee lovers, hikers, and commuters.',
      bulletPoints: [
        'Double-walled vacuum seal insulation technology.',
        'Zero-leak silicone seal ring inside bpa-free cap.',
        'Wide mouth design allows effortless ice cube loading.',
        'Chipping-resistant powder coat paint.'
      ],
      keywords: ['travel flask', 'insulated bottle', 'coffee thermos', 'stainless steel canteen', 'hiking vacuum cup'],
      packaging: {
        material: 'Recyclable kraft tube cylinder container',
        dimensions: '8.5cm x 8.5cm x 26.5cm',
        ecoFriendly: true,
        description: 'Eco-grade spiral wound cardboard tube requiring zero adhesives.'
      },
      compliance: {
        passed: true,
        rulesChecked: [
          { rule: 'FDA food-contact safety specifications (GRAS)', status: 'Passed', comments: 'Metal composition verified.' },
          { rule: 'BPA-free plastic composition verification testing', status: 'Passed', comments: 'Lid contains zero plasticizer toxins.' }
        ],
        certificationsNeeded: ['FDA Safe Label', 'BPA-Free Certification', 'SGS Food Grade stamp'],
        warnings: ['Do not microwave. Avoid freezing. Hand wash only.']
      },
      pricing: {
        suggestedPrice: 28,
        minPriceRange: 22,
        maxPriceRange: 35,
        competitorAverages: [
          { competitor: 'HydroCamp Travel', price: 32 },
          { competitor: 'ThermoFlask Elite', price: 25 }
        ]
      }
    }
  };

  const key = Object.keys(dataMap).find(k => productHint.toLowerCase().includes(k)) || 'general';
  return dataMap[key];
}

/**
 * Runs the AI Pipeline.
 * Checks for a GEMINI_API_KEY environment variable. If found, can call Gemini.
 * Otherwise, falls back to the high-fidelity simulator.
 */
async function runAIPipeline(imageBase64, originalFileName) {
  // Infer file characteristics from filename to provide the smart mockup engine
  let hint = 'general';
  const name = (originalFileName || '').toLowerCase();
  if (name.includes('watch') || name.includes('clock') || name.includes('chrono') || name.includes('time')) {
    hint = 'watch';
  } else if (name.includes('shoe') || name.includes('sneaker') || name.includes('boot') || name.includes('run') || name.includes('footwear')) {
    hint = 'shoe';
  } else if (name.includes('headphone') || name.includes('earphone') || name.includes('audio') || name.includes('mic') || name.includes('sound')) {
    hint = 'headphone';
  } else if (name.includes('bag') || name.includes('pack') || name.includes('luggage') || name.includes('purse')) {
    hint = 'bag';
  } else if (name.includes('serum') || name.includes('cream') || name.includes('oil') || name.includes('cosmetic') || name.includes('skin') || name.includes('glow')) {
    hint = 'cosmetics';
  }

  // Detect dominant colors & harmony
  const design = getDominantColorsAndHarmony(hint);
  
  // Base background removed representation:
  // For a live app without an active rembg server, we return a canvas visual on the front-end OR a stylized PNG URL
  const backgroundRemovedUrl = imageBase64 || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600'; // Default shoe placeholder
  
  // Background synthesis: We simulate standard AI backgrounds
  const synthesizedBgMap = {
    watch: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600', // Marble bg
    shoe: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=600', // Athletic neon track
    headphone: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600', // Synthwave cyberpunk studio
    bag: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600', // Autumn pine forest wood desk
    cosmetics: 'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&q=80&w=600', // Pastel luxury shelf
    general: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600' // Minimalist product studio bg
  };
  const backgroundGeneratedUrl = synthesizedBgMap[hint];

  let details = generateMockListing(hint);

  // If a Gemini API Key is configured, we can overlay its real NLP response
  if (process.env.GEMINI_API_KEY) {
    try {
      // Prompt Gemini to enrich details
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [{
            parts: [{
              text: `You are an expert copywriter. Based on this product name: "${originalFileName}", write an SEO title, a professional product description, and 3 key benefits in a strict JSON format matching:
              { "title": "...", "description": "...", "bullets": ["...", "...", "..."] }`
            }]
          }]
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const responseText = response.data.candidates[0].content.parts[0].text;
      const cleanJson = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      if (parsed.title) details.title = parsed.title;
      if (parsed.description) details.description = parsed.description;
      if (parsed.bullets) details.bulletPoints = parsed.bullets;
    } catch (err) {
      console.warn("Gemini API call failed, using high-fidelity fallback:", err.message);
    }
  }

  // Introduce a slight process delay to show loading skeletons & steps on UI
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    success: true,
    hint,
    colors: design.colors,
    harmony: design.harmony,
    palette: design.palette,
    backgroundRemovedUrl,
    backgroundGeneratedUrl,
    details
  };
}

module.exports = { runAIPipeline };
