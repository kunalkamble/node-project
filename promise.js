const chk = require('chalk');

async function listUsers() {
    try {
        const users = await getUsers();
        console.log(chk.green('Users: '), users);
    } catch (err) {
        console.log(chk.red('Error: ') + chk.grey(err.message));
    }
}

listUsers();


function getUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([{ id: 1, name: 'Kunal' }, { id: 2, name: 'Naga' }]);
            // reject({ message: 'There was an issue getting users' });
        });
    }, 4000);
}