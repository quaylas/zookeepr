const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');

const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper({
        name: 'Daphne',
        id: '123456a'
    }, zookeepers);

    expect(zookeeper.name).toBe('Daphne');
    expect(zookeeper.id).toBe('123456a');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Erica',
            age: 33,
            favoriteAnimal: 'gorilla'
        },
        {
            id: '4',
            name: 'Noel',
            age: 55,
            favoriteAnimal: 'penguin'
        }
    ]

    const updatedZookeepers = filterByQuery({age: 33}, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '3',
            name: 'Erica',
            age: 33,
            favoriteAnimal: 'gorilla'
        },
        {
            id: '4',
            name: 'Noel',
            age: 55,
            favoriteAnimal: 'penguin'
        }
    ]

    const result = findById('3', startingZookeepers);

    expect(result.name).toBe('Erica');
});

test('validates age', () => {
    const zookeeper = {
        id: '3',
        name: 'Erica',
        age: 33,
        favoriteAnimal: 'gorilla'
    };

    const invalidZookeeper = {
        id: '3',
        name: 'Noel',
        age: '55',
        favoriteAnimal: 'penguin'
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});