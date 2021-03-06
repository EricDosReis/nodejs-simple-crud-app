module.exports = class bookDao {
  constructor(db) {
    this._db = db;
  }

  add({ title, price, description, image }) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        INSERT INTO book (
          title,
          price,
          description,
          image
        ) VALUES (?, ?, ?, ?)
        `, [
          title,
          price,
          description,
          image
        ],
        error => {
          if (error) {
            console.error(error);
            return reject('Could not add the book');
          }

          return resolve();
        }
      );
    });
  }

  update({ id, title, price, description, image }) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        UPDATE book SET
          title = ?,
          price = ?,
          description = ?,
          image = ?
        WHERE id = ?
        `, [
          title,
          price,
          description,
          image,
          id
        ],
        error => {
          if (error) {
            console.error(error);
            return reject('Could not update the book');
          }

          return resolve();
        }
      );
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM book',
        (error, books) => {
          if (error) {
            console.error(error);
            return reject('Could not execute the book query');
          }

          return resolve(books);
        }
      );
    });
  }

  getOne(id) {
    return new Promise((resolve, reject) => {
      this._db.all(
        'SELECT * FROM book WHERE id = ?',
        id,
        (error, result) => {
          if (error) {
            console.error(error);
            return reject('Could not execute the book query');
          }

          return resolve(result[0]);
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this._db.run(`
        DELETE FROM book
        WHERE id = ?
      `,
        id
      ,
      error => {
        if (error) {
          console.error(error);
          return reject('Could not delete the book');
        }

        return resolve();
      });
    });
  }
}
