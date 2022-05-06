//no anda

function graficar (languages){
    var abcisa=[];
    var ordenada=[];
    for (var i=9;i<20;i++){
        abcisa.push(languages[i].nombre);
        ordenada.push(languages[i].nombre);
    }
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: abcisa,
            datasets: [{
                label: 'Rating por lenguage',
                data: ordenada,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

async function obtenerdatos(){
    let resp= new XMLHttpRequest();
    console.log("XD2");
    resp.open('GET','./data/Pgrafica.json');
    
    //let languages= JSON.parse(resp.responseText);
    console.log(resp.responseText);
    resp.onreadystatechange=function(){
        if (resp.readyState === XMLHttpRequest.DONE && resp.status === 200){
            console.log("XD");
            let languages= JSON.parse(resp.responseText);
            console.log(languages);
            graficar(languages);
        }
        console.log("XD3");
    }
    resp.send(null);
}

obtenerdatos();