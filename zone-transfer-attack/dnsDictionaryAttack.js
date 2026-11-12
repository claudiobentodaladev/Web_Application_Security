const dns = require('dns');
const csv = require('csv-parser');
const fs = require('fs');
const promises = [];

const domain = "zonetransfer.me";

fs.createReadStream('subdomains-10000.txt')
    .pipe(csv())
    .on('data', (subdomain) => {
        promises.push(new Promise((resolve, reject) => {
            dns.resolve(`${subdomain}.${domain}`, function (err, ip) {
                return resolve({ subdomain: subdomain, ip: ip });
            });
        }));
    })
    .on('end', () => {

        Promise.all(promises).then(function (results) {
            results.forEach((result) => {
                if (!!result.ip) {
                    console.log(result);
                }
            });
        });
    });


