const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
PORT = process.env.PORT || 80
const fs = require('fs')

const app = express();
app.use(express.json());
app.use(express.static(path.join('public')));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
  
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: 'public'});
});


app.get('/api/notes', (req, res) => {
    res.json(notes)
});


app.post('/api/notes', (req, res) => {
    let response;


    if(req.body) {
        notes.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(notes), function(err){
            if(err) throw err;
        });
        response = {
            staus: 'success',
            data: notes
        };
        res.json('added!');
    } else {
        res.json('bad request!');
    }
});

app.delete('/api/notes/:id', (req, res) => {
    let response;

    if(req.params.id) {
        let id = req.params.id +1;
        console.log(id);
        notes.splice(id, 1);
        console.log(notes);
        fs.writeFile('./db/db.json', JSON.stringify(notes), function(err){
            if(err) throw err;
        });
        response = {
            status: 'success',
            data: notes
        };
        res.json('deleted!');
    }   else {
        res.json('bad request!');
    }
});


app.get('*', (req, res) =>
res.sendFile('index.html', {root: 'public'})
);
