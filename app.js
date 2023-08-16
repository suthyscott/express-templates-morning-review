import express from 'express'
import nunjucks from 'nunjucks'
// import path from 'path';
// import url from 'url';

// const rootDir = url.fileURLToPath(new URL('.', import.meta.url));

const app = express()

nunjucks.configure('views', {
    autoescape: true, 
    express: app
})

app.get('/', (req, res) => {
    // 1. Just html first
    // res.send('<h1>Hello there</h1>')

    // 2. Then an html file. To do this we have to set up some logic to specify where exactly the file is, since it can't find it with just './index.html'. See the path, url and rootDir lines near the top of the file. 
    // Or just use nunjucks.configure
    // res.sendFile(path.join(rootDir, './index.html'))
    res.render('index.html')

    // 3. What if we have dynamic data?
    // res.send(`<h1>Hello there, ${req.query.name}</h1>`)

    // 4. What if we have multiple queries? 
    // res.send(`<h1>Hello there, ${req.query.name} the ${req.query.title}</h1>`)

    // 5. queries and params. DON'T USE PARAMS ON THE ROOT ENDPOINT
    // res.send(`<h1>Hello there, ${req.params.name} the ${req.query.title}</h1>`)


})

app.get('/nunjucks/:name', (req, res) => {
    // 6. using nunjucks
    res.render('template.html.njk', {
        name: req.params.name,
        title: req.query.title
    })
})

app.get('/items', (req, res)=> {
    // 7. If we want to loop in nunjucks
    console.log('hit')
    const items = [
        {
            name: 'Stick', 
            coolLevel: 10
        },
        {
            name: 'Car', 
            coolLevel: 9
        },
        {
            name: 'Shoulding on yourself', 
            coolLevel: 0
        }
    ]

    // 8. conditionals in nunjucks
    // res.render('item-view.html.njk', {items})
    res.render('item-view.html.njk', {noitems: true})
    // res.render('item-view.html.njk')
})

app.listen(4545, () => console.log(`Take us to warp 4545!`))