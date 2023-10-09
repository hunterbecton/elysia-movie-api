import { Database } from 'bun:sqlite';

export interface Movie {
  id?: number;
  title: string;
  director: string;
}

export class MoviesDatabase {
  private db: Database;

  constructor() {
    this.db = new Database('movies.db');
    // Initialize the database
    this.init()
      .then(() => console.log('Database initialized'))
      .catch(console.error);
  }

  // Get all movies
  async getMovies() {
    return this.db.query('SELECT * FROM movies').all();
  }

  // Add a movie
  async addMovie(movie: Movie) {
    return this.db
      .query(`INSERT INTO movies (title, director) VALUES (?, ?) RETURNING id`)
      .get(movie.title, movie.director) as Movie;
  }

  // Update a movie
  async updateMovie(id: number, movie: Movie) {
    return this.db.run(
      `UPDATE movies SET title = '${movie.title}', director = '${movie.director}' WHERE id = ${id}`
    );
  }

  // Delete a movie
  async deleteMovie(id: number) {
    return this.db.run(`DELETE FROM movies WHERE id = ${id}`);
  }

  async getMovie(id: number) {
    return this.db.query(`SELECT * FROM movies WHERE id=${id}`).get() as Movie;
  }

  // Initialize the database
  async init() {
    this.db.run(
      `CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, director TEXT);`
    );

    return this.db.run(
      `INSERT OR IGNORE INTO movies (id, title, director) VALUES (1, 'The Artist', 'Michel Hazanavicius'),(2, 'Argo', 'Ben Affleck'),(3, '12 Years a Slave', 'Steve McQueen'),(4, 'Birdman', 'Alejandro G. Iñárritu'),(5, 'Spotlight', 'Tom McCarthy'),(6, 'Moonlight', 'Barry Jenkins'),(7, 'The Shape of Water', 'Guillermo del Toro'),(8, 'Green Book', 'Peter Farrelly'),(9, 'Parasite', 'Bong Joon-ho'),(10,'Nomadland','Chloe Zhao');`
    );
  }
}
