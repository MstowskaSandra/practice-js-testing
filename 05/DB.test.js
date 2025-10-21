import DB from './DB';

describe('DB insert', () => {
    let db;

    beforeEach(() => {
        db = new DB();
        db._rows = [{ id: 1 }, { id: 2 }];
    });

    it('should add data without id and assign unique id', async() => {
        const data = { name: 'Test' };
        const result = await db.insert(data);
        expect(result).toHaveProperty('id');
        expect(result.id).toBeGreaterThan(2);
        expect(db._rows).toContainEqual(expect.objectContaining({ name: 'Test' }));
    });

    it('should add data with unique numeric id', async () => {
        const data = { id: 3, name: 'Test '};
        const result = await db.insert(data);
        expect(result.id).toBe(3);
        expect(db._rows).toContainEqual(data);
    });

    it('should reject if id is not a number', async () => {
        expect.assertions(1);
        const data = { id: 'a' };
        try {
            await db.insert(data);
        } catch (e) {
            expect(e).toBe('ID can be only number!');
        }
    });

    it('should reject if id is duplicated', async () => {
        expect.assertions(1);
        const data = { id: 2 };
        try {
            await db.insert(data);
        } catch (e) {
            expect(e).toBe('ID can\'t be duplicated!');
        }
    });
});

describe('DB select', () => {
    let db;

    beforeEach(() => {
        db = new DB();
        db._rows = [
            { id: 1, name: 'Test 1' },
            { id: 2, name: 'Test 2' }
        ];;
    });

    it('should return correct object for existing ID', async () => {
        const result = await db.select(1);
        expect(result).toEqual(expect.objectContaining({ id: 1, name: 'Test 1' }));
    });

    it('should rejected promise with message "ID not found" for non-existing ID', async () => {
        expect.assertions(1);
        try {
            await db.select(999);
        } catch (e) {
            expect(e).toBe('ID not found');
        }
    });

    it('should return Promise', () => {
        const result = db.select(1);
        expect(result).toBeInstanceOf(Promise);
    });
});

describe('DB remove', () => {
    let db;

    beforeEach(() => {
        db = new DB();
        db._rows = [
            { id: 1, name: 'Test 1' },
            { id: 2, name: 'Test 2' }
        ];
    });

    it('should remove element with this ID and return appropriate message', async () => {
        expect.assertions(1);
        try {
            await db.remove(999);
        } catch (e) {
            expect(e).toBe('Item not exist!');
        }
    });

    it('should return Promise', () => {
        const result = db.remove(1);
        expect(result).toBeInstanceOf(Promise);
    });
});

describe('DB update', () => {
    let db;

    beforeEach(() => {
        db = new DB();
        db._rows = [
            { id: 1, name: 'Test 1' },
            { id: 2, name: 'Test 2' }
        ];
    });

    it('should update element by ID and return updated object', async () => {
        const newData = { id: 1, name: 'Updated Test' };
        const result = await db.update(newData);
        expect(result).toEqual(newData);
        expect(db._rows).toContainEqual(newData);
    });

    it('should rehect promise with the message "ID has to be set!" if data.id is not provided', async () => {
        expect.assertions(1);
        try {
            await db.update({ name: 'No ID' });
        } catch (e) {
            expect(e).toBe('ID have to be set!');
        }
    });

    it('should reject the promise with the message "ID not found!" if the element with the provided ID does not exist', async () => {
        expect.assertions(1);
        try {
            await db.update({ id: 999, name: 'Not found' });
        } catch (e) {
            expect(e).toBe('ID not found!');
        }
    });

    it('should return Promise', () => {
        const result = db.update({ id: 1, name: 'Test' });
        expect(result).toBeInstanceOf(Promise);
    });
});
