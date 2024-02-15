const express = require('express');
const app = express();
const port = 6006;
const cors = require('cors');
app.use(cors());



const{dbConnect,Pool}=require('pg')
const db=new Pool({
    user:"postgres",
    host:"127.0.0.1",
    password:"shakthivel",
    port:5432,
    database:"login"
});
const axios = require('axios');
app.use(express.json());

app.post('/sign', async (req, res) => {
    const { email, user, password } = req.body;

    try {
       
        const emailExists = await db.query(
            'SELECT * FROM login WHERE email = $1',
            [email]
        );

        const usernameExists = await db.query(
            'SELECT * FROM login WHERE "user" = $1',
            [user]
        );

        if (emailExists.rows.length > 0) {
            return res.status(409).json({ error: 'Email is already registered' });
        }

        if (usernameExists.rows.length > 0) {
            return res.status(408).json({ error: 'Username is already taken' });
        }

       
        const result = await db.query(
            'INSERT INTO login (email, "user", password) VALUES ($1, $2, $3) RETURNING *',
            [email, user, password]
        );

        console.log('Inserted into database:', result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error storing data in the database', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
       const user = await db.query(
            'SELECT * FROM login WHERE email = $1 AND password = $2',
            [email, password]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        res.json({
            username: user.rows[0].user
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/user-details/:user', async (req, res) => {
    const { user } = req.params;
    const { age, dob, contact, gender, nationality, address } = req.body;
   

    try {
        
      
        const userExists = await db.query(
            'SELECT * FROM login WHERE "user" = $1',
            [user]
        );
        console.log('User query result:', userExists.rows);

        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

       const result = await db.query(
            `UPDATE login
             SET age = $2, dob = $3, contact = $4, gender = $5, nationality = $6, address = $7
             WHERE "user" = $1
             RETURNING *`,
            [user, age, dob, contact, gender, nationality, address]
        );

        console.log('User details updated:', result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/user-details/:user', async (req, res) => {
    const { user } = req.params;
    console.log('Received request to fetch user details for:', user);

    try {
        const userExists = await db.query(
            'SELECT * FROM login WHERE "user" = $1',
            [user]
        );

        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userDetails = {
            age: userExists.rows[0].age,
            dob: userExists.rows[0].dob,
            contact: userExists.rows[0].contact,
            gender: userExists.rows[0].gender,
            nationality: userExists.rows[0].nationality,
            address: userExists.rows[0].address
        };

        res.json(userDetails);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
  })

