const express = require('express');
const app = express();
const path = require("path");
const uuid = require('uuid');
const members = require('./Members');

const logger = require('./middleware/logger');
const router = require('./routes/api/members');



// app.use(logger);

// //Get single member

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")));

//Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"

    };
    if (!newMember.name || !newMember.email) {
        res.status(400).json({ msg: "Please include a name and an email" });

    }
    members.push(newMember);
    res.json(members);
});
//Updat member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id == parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name
                member.email = updateMember.email ? updateMember.email : member.email

                res.json({ msg: "Member updated", member })
            }
        });
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
})

//delete req
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if (found) {
        res.json({
            msg: "memebr deleted",
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
})

app.use('/api/members', require('./routes/api/members'))
app.listen(5000, () => {
    console.log(`Server Started`)
});