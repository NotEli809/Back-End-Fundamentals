import express from 'express';
import { Request, Response } from 'express';
import { json } from 'stream/consumers';

const app = express();

interface Characters{
    id: Number,
    name: String,
    alter: String
}

app.use(express.json());

const heroes:Characters[] = []

let heroes_id = heroes.length + 1;

const villains:Characters[] = []

let villains_id = villains.length + 1;

app.get('/heroes', (req: Request, res: Response) => {
    res.json(heroes);
})

app.get('/villains', (req: Request, res: Response) => {
    res.json(villains);
})

app.get('/heroes/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    const char = heroes.find((Character) => Character.name.toLowerCase() === name.toLowerCase())
   !char ? res.send("Hero Not Found, Try Searching for a Hero using their Hero name") : res.json(char)
})

app.get('/villains/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    const char = villains.find((Character) => Character.name.toLowerCase() === name.toLowerCase())
   !char ? res.send("Villain Not Found Try Searching for a Villain using their Villain name") : res.json(char)
})

app.post('/heroes', (req: Request, res: Response) => {
    const { name, alter } = req.body
    const lookupchar = heroes.find((Character)=>Character.alter.toLowerCase() === alter.toLowerCase());

    if(lookupchar){
        return res.status(400).json(
            {
                message: `${alter} already exists.`
            }
        )
    }
    const newCharacter = {
        id: heroes_id,
        name,
        alter
    };

    heroes_id += 1
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
        id: villains_id,
        name,
        alter
    };

    villains_id += 1

    villains.push(newCharacter);
    res.status(201).json(newCharacter)

})

app.put('/heroes/:id', (req: Request, res: Response) =>{
    const {id} = req.params;
    const {name , alter} = req.body;
    const index = heroes.findIndex((Character) => Character.id === parseInt(id));

    if (index < 0) {
        return res.status(404).json(`The hero with ID ${id} was not found.`);
    }

    const hero = heroes[index];

    hero.alter = alter;
    hero.name = name;

    res.status(200).json(hero);
})

app.put('/villains/:id', (req: Request, res: Response) =>{
    const {id} = req.params;
    const {name , alter} = req.body;
    const index = villains.findIndex((villain) => villain.id === parseInt(id));

    if (index < 0) {
        return res.status(404).json(`The villain with ID ${id} was not found.`);
    }

    const villain = villains[index];

    villain.alter = alter;
    villain.name = name;

    res.status(200).json(villain);
})

app.delete('/heroes/:id', (req: Request, res: Response) => {
    const { id, alter } = req.params;
    const index = heroes.findIndex((Character)=> Character.id === parseInt(id))

    if (index < 0) {
        return res.status(404).json(`The alter ${alter} has not been found`);
    }

    const deletedCharacter = heroes.splice(index,1)[0];
    res.status(200).json(`${deletedCharacter.alter} (${deletedCharacter.id}) has been deleted from the database.`);
})

app.delete('/villains/:id', (req: Request, res: Response) => {
    const { id, alter } = req.params;
    const index = villains.findIndex((Character)=> Character.id === parseInt(id))

    if (index < 0) {
        return res.status(404).json(`The alter ${alter} has not been found`);
    }

    const deletedCharacter = villains.splice(index,1)[0];
    res.status(200).json(`${deletedCharacter.alter} (${deletedCharacter.id}) has been deleted from the database.`);
})


app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
    
