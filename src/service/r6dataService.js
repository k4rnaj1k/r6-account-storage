const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");

const getAccountImage = async (username) => {
    const { data } = await axios.get(`https://r6.tracker.network/profile/pc/${username}`);
    const DOM = new JSDOM(data);
    const { src } = DOM.window.document.querySelector('.trn-scont').children[1].querySelector('img');
    return { image: src };
};

module.exports = { getAccountImage };