const bcrypt = require('bcryptjs');
const Datastore = require('nedb-promises');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

const usersDb = Datastore.create({ filename: path.join(dataDir, 'users.db'), autoload: true });

async function seed() {
  try {
    // Create admin
    const adminExists = await usersDb.findOne({ email: 'admin@a-57.ru' });
    if (!adminExists) {
      const hash = await bcrypt.hash('Admin123!', 12);
      await usersDb.insert({
        _id: 'admin001',
        email: 'admin@a-57.ru',
        password: hash,
        role: 'admin',
        firstName: 'Александр',
        lastName: 'Администратор',
        phone: '+7 (921) 000-00-00',
        createdAt: new Date().toISOString(),
      });
      console.log('✅ Admin created: admin@a-57.ru / Admin123!');
    } else {
      console.log('ℹ️  Admin already exists');
    }

    // Create demo client
    const clientExists = await usersDb.findOne({ email: 'demo@client.ru' });
    if (!clientExists) {
      const hash = await bcrypt.hash('Client123!', 12);
      await usersDb.insert({
        _id: 'client001',
        email: 'demo@client.ru',
        password: hash,
        role: 'client',
        firstName: 'Мария',
        lastName: 'Иванова',
        phone: '+7 (921) 123-45-67',
        companyName: 'Кафе "Уют"',
        objectAddress: 'Красносельский р-н, ул. Примерная, д. 5',
        createdAt: new Date().toISOString(),
      });
      console.log('✅ Demo client created: demo@client.ru / Client123!');
    }

    console.log('✅ Seed complete!');
    process.exit(0);
  } catch (e) {
    console.error('❌ Seed error:', e);
    process.exit(1);
  }
}

seed();
