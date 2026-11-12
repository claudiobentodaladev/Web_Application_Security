const dns = require('dns');

const promises = [];

function generateSubdomains(length) {
    const charset = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let subdomains = charset;
    let subdomain;
    let letter;
    let temp;

    for (let i = 1; i < length; i++) {
        temp = [];

        for (let k = 0; k < subdomains.length; k++) {
            subdomain = subdomains[k];

            for (let m = 0; m < charset.length; m++) {
                letter = charset[m];
                temp.push(subdomain + letter);
            }

        }

        subdomains = temp
    }

    return subdomains;
}

const domain = "zonetransfer.me";
const subdomains = generateSubdomains(4);

subdomains.forEach((subdomain) => {
    promises.push(new Promise((resolve, reject) => {
        dns.resolve(`${subdomain}.${domain}`, function (err, ip) {
            return resolve({ subdomain: subdomain, ip: ip });
        });
    }));
});

Promise.all(promises).then(function (results) {
    results.forEach((result) => {
        if (!!result.ip) {
            console.log(result);
        }
    });
});