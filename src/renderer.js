const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const masterInputBtn = document.querySelector('#master-pass-input');

const masterInput = document.querySelector('#master-pass');

const addAccountForm = document.querySelector('#add-account-area');
addAccountForm.setAttribute('hidden', true);
const addAccountUsername = document.querySelector('#add-account-username');
const addAccountPassword = document.querySelector('#add-account-password');

const accountsTable = document.querySelector('#accounts');

const addAccountButton = document.querySelector('#add-account-btn');
addAccountButton.addEventListener('click', async () => {
    const username = addAccountUsername.value;
    const password = addAccountPassword.value;

    if (await backend.createAccount(username, password, masterInput.value)) {
        readAccounts(accountsTable, { username, password })
    }
});

const addAccountRow = async (table, account) => {
    const tr = table.insertRow();
    const image = document.createElement('img');
    // const image = tr.appendChild('img');
    image.hidden = true;
    setTimeout(async () => {
        const imageSrc = await backend.getAccountImage(account.username);
        image.src = imageSrc.image;
        image.hidden = false;
    }, Math.random() * 3000);
    tr.appendChild(image);
    const username = tr.insertCell();
    username.innerText = account.username;
    const password = tr.insertCell();
    password.innerText = account.password;
}

const fillTable = async (table, accountData) => {
    accountData.forEach(async (account) => {
        await addAccountRow(table, account);
    });
};

const readAccounts = async () => {
    if (masterInput.value.length === 0)
        return;
    accountsTable.replaceChildren();
    masterInput.setAttribute('disabled', true);
    addAccountForm.removeAttribute('hidden');
    const accounts = await backend.readAccounts(masterInput.value);
    fillTable(accountsTable, accounts);
}

masterInputBtn.addEventListener('click', readAccounts);