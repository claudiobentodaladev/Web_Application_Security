function discoverHTTPVerbs(url = "") {
    const verbs = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'];
    const promises = [];

    verbs.forEach((verb) => {
        const promise = new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();

            http.open(verb, url, true)
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            http.onreadystatechange = () => {
                if (http.readyState === 4) {
                    return resolve({ verb: verb, status: http.status });
                }
            }

            setTimeout(() => {
                return resolve({ verb: verb, status: -1 });
            }, 1000);

            http.send({});
        });

        promises.push(promise);
    });

    Promise.all(promises).then((values) => {
        console.log(values);
    });
}


discoverHTTPVerbs("http://localhost:3000/api/produtos")