class BookController {
  constructor(table) {
    this._setTableListeners(table);
  }

  _setTableListeners(table) {
    if (table) {
      table.addEventListener('click', (event) => {
        const target = event.target;
        const bookId = target.dataset.id;

        if (target.dataset.action === 'remove') {
          this
            ._remove(bookId)
            .then(() => target.closest(`#book-${bookId}`).remove())
            .catch(console.error);
        }
      });
    }
  }

  _remove(bookId) {
    return fetch(`http://localhost:3000/book/${bookId}`, { method: 'DELETE' });
  }
}

export default BookController;
 