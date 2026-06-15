// ============================================
// Jumia — Seed Data
// ============================================

export function seedData() {
  // --- Categories ---
  const categories = [
    'Electronics',
    'Phones & Tablets',
    'Computing',
    'Fashion',
    'Home & Kitchen',
    'Health & Beauty',
    'Sports & Outdoors',
    'Grocery',
  ];
  localStorage.setItem('jumia_categories', JSON.stringify(categories));

  // --- Products ---
  const products = [
    // ===== Electronics (5) =====
    {
      id: crypto.randomUUID(),
      name: 'Samsung 43" Smart LED TV Full HD',
      category: 'Electronics',
      brand: 'Samsung',
      originalPrice: 38999,
      discountedPrice: 29499,
      unitsAvailable: 12,
      description: 'Experience stunning Full HD picture quality with this Samsung 43-inch Smart LED TV. Built-in Wi-Fi, streaming apps, and Dolby Audio for immersive entertainment.',
      images: [
        'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500',
        'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500',
        'https://images.unsplash.com/photo-1552975084-6e027cd345c2?w=500'
      ],
      rating: 4.5,
      reviewCount: 87,
      reviews: [
        { author: 'James M.', rating: 5, text: 'Amazing picture quality for the price. Highly recommended!', date: '2025-11-15' },
        { author: 'Lucy W.', rating: 4, text: 'Good TV, smart features work well. Sound could be better.', date: '2025-12-02' },
        { author: 'Peter K.', rating: 5, text: 'Delivery was fast, TV is perfect for my living room.', date: '2026-01-10' },
      ],
      createdAt: '2025-10-01T10:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'JBL Charge 5 Portable Bluetooth Speaker',
      category: 'Electronics',
      brand: 'JBL',
      originalPrice: 22500,
      discountedPrice: 17999,
      unitsAvailable: 25,
      description: 'JBL Charge 5 delivers powerful sound with deep bass. IP67 waterproof and dustproof, up to 20 hours battery life. PartyBoost compatible.',
      images: [
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        'https://images.unsplash.com/photo-1589256469067-ea009d7a0426?w=500',
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500'
      ],
      rating: 4.7,
      reviewCount: 134,
      reviews: [
        { author: 'Angela N.', rating: 5, text: 'Best speaker I have ever owned. Bass is incredible!', date: '2025-11-20' },
        { author: 'David O.', rating: 4, text: 'Great sound and battery life. A bit heavy though.', date: '2025-12-05' },
        { author: 'Faith K.', rating: 5, text: 'Waterproof feature is a game changer for outdoor events.', date: '2026-01-18' },
      ],
      createdAt: '2025-10-05T12:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
      category: 'Electronics',
      brand: 'Sony',
      originalPrice: 45000,
      discountedPrice: 35999,
      unitsAvailable: 8,
      description: 'Industry-leading noise cancelling with Auto NC Optimizer. Crystal clear hands-free calling. 30-hour battery life. Lightweight and comfortable design.',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
      ],
      rating: 4.8,
      reviewCount: 201,
      reviews: [
        { author: 'Brian T.', rating: 5, text: 'Noise cancelling is out of this world. Perfect for flights.', date: '2025-10-22' },
        { author: 'Christine A.', rating: 5, text: 'So comfortable I forget I am wearing them.', date: '2025-11-08' },
        { author: 'Mark J.', rating: 4, text: 'Excellent headphones. Wish they folded flat like the XM4.', date: '2026-02-14' },
      ],
      createdAt: '2025-10-08T09:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Vitron 32" Digital LED TV',
      category: 'Electronics',
      brand: 'Vitron',
      originalPrice: 14999,
      discountedPrice: null,
      unitsAvailable: 40,
      description: 'Affordable 32-inch Digital LED TV with USB playback, HDMI input, and built-in decoder. Perfect for bedrooms and small living rooms.',
      images: [
        'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500',
        'https://images.unsplash.com/photo-1552975084-6e027cd345c2?w=500',
        'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500'
      ],
      rating: 4.0,
      reviewCount: 56,
      reviews: [
        { author: 'Samuel G.', rating: 4, text: 'Good TV for the price. Works perfectly for my bedroom.', date: '2026-01-25' },
        { author: 'Mary N.', rating: 4, text: 'Clear picture quality. Built-in decoder is a plus.', date: '2026-02-10' },
      ],
      createdAt: '2025-10-10T14:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Oraimo Power Bank 20000mAh Fast Charge',
      category: 'Electronics',
      brand: 'Oraimo',
      originalPrice: 3500,
      discountedPrice: 2699,
      unitsAvailable: 65,
      description: 'Oraimo 20000mAh power bank with 22.5W fast charging. Dual USB output, Type-C input/output. LED battery indicator.',
      images: [
        'https://images.unsplash.com/photo-1609592424089-9a7442125bb8?w=500',
        'https://images.unsplash.com/photo-1601524909162-be87252be298?w=500',
        'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500'
      ],
      rating: 4.3,
      reviewCount: 312,
      reviews: [
        { author: 'Kevin M.', rating: 5, text: 'Charges my phone 4 times! Great value.', date: '2025-12-20' },
        { author: 'Esther W.', rating: 4, text: 'Fast charging works well. A bit bulky but expected.', date: '2026-01-05' },
        { author: 'John K.', rating: 4, text: 'Reliable power bank. Good for travel.', date: '2026-03-11' },
      ],
      createdAt: '2025-10-12T08:00:00.000Z',
    },

    // ===== Phones & Tablets (5) =====
    {
      id: crypto.randomUUID(),
      name: 'Samsung Galaxy A15 128GB',
      category: 'Phones & Tablets',
      brand: 'Samsung',
      originalPrice: 22000,
      discountedPrice: 18499,
      unitsAvailable: 30,
      description: 'Samsung Galaxy A15 with 6.5" Super AMOLED display, 128GB storage, 50MP triple camera, 5000mAh battery, and Android 14.',
      images: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500'
      ],
      rating: 4.4,
      reviewCount: 178,
      reviews: [
        { author: 'Alice K.', rating: 5, text: 'Beautiful display and great camera for the price!', date: '2025-11-30' },
        { author: 'Joseph M.', rating: 4, text: 'Battery lasts all day. Smooth performance.', date: '2026-01-12' },
        { author: 'Grace W.', rating: 4, text: 'Good mid-range phone. Samsung quality.', date: '2026-02-20' },
      ],
      createdAt: '2025-10-15T10:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Tecno Spark 20 Pro+ 256GB',
      category: 'Phones & Tablets',
      brand: 'Tecno',
      originalPrice: 28000,
      discountedPrice: 23999,
      unitsAvailable: 22,
      description: 'Tecno Spark 20 Pro+ featuring 6.78" display, 108MP camera, 256GB/8GB, 5000mAh battery with 33W fast charge.',
      images: [
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
      ],
      rating: 4.2,
      reviewCount: 95,
      reviews: [
        { author: 'Dennis O.', rating: 4, text: 'Great camera and large storage. Value for money.', date: '2025-12-15' },
        { author: 'Janet A.', rating: 5, text: 'Fast charging is amazing! Phone looks premium.', date: '2026-01-22' },
        { author: 'Robert N.', rating: 4, text: 'Good phone overall. AMOLED would have been better.', date: '2026-03-01' },
      ],
      createdAt: '2025-10-18T11:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'iPhone 15 128GB',
      category: 'Phones & Tablets',
      brand: 'Apple',
      originalPrice: 149999,
      discountedPrice: 129999,
      unitsAvailable: 5,
      description: 'Apple iPhone 15 with Dynamic Island, 48MP camera, A16 Bionic chip, USB-C, and all-day battery life.',
      images: [
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500',
        'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500',
        'https://images.unsplash.com/photo-1573148195900-7845dcb9b127?w=500'
      ],
      rating: 4.9,
      reviewCount: 420,
      reviews: [
        { author: 'Catherine M.', rating: 5, text: 'Best iPhone yet. Camera is phenomenal.', date: '2025-10-20' },
        { author: 'Steve O.', rating: 5, text: 'USB-C finally! Build quality is incredible.', date: '2025-11-05' },
        { author: 'Lilian P.', rating: 5, text: 'Dynamic Island is so useful. Love this phone!', date: '2026-01-15' },
        { author: 'Alex K.', rating: 4, text: 'Great phone but pricey. Worth it if you can afford it.', date: '2026-02-28' },
      ],
      createdAt: '2025-10-20T12:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Redmi Pad SE 11" Tablet 128GB',
      category: 'Phones & Tablets',
      brand: 'Xiaomi',
      originalPrice: 24000,
      discountedPrice: 19999,
      unitsAvailable: 15,
      description: 'Redmi Pad SE with 11" FHD+ display, Snapdragon 680, quad speakers with Dolby Atmos, 8000mAh battery. Perfect for entertainment and productivity.',
      images: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500',
        'https://images.unsplash.com/photo-1589739900243-4b52cd9b1254?w=500'
      ],
      rating: 4.3,
      reviewCount: 67,
      reviews: [
        { author: 'Nancy K.', rating: 4, text: 'Great tablet for watching movies. Speakers are amazing.', date: '2026-01-08' },
        { author: 'Tom W.', rating: 5, text: 'Best budget tablet. Kids love it.', date: '2026-02-15' },
      ],
      createdAt: '2025-10-22T13:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Nokia G42 5G 128GB',
      category: 'Phones & Tablets',
      brand: 'Nokia',
      originalPrice: 19500,
      discountedPrice: null,
      unitsAvailable: 18,
      description: 'Nokia G42 5G with 6.56" display, Snapdragon 480+, 50MP camera, 5000mAh battery, and 3 years of security updates.',
      images: [
        'https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
      ],
      rating: 4.1,
      reviewCount: 43,
      reviews: [
        { author: 'Patrick M.', rating: 4, text: 'Solid build quality. 5G is fast in Nairobi CBD.', date: '2026-01-30' },
        { author: 'Susan A.', rating: 4, text: 'Clean Android experience. Reliable Nokia quality.', date: '2026-03-05' },
      ],
      createdAt: '2025-10-25T09:00:00.000Z',
    },

    // ===== Computing (5) =====
    {
      id: crypto.randomUUID(),
      name: 'HP Pavilion 15 Laptop Intel i5 8GB/512GB SSD',
      category: 'Computing',
      brand: 'HP',
      originalPrice: 75000,
      discountedPrice: 62999,
      unitsAvailable: 7,
      description: 'HP Pavilion 15 laptop with 12th Gen Intel Core i5, 8GB DDR4 RAM, 512GB NVMe SSD, 15.6" FHD IPS display, backlit keyboard, and Windows 11.',
      images: [
        'https://images.unsplash.com/photo-1496181130204-755241524eab?w=500',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500',
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500'
      ],
      rating: 4.5,
      reviewCount: 112,
      reviews: [
        { author: 'Michael T.', rating: 5, text: 'Fast laptop. SSD makes a huge difference. Great for work.', date: '2025-11-10' },
        { author: 'Wanjiku M.', rating: 4, text: 'Good performance and build quality. Battery could be better.', date: '2025-12-25' },
        { author: 'Daniel K.', rating: 5, text: 'Excellent value for the specs. Highly recommend.', date: '2026-01-20' },
      ],
      createdAt: '2025-10-28T10:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Logitech MK270 Wireless Keyboard & Mouse Combo',
      category: 'Computing',
      brand: 'Logitech',
      originalPrice: 4500,
      discountedPrice: 3499,
      unitsAvailable: 45,
      description: 'Reliable wireless keyboard and mouse combo with 2.4GHz connectivity, spill-resistant keyboard, and up to 24-month battery life.',
      images: [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500',
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500'
      ],
      rating: 4.4,
      reviewCount: 234,
      reviews: [
        { author: 'James O.', rating: 5, text: 'Best keyboard combo for the price. Battery lasts forever.', date: '2025-11-15' },
        { author: 'Rose W.', rating: 4, text: 'Keys feel nice. Mouse is responsive. Good buy.', date: '2026-01-08' },
      ],
      createdAt: '2025-11-01T08:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Lenovo IdeaPad 1 14" AMD Ryzen 3 8GB/256GB',
      category: 'Computing',
      brand: 'Lenovo',
      originalPrice: 45000,
      discountedPrice: null,
      unitsAvailable: 10,
      description: 'Lenovo IdeaPad 1 with AMD Ryzen 3, 8GB RAM, 256GB SSD, 14" HD display. Lightweight and perfect for students and everyday tasks.',
      images: [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
        'https://images.unsplash.com/photo-1496181130204-755241524eab?w=500',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500'
      ],
      rating: 4.1,
      reviewCount: 78,
      reviews: [
        { author: 'Eric M.', rating: 4, text: 'Great laptop for school work. Lightweight and portable.', date: '2026-01-15' },
        { author: 'Judy K.', rating: 4, text: 'Good for basic tasks. Value for money.', date: '2026-02-22' },
        { author: 'Paul W.', rating: 4, text: 'Decent budget laptop. Does what it needs to.', date: '2026-03-10' },
      ],
      createdAt: '2025-11-05T11:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Samsung 24" Curved Monitor FHD',
      category: 'Computing',
      brand: 'Samsung',
      originalPrice: 18000,
      discountedPrice: 14999,
      unitsAvailable: 14,
      description: 'Samsung 24-inch Curved Monitor with FHD resolution, 75Hz refresh rate, AMD FreeSync, eye saver mode, and slim design.',
      images: [
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
        'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500',
        'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=500'
      ],
      rating: 4.6,
      reviewCount: 89,
      reviews: [
        { author: 'Victor O.', rating: 5, text: 'Stunning monitor for the price. Curved screen is immersive.', date: '2025-12-10' },
        { author: 'Diana M.', rating: 4, text: 'Colors are vivid. Great for coding and gaming.', date: '2026-02-05' },
      ],
      createdAt: '2025-11-08T13:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'SanDisk 64GB Ultra USB 3.0 Flash Drive',
      category: 'Computing',
      brand: 'SanDisk',
      originalPrice: 850,
      discountedPrice: 599,
      unitsAvailable: 120,
      description: 'SanDisk Ultra 64GB USB 3.0 flash drive with transfer speeds up to 130MB/s. Compact, reliable, and password-protected.',
      images: [
        'https://images.unsplash.com/photo-1600541519468-4a18d1796115?w=500',
        'https://images.unsplash.com/photo-1616781296064-500b213197f2?w=500',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500'
      ],
      rating: 4.5,
      reviewCount: 450,
      reviews: [
        { author: 'Ann W.', rating: 5, text: 'Fast and reliable. Use it daily for work.', date: '2025-11-20' },
        { author: 'Ken O.', rating: 4, text: 'Good quality flash drive. SanDisk never disappoints.', date: '2026-01-25' },
      ],
      createdAt: '2025-11-10T07:00:00.000Z',
    },

    // ===== Fashion (5) =====
    {
      id: crypto.randomUUID(),
      name: 'Men\'s Slim Fit Casual Button-Down Shirt',
      category: 'Fashion',
      brand: 'Urban Style',
      originalPrice: 2500,
      discountedPrice: 1799,
      unitsAvailable: 50,
      description: 'Stylish slim fit button-down shirt in premium cotton blend. Perfect for casual and semi-formal occasions. Available in multiple colors.',
      images: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        'https://images.unsplash.com/photo-1620012253295-c05518e993be?w=500'
      ],
      rating: 4.2,
      reviewCount: 67,
      reviews: [
        { author: 'Martin K.', rating: 4, text: 'Nice material and fit. True to size.', date: '2025-12-10' },
        { author: 'Sylvia N.', rating: 5, text: 'Bought for my husband, he loves it!', date: '2026-01-18' },
      ],
      createdAt: '2025-11-12T10:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Women\'s Ankara Maxi Dress African Print',
      category: 'Fashion',
      brand: 'Kitenge Queen',
      originalPrice: 3800,
      discountedPrice: 2999,
      unitsAvailable: 30,
      description: 'Beautiful Ankara print maxi dress with vibrant African patterns. Made from quality wax print fabric. Perfect for events and casual wear.',
      images: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500',
        'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500'
      ],
      rating: 4.6,
      reviewCount: 89,
      reviews: [
        { author: 'Mercy A.', rating: 5, text: 'Stunning dress! Got so many compliments.', date: '2025-12-22' },
        { author: 'Patricia W.', rating: 4, text: 'Beautiful print and good quality fabric.', date: '2026-01-30' },
        { author: 'Linda M.', rating: 5, text: 'Loved it! Ordering another in a different print.', date: '2026-03-15' },
      ],
      createdAt: '2025-11-15T09:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Nike Air Max 90 Sneakers',
      category: 'Fashion',
      brand: 'Nike',
      originalPrice: 15000,
      discountedPrice: 11999,
      unitsAvailable: 20,
      description: 'Iconic Nike Air Max 90 sneakers with visible Air cushioning, padded collar, and durable rubber outsole. Classic style for everyday wear.',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
      ],
      rating: 4.7,
      reviewCount: 156,
      reviews: [
        { author: 'Tony N.', rating: 5, text: 'Classic shoe. Comfortable and stylish.', date: '2025-11-25' },
        { author: 'Brenda K.', rating: 5, text: 'Authentic Nike quality. Fits perfectly.', date: '2026-01-10' },
        { author: 'Oscar M.', rating: 4, text: 'Great sneakers but break in period needed.', date: '2026-02-20' },
      ],
      createdAt: '2025-11-18T12:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Men\'s Leather Belt Genuine Cowhide',
      category: 'Fashion',
      brand: 'Savanna Leather',
      originalPrice: 1800,
      discountedPrice: null,
      unitsAvailable: 60,
      description: 'Genuine cowhide leather belt with classic pin buckle. 35mm width, available in black and brown. Durable and elegant.',
      images: [
        'https://images.unsplash.com/photo-1624222247566-5f8224b7566d?w=500',
        'https://images.unsplash.com/photo-1614142222165-b91cbbfe18cd?w=500',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
      ],
      rating: 4.3,
      reviewCount: 98,
      reviews: [
        { author: 'George O.', rating: 4, text: 'Good quality leather. Looks and feels premium.', date: '2026-01-05' },
        { author: 'Sarah M.', rating: 5, text: 'Bought for my dad. He loves it!', date: '2026-02-14' },
      ],
      createdAt: '2025-11-20T08:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Women\'s Handbag PU Leather Tote',
      category: 'Fashion',
      brand: 'Nairobi Chic',
      originalPrice: 3200,
      discountedPrice: 2499,
      unitsAvailable: 35,
      description: 'Elegant PU leather tote handbag with spacious compartments, inner zipper pocket, and detachable strap. Perfect for work and outings.',
      images: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
        'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500'
      ],
      rating: 4.4,
      reviewCount: 72,
      reviews: [
        { author: 'Janet W.', rating: 5, text: 'Love this bag! Spacious and elegant.', date: '2025-12-18' },
        { author: 'Carol N.', rating: 4, text: 'Great quality for the price. Nice design.', date: '2026-02-08' },
      ],
      createdAt: '2025-11-22T11:00:00.000Z',
    },

    // ===== Home & Kitchen (5) =====
    {
      id: crypto.randomUUID(),
      name: 'Ramtons 2-Burner Gas Cooker with Oven',
      category: 'Home & Kitchen',
      brand: 'Ramtons',
      originalPrice: 25000,
      discountedPrice: 19999,
      unitsAvailable: 10,
      description: 'Ramtons 2-burner table-top gas cooker with oven. Auto ignition, adjustable flame control, and tempered glass lid.',
      images: [
        'https://images.unsplash.com/photo-1523413651479-797eb2e3a4d8?w=500',
        'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=500',
        'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500'
      ],
      rating: 4.3,
      reviewCount: 54,
      reviews: [
        { author: 'Helen M.', rating: 5, text: 'Great cooker. Bakes perfectly. Easy to clean.', date: '2025-12-12' },
        { author: 'Josephine A.', rating: 4, text: 'Good quality. Auto ignition works well.', date: '2026-01-28' },
      ],
      createdAt: '2025-11-25T10:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Sayona 2.1 Subwoofer Speaker System',
      category: 'Home & Kitchen',
      brand: 'Sayona',
      originalPrice: 8500,
      discountedPrice: 6299,
      unitsAvailable: 28,
      description: 'Powerful 2.1 channel subwoofer system with Bluetooth, USB, FM radio, and remote control. Deep bass output up to 10000W PMPO.',
      images: [
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500',
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        'https://images.unsplash.com/photo-1589256469067-ea009d7a0426?w=500'
      ],
      rating: 4.1,
      reviewCount: 123,
      reviews: [
        { author: 'Philip K.', rating: 4, text: 'Good bass for the price. Bluetooth works well.', date: '2025-12-20' },
        { author: 'Diana W.', rating: 4, text: 'Loud and clear sound. Great for house parties.', date: '2026-02-05' },
        { author: 'Collins N.', rating: 5, text: 'Amazing value! Sound fills the entire room.', date: '2026-03-12' },
      ],
      createdAt: '2025-11-28T13:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: '6-Piece Non-Stick Cookware Set',
      category: 'Home & Kitchen',
      brand: 'MasterChef',
      originalPrice: 4500,
      discountedPrice: 3299,
      unitsAvailable: 40,
      description: 'Premium non-stick cookware set including 2 frying pans, 2 saucepans with lids, and cooking spoon set. Suitable for all cooktops.',
      images: [
        'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500',
        'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500',
        'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500'
      ],
      rating: 4.2,
      reviewCount: 89,
      reviews: [
        { author: 'Rebecca M.', rating: 4, text: 'Good quality pots. Non-stick coating works perfectly.', date: '2026-01-15' },
        { author: 'Agnes K.', rating: 5, text: 'Love this set! Makes cooking so much easier.', date: '2026-02-28' },
      ],
      createdAt: '2025-12-01T09:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Roch Double Door Refrigerator 138L',
      category: 'Home & Kitchen',
      brand: 'Roch',
      originalPrice: 28000,
      discountedPrice: null,
      unitsAvailable: 8,
      description: 'Roch 138-litre double door refrigerator with energy-efficient compressor, adjustable shelves, and separate freezer compartment.',
      images: [
        'https://images.unsplash.com/photo-1571175432247-cf4e004568c0?w=500',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500',
        'https://images.unsplash.com/photo-1536353284924-9220c464e262?w=500'
      ],
      rating: 4.0,
      reviewCount: 34,
      reviews: [
        { author: 'William N.', rating: 4, text: 'Good fridge for a small family. Energy efficient.', date: '2026-01-20' },
        { author: 'Irene M.', rating: 4, text: 'Works well. Freezer section is spacious enough.', date: '2026-03-08' },
      ],
      createdAt: '2025-12-04T12:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Electric Kettle 1.8L Stainless Steel',
      category: 'Home & Kitchen',
      brand: 'Lyons',
      originalPrice: 1500,
      discountedPrice: 999,
      unitsAvailable: 80,
      description: 'Lyons 1.8-litre stainless steel electric kettle with auto shut-off, boil-dry protection, cordless design, and 360° rotation base.',
      images: [
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500',
        'https://images.unsplash.com/photo-1595434066045-072d18f7c36b?w=500',
        'https://images.unsplash.com/photo-1618849767220-4389f417f7d1?w=500'
      ],
      rating: 4.3,
      reviewCount: 276,
      reviews: [
        { author: 'Ruth W.', rating: 5, text: 'Boils water quickly. Looks elegant in my kitchen.', date: '2025-12-08' },
        { author: 'Stephen O.', rating: 4, text: 'Good quality kettle. Auto shut-off is a must.', date: '2026-02-10' },
      ],
      createdAt: '2025-12-06T07:00:00.000Z',
    },

    // ===== Health & Beauty (5) =====
    {
      id: crypto.randomUUID(),
      name: 'Nivea Men Creme Face & Body Moisturizer 150ml',
      category: 'Health & Beauty',
      brand: 'Nivea',
      originalPrice: 750,
      discountedPrice: 549,
      unitsAvailable: 90,
      description: 'Nivea Men Creme provides intensive moisture without greasy feel. Non-sticky, fast-absorbing formula for face, body, and hands.',
      images: [
        'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500',
        'https://images.unsplash.com/photo-1608248597481-496100c80836?w=500',
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'
      ],
      rating: 4.5,
      reviewCount: 189,
      reviews: [
        { author: 'Andrew M.', rating: 5, text: 'Best moisturizer for men. Not greasy at all.', date: '2025-12-15' },
        { author: 'John W.', rating: 4, text: 'Good product. Lasts long and smells nice.', date: '2026-01-22' },
      ],
      createdAt: '2025-12-08T10:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Maybelline Fit Me Foundation 30ml',
      category: 'Health & Beauty',
      brand: 'Maybelline',
      originalPrice: 1800,
      discountedPrice: 1399,
      unitsAvailable: 55,
      description: 'Maybelline Fit Me Matte + Poreless foundation with natural finish. Oil-free formula blurs pores and mattifies. Available in multiple shades.',
      images: [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
        'https://images.unsplash.com/photo-1617897903246-719242758050?w=500'
      ],
      rating: 4.4,
      reviewCount: 156,
      reviews: [
        { author: 'Elizabeth K.', rating: 5, text: 'My holy grail foundation! Perfect shade match.', date: '2025-12-20' },
        { author: 'Sophie M.', rating: 4, text: 'Good coverage and lasts all day. Love it.', date: '2026-02-01' },
        { author: 'Joy N.', rating: 4, text: 'Affordable and works well on my skin type.', date: '2026-03-10' },
      ],
      createdAt: '2025-12-10T08:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Dark & Lovely Hair Relaxer Regular',
      category: 'Health & Beauty',
      brand: 'Dark & Lovely',
      originalPrice: 650,
      discountedPrice: null,
      unitsAvailable: 70,
      description: 'Dark & Lovely Beautiful Beginnings No-Lye Hair Relaxer with anti-breakage conditioning. Includes gloves and neutralizing shampoo.',
      images: [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
        'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500',
        'https://images.unsplash.com/photo-1608248597481-496100c80836?w=500'
      ],
      rating: 4.0,
      reviewCount: 98,
      reviews: [
        { author: 'Lucy A.', rating: 4, text: 'Relaxes hair well without too much damage.', date: '2026-01-12' },
        { author: 'Beatrice W.', rating: 4, text: 'Always reliable. Been using for years.', date: '2026-02-25' },
      ],
      createdAt: '2025-12-12T11:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Oral-B Pro-Health Toothpaste 140g (3-Pack)',
      category: 'Health & Beauty',
      brand: 'Oral-B',
      originalPrice: 900,
      discountedPrice: 699,
      unitsAvailable: 100,
      description: 'Oral-B Pro-Health All-Around Protection toothpaste 3-pack. Fights cavities, whitens teeth, freshens breath, and strengthens enamel.',
      images: [
        'https://images.unsplash.com/photo-1559599101-30900414a49c?w=500',
        'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500',
        'https://images.unsplash.com/photo-1628136140552-3d89d33c5e7b?w=500'
      ],
      rating: 4.6,
      reviewCount: 310,
      reviews: [
        { author: 'Gloria M.', rating: 5, text: 'Great value pack. Keeps teeth clean and fresh.', date: '2025-12-18' },
        { author: 'Nicholas K.', rating: 4, text: 'Good toothpaste. Mint flavor is refreshing.', date: '2026-01-28' },
      ],
      createdAt: '2025-12-14T09:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Cerave Moisturizing Cream 340g',
      category: 'Health & Beauty',
      brand: 'CeraVe',
      originalPrice: 3500,
      discountedPrice: 2999,
      unitsAvailable: 25,
      description: 'CeraVe Moisturizing Cream with 3 essential ceramides and hyaluronic acid. Non-greasy, fragrance-free. Developed with dermatologists.',
      images: [
        'https://images.unsplash.com/photo-1608248597481-496100c80836?w=500',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'
      ],
      rating: 4.8,
      reviewCount: 245,
      reviews: [
        { author: 'Amina H.', rating: 5, text: 'Best moisturizer ever! My skin has never been better.', date: '2025-12-22' },
        { author: 'Caroline K.', rating: 5, text: 'Dermatologist recommended and it works amazingly.', date: '2026-02-15' },
      ],
      createdAt: '2025-12-16T13:00:00.000Z',
    },

    // ===== Sports & Outdoors (4) =====
    {
      id: crypto.randomUUID(),
      name: 'Yoga Mat 6mm Thick Non-Slip',
      category: 'Sports & Outdoors',
      brand: 'FitPro',
      originalPrice: 2500,
      discountedPrice: 1799,
      unitsAvailable: 35,
      description: 'Premium 6mm thick yoga mat with non-slip surface on both sides. Eco-friendly TPE material, lightweight, and comes with carrying strap.',
      images: [
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500'
      ],
      rating: 4.3,
      reviewCount: 67,
      reviews: [
        { author: 'Christine M.', rating: 4, text: 'Good grip and thickness. Perfect for home workouts.', date: '2026-01-10' },
        { author: 'Diana N.', rating: 5, text: 'Love the quality. Non-slip even when sweaty.', date: '2026-02-18' },
      ],
      createdAt: '2025-12-18T10:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Adjustable Dumbbell Set 20kg',
      category: 'Sports & Outdoors',
      brand: 'Iron Grip',
      originalPrice: 6500,
      discountedPrice: 4999,
      unitsAvailable: 15,
      description: 'Adjustable dumbbell set with 20kg total weight. Includes 2 handles, 4 locking collars, and weight plates. Chrome plated for durability.',
      images: [
        'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=500',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500',
        'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=500'
      ],
      rating: 4.5,
      reviewCount: 54,
      reviews: [
        { author: 'Brian N.', rating: 5, text: 'Great quality weights. Perfect for home gym setup.', date: '2026-01-15' },
        { author: 'Timothy M.', rating: 4, text: 'Solid build. Plates fit well on the handles.', date: '2026-02-22' },
      ],
      createdAt: '2025-12-20T08:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Hiking Backpack 45L Waterproof',
      category: 'Sports & Outdoors',
      brand: 'TrailMaster',
      originalPrice: 5500,
      discountedPrice: null,
      unitsAvailable: 20,
      description: 'Durable 45-litre waterproof hiking backpack with multiple compartments, padded shoulder straps, rain cover, and hydration port.',
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500',
        'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500'
      ],
      rating: 4.4,
      reviewCount: 45,
      reviews: [
        { author: 'Samuel K.', rating: 5, text: 'Used this on Mt Kenya hike. Excellent bag!', date: '2026-01-20' },
        { author: 'Martha W.', rating: 4, text: 'Comfortable and spacious. Rain cover is a bonus.', date: '2026-03-02' },
      ],
      createdAt: '2025-12-22T12:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Mikasa V200W Volleyball Official Match Ball',
      category: 'Sports & Outdoors',
      brand: 'Mikasa',
      originalPrice: 8500,
      discountedPrice: 6999,
      unitsAvailable: 12,
      description: 'Official FIVB game ball with dimpled surface for improved control and visibility. Double-cloth construction for superior durability.',
      images: [
        'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500',
        'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=500',
        'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500'
      ],
      rating: 4.7,
      reviewCount: 38,
      reviews: [
        { author: 'Kelvin O.', rating: 5, text: 'Official match ball quality. Great grip and feel.', date: '2026-01-25' },
        { author: 'Angela A.', rating: 5, text: 'Perfect for our volleyball team. Highly durable.', date: '2026-03-05' },
      ],
      createdAt: '2025-12-24T09:00:00.000Z',
    },

    // ===== Grocery (4) =====
    {
      id: crypto.randomUUID(),
      name: 'Brookside Fresh Milk 1L (6-Pack)',
      category: 'Grocery',
      brand: 'Brookside',
      originalPrice: 960,
      discountedPrice: 840,
      unitsAvailable: 150,
      description: 'Brookside Fresh Whole Milk 1-litre pack of 6. Farm fresh, pasteurized, and rich in calcium and vitamins. Best served chilled.',
      images: [
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500',
        'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500',
        'https://images.unsplash.com/photo-1528750955906-7e944f109b49?w=500'
      ],
      rating: 4.6,
      reviewCount: 89,
      reviews: [
        { author: 'Anne K.', rating: 5, text: 'Always fresh and tasty. Great value in bulk.', date: '2026-01-10' },
        { author: 'Peter O.', rating: 4, text: 'Good milk. Delivery was fast too.', date: '2026-02-20' },
      ],
      createdAt: '2025-12-26T07:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Soko Maize Flour 2kg',
      category: 'Grocery',
      brand: 'Soko',
      originalPrice: 250,
      discountedPrice: null,
      unitsAvailable: 200,
      description: 'Soko premium maize flour for making ugali, porridge, and other traditional dishes. Fortified with vitamins and minerals.',
      images: [
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
        'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=500',
        'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=500'
      ],
      rating: 4.2,
      reviewCount: 156,
      reviews: [
        { author: 'Margaret W.', rating: 4, text: 'Makes perfect ugali every time.', date: '2026-01-15' },
        { author: 'Charles M.', rating: 4, text: 'Good quality flour at a fair price.', date: '2026-02-28' },
      ],
      createdAt: '2025-12-28T08:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Dormans Supreme Coffee 500g',
      category: 'Grocery',
      brand: 'Dormans',
      originalPrice: 1200,
      discountedPrice: 949,
      unitsAvailable: 60,
      description: 'Dormans Supreme fine ground coffee. 100% Kenyan Arabica beans with rich aroma and smooth taste. Perfect for drip and French press.',
      images: [
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500',
        'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500',
        'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500'
      ],
      rating: 4.7,
      reviewCount: 210,
      reviews: [
        { author: 'Linda K.', rating: 5, text: 'Best Kenyan coffee! Rich flavor and aroma.', date: '2025-12-30' },
        { author: 'Paul N.', rating: 5, text: 'My morning ritual. Nothing beats Dormans.', date: '2026-01-20' },
        { author: 'Joyce W.', rating: 4, text: 'Great coffee. Wish it came in bigger packs.', date: '2026-03-08' },
      ],
      createdAt: '2025-12-30T10:00:00.000Z',
    },
    {
      id: crypto.randomUUID(),
      name: 'Ketepa Pride Tagged Tea Bags (100s)',
      category: 'Grocery',
      brand: 'Ketepa',
      originalPrice: 350,
      discountedPrice: 289,
      unitsAvailable: 120,
      description: 'Ketepa Pride premium tagged tea bags. 100% pure Kenyan highland tea with rich golden color and bold flavor. 100 tagged bags per box.',
      images: [
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500',
        'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500',
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500'
      ],
      rating: 4.5,
      reviewCount: 178,
      reviews: [
        { author: 'Sarah N.', rating: 5, text: 'Best tea in Kenya. Rich and bold flavor.', date: '2026-01-08' },
        { author: 'David K.', rating: 4, text: 'Good quality tea bags. Convenient and tasty.', date: '2026-02-15' },
      ],
      createdAt: '2026-01-02T09:00:00.000Z',
    },
  ];

  localStorage.setItem('jumia_products', JSON.stringify(products));

  // --- Delivery Stations ---
  const stations = [
    { name: 'CBD - Moi Avenue', area: 'Nairobi CBD', fee: 171 },
    { name: 'Westlands Mall', area: 'Westlands', fee: 200 },
    { name: 'Garden City', area: 'Thika Road', fee: 250 },
    { name: 'Junction Mall', area: 'Ngong Road', fee: 220 },
  ];
  localStorage.setItem('jumia_stations', JSON.stringify(stations));

  // --- Default Announcement ---
  const announcement = {
    text: '🎉 Jumia Grand Launch! Get up to 60% OFF on selected items! 🎉',
    active: true,
    link: null,
  };
  localStorage.setItem('jumia_announcement', JSON.stringify(announcement));

  // --- Empty Cart ---
  localStorage.setItem('jumia_cart', JSON.stringify([]));
}
