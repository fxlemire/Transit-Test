import app from './app';

app.listen(app.get('port'), (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log(`Express server listening at http://localhost:${app.get('port')}`);
  console.log(`env = ${app.get('env')}`);
});
