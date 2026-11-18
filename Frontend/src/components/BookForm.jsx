import { useEffect, useState } from "react";

function BookForm({ bookToEdit, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [publisher, setPublisher] = useState("");

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || "");
      setAuthor(bookToEdit.author || "");
      setPublishDate(
        bookToEdit.publish_date
          ? String(bookToEdit.publish_date).slice(0, 10)
          : ""
      );
      setPublisher(bookToEdit.publisher || "");
    } else {
      setTitle("");
      setAuthor("");
      setPublishDate("");
      setPublisher("");
    }
  }, [bookToEdit]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !publisher.trim()) {
      alert("Judul, penulis, dan penerbit wajib diisi");
      return;
    }

    onSubmit({
      title: title.trim(),
      author: author.trim(),
      publish_date: publishDate || null,
      publisher: publisher.trim(),
    });

    if (!bookToEdit) {
      setTitle("");
      setAuthor("");
      setPublishDate("");
      setPublisher("");
    }
  }

  return (
    <section className="form-card">
      <h2>{bookToEdit ? "Edit Buku" : "Tambah Buku"}</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label htmlFor="title">Judul Buku</label>
          <input
            id="title"
            type="text"
            placeholder="Masukkan judul buku"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Penulis</label>
          <input
            id="author"
            type="text"
            placeholder="Masukkan nama penulis"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publish_date">Tanggal Terbit</label>
          <input
            id="publish_date"
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="publisher">Penerbit</label>
          <input
            id="publisher"
            type="text"
            placeholder="Masukkan nama penerbit"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {bookToEdit ? "Simpan Perubahan" : "Tambah Buku"}
          </button>

          {bookToEdit && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default BookForm;