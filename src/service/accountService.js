const { AES, enc } = require('crypto-js');
const fs = require('fs');

const decodePassword = (password, passKey) => {
    return AES.decrypt(password, passKey).toString(enc.Utf8);
};

const encodePassword = (password, passKey) => {
    return AES.encrypt(password, passKey).toString();
}

const addAcount = (username, password, passKey) => {
    const fileData = fs.readFileSync('accounts.json', { encoding: 'utf-8', flag: 'a+' });
    let res = [];
    if(fileData){
        res = JSON.parse(fileData);
    }
    res.push({ username, password: encodePassword(password, passKey) });
    fs.writeFileSync('accounts.json', JSON.stringify(res, null, 4), { encoding: 'utf-8', flag: 'w+' });
    return true;
}

const readAccounts = (passKey) => {
    //account file structure: account, password(encoded)
    const fileData = fs.readFileSync('accounts.json', { encoding: 'utf-8', flag: 'a+' });
    let res = [];
    if (fileData) {
        res = JSON.parse(fileData);
    }
    return res.map(({ username, password }) => ({ username: username, password: decodePassword(password, passKey) }));;
}

module.exports = { readAccounts, addAcount };