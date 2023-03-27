import express from 'express';
import { Request, Response } from 'express';

const app = express();

interface Characters{
    id: Number,
    name: String,
    alter: String
}

let _id = 0

const heroes:Characters[] = [
    {
        id: 1,
        name: "Bruh",
        alter: "The Bruh Moment"
    }
]

const villains:Characters[] = []

app.get('/heroes', (req: Request, res: Response) => {
    res.json(heroes);
})

app.get('/villains', (req: Request, res: Response) => {
    res.json(villains);
})

app.get('/heroes/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    const char = heroes.find((Character) => Character.name.toLowerCase() === name.toLowerCase())
   !char ? res.send("Hero Not Found") : res.json(char)
})

app.get('/villains/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    const char = villains.find((Character) => Character.name.toLowerCase() === name.toLowerCase())
   !char ? res.send("Villain Not Found") : res.json(char)
})

app.post('/heroes', (req: Request, res: Response) => {
    const { alter, name } = req.body
    const lookupchar = heroes.find((Character)=>Character.alter.toLowerCase() === alter.toLowerCase());

    if(lookupchar){
        return res.status(400).json(
            {
                message: `${alter} already exists.`
            }
        )
    }
    const newCharacter = {
        id: _id,
        name,
        alter
    };
    _id += 1
    heroes.push(newCharacter);
    res.status(201).json(newCharacter)

})

app.post('/villains', (req: Request, res: Response) => {
    const { name, alter } = req.body
    const lookupchar = villains.find((Character)=>Character.alter.toLowerCase() === alter.toLowerCase());
    if(lookupchar){
        return res.status(400).json(
            {
                message: `${alter} already exists.`
            }
        )
    }

    const newCharacter = {
        id: _id,
        name,
        alter
    };

    _id += 1
    
    villains.push(newCharacter);
    res.status(201).json(newCharacter)

})

app.put('/heroes', (req: Request, res: Response) =>{
    const {name , alter} = req.body;
    const lookupchar = heroes.find((Character) => Character.alter.toLowerCase() === alter.toLowerCase())

    if (!lookupchar) {
        return res.status(401).json({
            message: `${alter} does not exist`
        })
    }

    lookupchar.alter = alter !== undefined ? alter : lookupchar.alter;
    lookupchar.name = name !== undefined ? name : lookupchar.name;

})

app.put('/villains', (req: Request, res: Response) =>{
    const {name , alter} = req.body;
    const lookupchar = villains.find((Character) => Character.alter.toLowerCase() === alter.toLowerCase())

    if (!lookupchar) {
        return res.status(401).json({
            message: `${alter} does not exist`
        })
    }

    lookupchar.alter = alter !== undefined ? alter : lookupchar.alter;
    lookupchar.name = name !== undefined ? name : lookupchar.name;

})

app.delete('/heroes/:alter', (req: Request, res: Response) => {
    const { alter } = req.params;
    const index = heroes.findIndex((Character)=> Character.alter.toLowerCase()===alter.toLowerCase())

    if (index < 0) {
        return res.status(404).json(`${alter} has not been found`)
    }

    heroes.splice(index,1)
    res.status(200).json(`${alter} has been deleted from the database`)
})

app.delete('/villains/:alter', (req: Request, res: Response) => {
    const { alter } = req.params;
    const index = villains.findIndex((Character)=> Character.alter.toLowerCase()===alter.toLowerCase())

    if (index < 0) {
        return res.status(404).json(`The alter ${alter} has not been found`)
    }

    villains.splice(index,1)
    res.status(200).json(`${alter} has been deleted from the database`)
})


app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
    
