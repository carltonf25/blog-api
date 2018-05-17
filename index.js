const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, result) => {
    result.send('da index.');
});

app.get('/posts', (request, response) => {
    fs.readFile('blog-data.json', (err, data) => {
        if (err) { return console.log(err) }
        response.send(JSON.parse(data));
    });
});

app.get('/post/:id', (request, response) => {
    fs.readFile('blog-data.json', (err, data) => {
        if (err) { return console.log(err) }
        let id = request.params.id;
        const result = JSON.parse(data)[id];
        response.send(result);
    });
});

app.post('/new', (request, response) => {
    fs.readFile('blog-data.json', (err, data) => {
        if (err) { return console.log(err) }
        let posts = JSON.parse(data);
        let newId = Object.keys(posts).length + 1;
        let newPost =  {
            id: newId, 
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            date: request.body.date,
            title: request.body.title,
            content: request.body.content
        };  
        posts[newId] = newPost;
        fs.writeFile('blog-data.json', JSON.stringify(posts, null, ' '), () => {
        response.send(newPost);
        });
    });
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});
