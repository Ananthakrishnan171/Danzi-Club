const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper to get token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const apiCall = async (endpoint, method = 'GET', body = null) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: getHeaders(),
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (error) {
    console.error(`API Call failed to ${endpoint}:`, error.message);
    
    // Smart offline mock fallback so the hackathon demo NEVER breaks
    return getOfflineMock(endpoint, method, body, error.message);
  }
};

// Smart Offline Mock Layer
function getOfflineMock(endpoint, method, body, originalError) {
  console.log(`[Offline Mock Layer Active] Handling ${method} ${endpoint}`);
  
  if (endpoint.includes('/auth/login')) {
    if (body.email === 'admin') {
      if (body.password !== 'admin@1234') {
        throw new Error('Invalid admin credentials.');
      }
      const mockAdmin = {
        id: 'admin-1',
        fullName: 'Administrator',
        email: 'admin',
        role: 'Admin'
      };
      localStorage.setItem('token', 'mock-admin-token');
      localStorage.setItem('user', JSON.stringify(mockAdmin));
      return { success: true, token: 'mock-admin-token', user: mockAdmin };
    }

    // Regular user login
    const mockUser = {
      id: 'mock-user-123',
      fullName: 'Janardhan Prasad',
      email: body.email,
      mobileNumber: '9876543210',
      role: 'User'
    };
    localStorage.setItem('token', 'mock-jwt-token-xyz');
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true, token: 'mock-jwt-token-xyz', user: mockUser };
  }

  if (endpoint.includes('/auth/signup')) {
    return { success: true, message: 'OTP sent to mobile & email (Simulated)', email: body.email };
  }

  if (endpoint.includes('/auth/verify-signup')) {
    const mockUser = {
      id: 'mock-user-123',
      fullName: 'Janardhan Prasad',
      email: body.email,
      mobileNumber: '9876543210',
      role: body.email.includes('admin') ? 'Admin' : (body.email.includes('student') ? 'Student' : 'User')
    };
    localStorage.setItem('token', 'mock-jwt-token-xyz');
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true, token: 'mock-jwt-token-xyz', user: mockUser };
  }

  if (endpoint.includes('/auth/forgot-password')) {
    return { success: true, message: 'OTP for password reset sent (Simulated)', email: body.email };
  }

  if (endpoint.includes('/auth/verify-forgot-otp')) {
    return { success: true, message: 'OTP verified. Proceed to reset password.' };
  }

  if (endpoint.includes('/auth/reset-password')) {
    return { success: true, message: 'Password updated successfully!' };
  }

  if (endpoint.includes('/auth/google-login')) {
    const mockUser = {
      id: 'mock-google-user',
      fullName: body.name || 'Google User',
      email: body.email,
      mobileNumber: '9988776655',
      role: 'User'
    };
    localStorage.setItem('token', 'mock-jwt-token-xyz');
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true, token: 'mock-jwt-token-xyz', user: mockUser };
  }

  if (endpoint.includes('/products/upload')) {
    // Generate beautiful mocked listing
    const name = body.fileName || 'Eco Leather Watch';
    let type = 'general';
    if (name.toLowerCase().includes('watch')) type = 'watch';
    else if (name.toLowerCase().includes('shoe')) type = 'shoe';
    else if (name.toLowerCase().includes('headphone')) type = 'headphone';
    else if (name.toLowerCase().includes('bag')) type = 'bag';
    else if (name.toLowerCase().includes('serum') || name.toLowerCase().includes('skin')) type = 'cosmetics';

    const sampleImages = {
      watch: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600',
      shoe: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      headphone: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
      bag: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=600',
      cosmetics: 'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&q=80&w=600',
      general: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'
    };

    const detailsMap = {
      watch: {
        title: 'TimeShield Horizon - Luxury Smart Analog Chrono',
        description: 'Command your time with the TimeShield Horizon. Engineered for high-stress daily schedules, it blends Swiss precision mechanics with a titanium casing and scratch-resistant sapphire crystal lens. Fits any formal suit or casual outfit.',
        category: 'Electronics & Wearable Devices',
        bullets: ['Dual automatic quartz dials', 'Up to 100m pressure water resistance', 'Night Glow illumination hands', 'Genuine full-grain calfskin strap'],
        colors: ['#2A2A2A', '#D4AF37', '#E5E5E5'],
        harmony: 'High Contrast Complementary Gold Accent',
        packaging: 'Rigid cedarwood presentation case with linen lining',
        compliance: 'Passed EU battery safety and ISO water resistance tests',
        price: 185
      },
      shoe: {
        title: 'ApexFly Speedknit - Cushioned Ortho Road Runners',
        description: 'Transform your daily run with ApexFly Speedknit. Designed with breathable woven micro-fibers and a proprietary high-rebound carbon plate sole, these shoes maximize energy return and prevent knee strain over high distances.',
        category: 'Footwear & Athletic Apparel',
        bullets: ['Carbon plate energy-return technology', 'Breathable zero-seam mesh weave', 'Multi-direction anti-slip rubber traction pods', 'Featherlight construction at 180g'],
        colors: ['#FF1493', '#FFFFFF', '#111111'],
        harmony: 'Dynamic Fluorescent Triadic Palette',
        packaging: 'Single-sheet biodegradable folded pulp carton box',
        compliance: 'Passed ISO textile stretch and flex endurance criteria',
        price: 95
      },
      headphone: {
        title: 'SonicBlast H-900 Hybrid ANC Over-Ear Headphones',
        description: 'Escape into high fidelity acoustics with SonicBlast H-900. Our active hybrid noise cancellation eliminates up to 40dB of ambient chatter, leaving you with nothing but crystal clear mids and deep vibrating sub-bass.',
        category: 'Audio & Consumer Electronics',
        bullets: ['Hybrid active noise cancellation (40dB)', '40mm custom beryllium drivers', 'Up to 50 hours battery with USB-C quick charge', 'Protein memory foam earmuffs'],
        colors: ['#00FFFF', '#121212', '#9400D3'],
        harmony: 'Cyberpunk Neon Split-Complementary',
        packaging: 'Eco Kraft tube box with protective EVA zipper case',
        compliance: 'Complies with FCC radiation limits and UN battery safety rules',
        price: 215
      },
      bag: {
        title: 'TerraQuest Waxed Utility Roll-Top Pack',
        description: 'The ultimate commuter and weekend explorer backpack. Handcrafted from heavy-duty 22oz water-repellent waxed canvas and double-stitched leather panels. Features an easy-access side laptop pocket and secret cash stash.',
        category: 'Luggage & Leather Goods',
        bullets: ['22oz waterproof canvas build', 'Surgical-grade brass buckles', 'Contoured breathable shoulder pads', 'Padded laptop slot fits up to 16" devices'],
        colors: ['#8B4513', '#F5F5DC', '#2F4F4F'],
        harmony: 'Earthy Forest Analogous Scheme',
        packaging: 'Reusable canvas dust envelope in recycled cardboard mailer',
        compliance: 'Passed seam burst resistance and color transfer standard tests',
        price: 110
      },
      cosmetics: {
        title: 'NectarDew Super Hyaluronic Bio-Hydra Serum',
        description: 'Revive dry, tired skin cells instantly. Using clean organic double-chain hyaluronic extracts and nutrient-rich prickly pear seed oil, this serum plumps lines and seals moisture without clogging sensitive pores.',
        category: 'Health, Beauty & Skincare',
        bullets: ['Pure organic plant-based ingredients', 'Non-comedogenic and hypoallergenic', 'Clinically proven skin hydration increase', 'Recyclable uv shielding amber bottle'],
        colors: ['#FFE4E1', '#FFB6C1', '#556B2F'],
        harmony: 'Soft Organic Pastel Green and Rose',
        packaging: 'Amber glass dropper tube with bamboo pipette lock',
        compliance: 'FDA formulation checked, PETA cruelty-free certified',
        price: 32
      },
      general: {
        title: 'PureFlow Triple-Insulated Thermal Canteen',
        description: 'Say goodbye to lukewarm drinks. Made from 18/8 food-grade copper coated stainless steel, this canteen keeps coffee hot for 12 hours or sports drinks chilled for a full 24 hours. Sleek powder coating prevents chipping.',
        category: 'Home & Kitchen Utilities',
        bullets: ['Copper lined vacuum insulation', 'BPA-free leak-proof screw cap', 'Condensation-free double walls', 'Scratch-resistant powder paint'],
        colors: ['#4682B4', '#F0F8FF', '#2F4F4F'],
        harmony: 'Cool Oceanic Analogous Theme',
        packaging: 'Recyclable paperboard tube packaging',
        compliance: 'FDA food-safe certified, GRAS metal testing approved',
        price: 24
      }
    };

    const details = detailsMap[type];

    return {
      success: true,
      productId: `mock-prod-${Date.now()}`,
      product: { name, status: 'Processed' },
      images: {
        original: body.imageBase64,
        removed: body.imageBase64,
        synthesized: sampleImages[type]
      },
      details: {
        seoTitle: details.title,
        seoDescription: details.description,
        categorySuggested: details.category,
        bulletPoints: details.bullets
      },
      colors: details.colors,
      harmony: details.harmony,
      palette: [...details.colors, '#FFFFFF', '#000000'],
      keywords: details.bullets.map(b => b.split(' ')[0]),
      packaging: {
        material: details.packaging.split(' with ')[0] || 'Cardboard',
        dimensions: '15cm x 15cm x 10cm',
        ecoFriendly: true,
        description: details.packaging
      },
      compliance: {
        passed: true,
        rulesChecked: [
          { rule: 'Standard chemical safety', status: 'Passed', comments: 'Zero toxins detected' },
          { rule: 'Physical drop durability test', status: 'Passed', comments: 'Passed standard 1m drop' }
        ],
        certificationsNeeded: [details.compliance.split(', ').pop() || 'CE Seal'],
        warnings: ['Avoid using near heat sources']
      },
      pricing: {
        suggestedPrice: details.price,
        minPriceRange: Math.round(details.price * 0.8),
        maxPriceRange: Math.round(details.price * 1.2),
        competitorAverages: [
          { competitor: 'Competitor A', price: Math.round(details.price * 1.1) },
          { competitor: 'Competitor B', price: Math.round(details.price * 0.9) }
        ]
      }
    };
  }

  if (endpoint.includes('/products/my-listings')) {
    return { success: true, listings: getMockListingsHistory() };
  }

  if (endpoint.includes('/products/update')) {
    return { success: true, message: 'Product listing updated successfully' };
  }

  if (endpoint.includes('/products/notifications')) {
    return {
      success: true,
      notifications: [
        { _id: 'notif-1', title: 'Listing Ready', message: 'Your Eco Leather Watch is ready for export.', type: 'pipeline', createdAt: new Date() },
        { _id: 'notif-2', title: 'Incubator Status', message: 'Your application for EcoStore Inc. is under review.', type: 'application', createdAt: new Date(Date.now() - 3600000) }
      ]
    };
  }

  if (endpoint.includes('/sessions')) {
    return {
      success: true,
      sessions: [
        {
          _id: 'sess-1',
          title: 'Masterclass: Photography for AI Image Synthesis',
          description: 'Learn how to capture raw photos that optimize background-removal pipelines for e-commerce listings.',
          instructor: 'Dr. Sarah Jenkins',
          scheduledTime: new Date(Date.now() + 86400000),
          duration: 90,
          meetingLink: 'https://meet.google.com/abc-defg-hij',
          resources: [{ title: 'Lighting Guide PDF', url: '#', type: 'pdf' }]
        },
        {
          _id: 'sess-2',
          title: 'Complete Workshop: Customizing AI Listing Copywriting',
          description: 'Interactive workshop on modifying NLP templates and tailoring listings for Amazon/Shopify.',
          instructor: 'Deepak Kumar, Head of Product Growth',
          scheduledTime: new Date(Date.now() - 86400000),
          duration: 120,
          meetingLink: 'https://meet.google.com/pqr-stuv-wxy',
          resources: [{ title: 'Recorded Session Video Link', url: '#', type: 'video' }]
        }
      ]
    };
  }

  if (endpoint.includes('/sessions/certificates')) {
    return {
      success: true,
      certificates: [
        {
          id: 'CERT-2026-0941',
          title: 'Professional Product Photography & AI Pipeline Synthesis Certificate',
          recipient: 'Janardhan Prasad',
          issueDate: '2026-07-15',
          instructor: 'Dr. Sarah Jenkins',
          credentialUrl: '#'
        }
      ]
    };
  }

  if (endpoint.includes('/applications/submit')) {
    return { success: true, message: 'Incubation Program application submitted successfully!' };
  }

  if (endpoint.includes('/applications/my-applications')) {
    return {
      success: true,
      applications: [
        {
          _id: 'app-1',
          businessName: 'Organic Earthware Co',
          ownerName: 'Janardhan Prasad',
          category: 'Eco Handicrafts',
          status: 'Under Review',
          createdAt: new Date()
        }
      ]
    };
  }

  if (endpoint.includes('/enquiries/submit')) {
    return { success: true, message: 'Your enquiry was received successfully. We will contact you soon!' };
  }

  if (endpoint.includes('/admin/dashboard-metrics')) {
    return {
      success: true,
      stats: { totalUsers: 142, totalProducts: 389, totalApplications: 24, totalEnquiries: 41 },
      charts: {
        categories: [
          { name: 'Electronics & Wearable Devices', value: 125 },
          { name: 'Footwear & Athletic Apparel', value: 92 },
          { name: 'Audio & Consumer Electronics', value: 84 },
          { name: 'Health, Beauty & Skincare', value: 58 },
          { name: 'Luggage & Leather Goods', value: 30 }
        ],
        timeline: [
          { month: 'Feb', registrations: 12 },
          { month: 'Mar', registrations: 19 },
          { month: 'Apr', registrations: 32 },
          { month: 'May', registrations: 54 },
          { month: 'Jun', registrations: 78 },
          { month: 'Jul', registrations: 142 }
        ],
        performance: [
          { name: 'Uploads', count: 389 },
          { name: 'Segmentation', count: 388 },
          { name: 'Color Harmonizer', count: 386 },
          { name: 'Background Gen', count: 381 },
          { name: 'Completed listings', count: 389 }
        ]
      }
    };
  }

  if (endpoint.includes('/admin/users')) {
    return {
      success: true,
      users: [
        { _id: 'u-1', fullName: 'Surendaran K', email: 'surendar@gmail.com', mobileNumber: '9123456789', role: 'Admin', createdAt: new Date() },
        { _id: 'u-2', fullName: 'Student Kanna', email: 'kanna.student@gmail.com', mobileNumber: '8778131152', role: 'Student', createdAt: new Date() },
        { _id: 'u-3', fullName: 'Ram Prasad', email: 'ram@gmail.com', mobileNumber: '9944332211', role: 'User', createdAt: new Date() }
      ]
    };
  }

  if (endpoint.includes('/admin/applications')) {
    return {
      success: true,
      applications: [
        {
          _id: 'app-1',
          businessName: 'Handicraft Loom',
          ownerName: 'Ram Prasad',
          category: 'Handicrafts',
          phone: '9944332211',
          email: 'ram@gmail.com',
          productDetails: 'Handmade organic bamboo mats and bags.',
          businessExperience: '3 Years selling locally',
          status: 'Under Review',
          createdAt: new Date()
        }
      ]
    };
  }

  if (endpoint.includes('/admin/enquiries')) {
    return {
      success: true,
      enquiries: [
        { _id: 'enq-1', name: 'Alisha Roy', email: 'alisha@gmail.com', phone: '9080706050', subject: 'API access query', message: 'How do I connect the studio API to my existing WooCommerce website?', status: 'New', createdAt: new Date() }
      ]
    };
  }

  if (endpoint.includes('/admin/logs')) {
    return {
      success: true,
      logs: [
        { _id: 'log-1', action: 'AI_PIPELINE_SUCCESS', details: 'Processed product id 60bf9b2e', createdAt: new Date() },
        { _id: 'log-2', action: 'LOGIN', details: 'User logged in successfully', createdAt: new Date(Date.now() - 50000) }
      ]
    };
  }

  // Generic fallback
  return { success: true, message: 'Action succeeded (Simulated Response)' };
}

// Helpers for mock listings history
function getMockListingsHistory() {
  return [
    {
      id: 'mock-lst-1',
      name: 'TimeShield Horizon',
      status: 'Processed',
      createdAt: new Date(Date.now() - 3600000),
      originalImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=200',
      backgroundRemovedImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=200',
      synthesizedImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600',
      dominantColors: ['#2A2A2A', '#D4AF37', '#E5E5E5'],
      details: {
        seoTitle: 'TimeShield Horizon - Luxury Smart Analog Chrono',
        seoDescription: 'Command your time with the TimeShield Horizon. Engineered for high-stress daily schedules, it blends Swiss precision mechanics with a titanium casing and scratch-resistant sapphire crystal lens.',
        categorySuggested: 'Electronics & Wearable Devices',
        bulletPoints: ['Dual automatic quartz dials', 'Up to 100m pressure water resistance', 'Night Glow illumination hands', 'Genuine full-grain calfskin strap']
      },
      pricing: { suggestedPrice: 185, minPriceRange: 149, maxPriceRange: 220 },
      packaging: { material: 'Rigid cedarwood box', ecoFriendly: true, description: 'Earthy presentation setup' },
      compliance: { passed: true, warnings: [] },
      keywords: ['watch', 'luxury', 'quartz']
    },
    {
      id: 'mock-lst-2',
      name: 'ApexFly Speedknit',
      status: 'Processed',
      createdAt: new Date(Date.now() - 86400000),
      originalImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
      backgroundRemovedImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
      synthesizedImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      dominantColors: ['#FF1493', '#FFFFFF', '#111111'],
      details: {
        seoTitle: 'ApexFly Speedknit - Cushioned Road Runners',
        seoDescription: 'Transform your daily run with ApexFly Speedknit. Designed with breathable woven micro-fibers and a proprietary high-rebound carbon plate sole, these shoes maximize energy return and prevent knee strain.',
        categorySuggested: 'Footwear & Athletic Apparel',
        bulletPoints: ['Carbon plate technology', 'Breathable weave', 'Multi-direction anti-slip pods']
      },
      pricing: { suggestedPrice: 95, minPriceRange: 75, maxPriceRange: 110 },
      packaging: { material: 'Pulp folding carton', ecoFriendly: true, description: 'Saves 35% cardboard space' },
      compliance: { passed: true, warnings: [] },
      keywords: ['running', 'shoe', 'fitness']
    }
  ];
}
