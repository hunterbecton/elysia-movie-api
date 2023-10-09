import { Elysia, t } from 'elysia';
import { MoviesDatabase } from './db';

const app = new Elysia().decorate('db', new MoviesDatabase());

app.post('/movies', ({ db, body }) => db.addMovie(body), {
  body: t.Object({
    title: t.String(),
    director: t.String(),
  }),
});
app.get('/movies', ({ db }) => db.getMovies());
app.get('/movies/:id', ({ db, params }) => db.getMovie(parseInt(params.id)));
app.put(
  '/movies',
  ({ db, body }) =>
    db.updateMovie(body.id, {
      title: body.title,
      director: body.director,
    }),
  {
    body: t.Object({
      id: t.Number(),
      title: t.String(),
      director: t.String(),
    }),
  }
);
app.delete('/movies/:id', ({ db, params }) =>
  db.deleteMovie(parseInt(params.id))
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
