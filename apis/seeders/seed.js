require('dotenv').config();
const { sequelize, User, Category, Product, Review, Cart, Order, OrderItem } = require('../models');
const { hashPassword } = require('../utils/bcrypt');

const CATEGORIES = [
  { name: 'Sneakers', slug: 'sneakers', description: 'Baskets urbaines et sportives', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600' },
  { name: 'Running', slug: 'running', description: 'Chaussures de course', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600' },
  { name: 'Bottes', slug: 'bottes', description: 'Bottes et bottines', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600' },
  { name: 'Mocassins', slug: 'mocassins', description: 'Chaussures habillées', image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600' },
  { name: 'Sandales', slug: 'sandales', description: 'Sandales et claquettes', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600' },
  { name: 'Ballerines', slug: 'ballerines', description: 'Chaussures plates élégantes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600' },
];

const BRANDS = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'Converse', 'Vans', 'Asics'];
const COLORS = ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#FFA500', '#808080'];
const SIZES = [38, 39, 40, 41, 42, 43, 44, 45];

const PRODUCT_IMAGES = {
  sneakers: [
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800',
  ],
  running: [
    'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800',
    'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800',
  ],
  bottes: [
    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800',
    'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800',
  ],
  mocassins: [
    'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800',
    'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800',
  ],
  sandales: [
    'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800',
    'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?w=800',
  ],
  ballerines: [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
    'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800',
  ],
};

const PRODUCT_NAMES = {
  sneakers: ['Air Max 2025', 'Ultra Boost X', 'Court Legacy', 'Street Runner Pro', 'Urban Flex', 'Cloud Sneaker'],
  running: ['Zoom Pegasus 40', 'Gel Nimbus 25', 'Fresh Foam 1080', 'Wave Rider 27', 'Speed Elite', 'Trail Master'],
  bottes: ['Chelsea Classic', 'Combat Boot', 'Riding Boot', 'Winter Pro', 'Desert Boot', 'Lace-Up Leather'],
  mocassins: ['Penny Loafer', 'Tassel Loafer', 'Leather Classic', 'Suede Comfort', 'Elegant Step', 'Business Pro'],
  sandales: ['Beach Walk', 'Sport Slide', 'Comfort Strap', 'Summer Breeze', 'Trek Sandal', 'Urban Slide'],
  ballerines: ['Classic Flat', 'Ballet Chic', 'Comfort Walk', 'Elegant Point', 'Soft Leather', 'Parisian Style'],
};

const REVIEW_COMMENTS = [
  'Excellent produit, très confortable !',
  'Très bonne qualité, je recommande.',
  'Parfait pour mes pieds, taille bien.',
  'Superbe design, livraison rapide.',
  'Bon rapport qualité-prix.',
  'Confortable mais un peu serré.',
  'Très satisfait de mon achat.',
  'Je les porte tous les jours !',
  'Excellent maintien, parfait pour le sport.',
  'Magnifique, conforme à la description.',
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomPrice = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2));

async function seed() {
  try {
    console.log('🌱 Démarrage du seed...\n');

    // ⚠️ Reset des tables (ordre inverse pour les FK)
    console.log('🗑️  Nettoyage des tables...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await OrderItem.destroy({ where: {}, truncate: true });
    await Order.destroy({ where: {}, truncate: true });
    await Review.destroy({ where: {}, truncate: true });
    await Cart.destroy({ where: {}, truncate: true });
    await Product.destroy({ where: {}, truncate: true });
    await Category.destroy({ where: {}, truncate: true });
    await User.destroy({ where: {}, truncate: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✅ Tables nettoyées\n');

    // ==================== USERS ====================
    console.log('👥 Création des utilisateurs...');
    const adminPassword = await hashPassword('admin123');
    const userPassword = await hashPassword('user123');

    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'ShoeHub',
      email: 'admin@shoehub.com',
      password: adminPassword,
      phone: '+212600000000',
      address: '123 Rue Admin',
      city: 'Casablanca',
      postalCode: '20000',
      country: 'Maroc',
      role: 'admin',
      isActive: true,
    });

    const customers = await User.bulkCreate([
      { firstName: 'Bienvenu', lastName: 'Mukunde', email: 'bienvenu@test.com', password: userPassword, phone: '+212611111111', address: '45 Rue Test', city: 'Rabat', postalCode: '10000', country: 'Maroc', role: 'customer' },
      { firstName: 'Alice', lastName: 'Dupont', email: 'alice@test.com', password: userPassword, phone: '+212622222222', address: '12 Avenue Maroc', city: 'Casablanca', postalCode: '20100', country: 'Maroc', role: 'customer' },
      { firstName: 'Bob', lastName: 'Martin', email: 'bob@test.com', password: userPassword, phone: '+212633333333', address: '78 Boulevard Nord', city: 'Marrakech', postalCode: '40000', country: 'Maroc', role: 'customer' },
      { firstName: 'Charlie', lastName: 'Durand', email: 'charlie@test.com', password: userPassword, phone: '+212644444444', address: '5 Rue Sud', city: 'Fès', postalCode: '30000', country: 'Maroc', role: 'customer' },
    ]);

    console.log(`  ✅ 1 admin + ${customers.length} clients créés\n`);

    // Créer un panier pour chaque user
    for (const u of [admin, ...customers]) {
      await Cart.create({ userId: u.id });
    }

    // ==================== CATEGORIES ====================
    console.log('📂 Création des catégories...');
    const categories = await Category.bulkCreate(CATEGORIES);
    console.log(`  ✅ ${categories.length} catégories créées\n`);

    // ==================== PRODUCTS ====================
    console.log('👟 Création des produits...');
    const products = [];
    for (const cat of categories) {
      const names = PRODUCT_NAMES[cat.slug] || PRODUCT_NAMES.sneakers;
      const images = PRODUCT_IMAGES[cat.slug] || PRODUCT_IMAGES.sneakers;

      for (let i = 0; i < 6; i++) {
        const basePrice = randomPrice(199, 1499);
        const hasDiscount = Math.random() > 0.5;
        const discountPrice = hasDiscount
          ? parseFloat((basePrice * (0.7 + Math.random() * 0.2)).toFixed(2))
          : null;

        const product = await Product.create({
          name: `${names[i % names.length]} ${random(['Pro', 'Max', 'Elite', 'X', 'Plus', 'Air'])}`,
          description: `Découvrez notre ${names[i % names.length]} de la marque ${random(BRANDS)}. Confort optimal, design moderne et qualité premium pour toutes vos occasions.`,
          price: basePrice,
          discountPrice,
          stock: randomInt(5, 100),
          brand: random(BRANDS),
          sizes: SIZES,
          colors: COLORS.slice(0, randomInt(2, 4)),
          images: images,
          rating: 0,
          numReviews: 0,
          isFeatured: Math.random() > 0.7,
          isActive: true,
          categoryId: cat.id,
        });
        products.push(product);
      }
    }
    console.log(`  ✅ ${products.length} produits créés\n`);

    // ==================== REVIEWS ====================
    console.log('⭐ Création des avis...');
    let reviewCount = 0;
    for (const product of products) {
      const numReviews = randomInt(0, 5);
      const usedUsers = new Set();

      for (let i = 0; i < numReviews; i++) {
        let user = random(customers);
        let attempts = 0;
        while (usedUsers.has(user.id) && attempts < 10) {
          user = random(customers);
          attempts++;
        }
        if (usedUsers.has(user.id)) continue;
        usedUsers.add(user.id);

        await Review.create({
          userId: user.id,
          productId: product.id,
          rating: randomInt(3, 5),
          comment: random(REVIEW_COMMENTS),
        });
        reviewCount++;
      }

      // Recalculer rating
      const reviews = await Review.findAll({ where: { productId: product.id } });
      if (reviews.length > 0) {
        const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
        await product.update({
          rating: parseFloat(avg.toFixed(2)),
          numReviews: reviews.length,
        });
      }
    }
    console.log(`  ✅ ${reviewCount} avis créés\n`);

    // ==================== ORDERS ====================
    console.log('📦 Création des commandes de test...');
    const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    let orderCount = 0;

    for (const customer of customers) {
      const numOrders = randomInt(1, 3);
      for (let i = 0; i < numOrders; i++) {
        const numItems = randomInt(1, 3);
        const selectedProducts = [];
        const usedProductIds = new Set();

        for (let j = 0; j < numItems; j++) {
          let p = random(products);
          let attempts = 0;
          while (usedProductIds.has(p.id) && attempts < 10) {
            p = random(products);
            attempts++;
          }
          if (usedProductIds.has(p.id)) continue;
          usedProductIds.add(p.id);
          selectedProducts.push(p);
        }

        let total = 0;
        const itemsData = selectedProducts.map(p => {
          const price = parseFloat(p.discountPrice || p.price);
          const qty = randomInt(1, 2);
          total += price * qty;
          return {
            productId: p.id,
            productName: p.name,
            productImage: p.images?.[0],
            price,
            quantity: qty,
            size: random(SIZES).toString(),
            color: random(COLORS),
          };
        });

        const status = random(statuses);
        const order = await Order.create({
          orderNumber: 'ORD-' + Date.now() + '-' + randomInt(100, 999),
          userId: customer.id,
          totalAmount: parseFloat(total.toFixed(2)),
          status,
          paymentMethod: random(['cod', 'card']),
          paymentStatus: status === 'delivered' ? 'paid' : 'unpaid',
          shippingAddress: customer.address,
          shippingCity: customer.city,
          shippingPostalCode: customer.postalCode,
          shippingCountry: customer.country,
          notes: Math.random() > 0.7 ? 'Livrer avant 18h svp' : null,
        });

        await OrderItem.bulkCreate(
          itemsData.map(item => ({ ...item, orderId: order.id }))
        );
        orderCount++;
      }
    }
    console.log(`  ✅ ${orderCount} commandes créées\n`);

    // ==================== RÉSUMÉ ====================
    console.log('═══════════════════════════════════════');
    console.log('🎉 SEED TERMINÉ AVEC SUCCÈS !');
    console.log('═══════════════════════════════════════');
    console.log('\n📊 Statistiques :');
    console.log(`   👥 ${1 + customers.length} utilisateurs`);
    console.log(`   📂 ${categories.length} catégories`);
    console.log(`   👟 ${products.length} produits`);
    console.log(`   ⭐ ${reviewCount} avis`);
    console.log(`   📦 ${orderCount} commandes`);

    console.log('\n🔑 Comptes de test :');
    console.log('   ┌─ ADMIN ─────────────────────────');
    console.log('   │ Email    : admin@shoehub.com');
    console.log('   │ Password : admin123');
    console.log('   ├─ CLIENTS ───────────────────────');
    console.log('   │ bienvenu@test.com  / user123');
    console.log('   │ alice@test.com     / user123');
    console.log('   │ bob@test.com       / user123');
    console.log('   │ charlie@test.com   / user123');
    console.log('   └──────────────────────────────────\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed :', error);
    process.exit(1);
  }
}

seed();