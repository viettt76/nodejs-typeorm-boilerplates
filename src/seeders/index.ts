import { AppDataSource } from '@/data-source';

async function seed() {
    await AppDataSource.initialize();

    await AppDataSource.destroy();
}

seed()
    .then(() => {
        console.log('Seed completed!');
    })
    .catch((error) => {
        console.error('Error seeding data:', error);
    });
