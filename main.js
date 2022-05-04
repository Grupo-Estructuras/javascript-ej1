const puppeteer = require('puppeteer');
const fs = require('fs');

//scrapGitHub("https://github.com/topics/c")




async function scrapGitHub(urlGH){
    try{
        const navegador = await puppeteer.launch(); //abrimos navegador
        const pagina = await navegador.newPage(); //abrimos pagina
        await pagina.goto(urlGH); //vamos al url y esperamos a que responda

        descripcion = await pagina.evaluate(()=>{
            return document.querySelector(".h3.color-fg-muted").textContent;
        })

        numero=(/(\d+(,\d*)*)/).exec(descripcion);
        await navegador.close();
        return numero[0];
    } catch(error){
        console.error();
    }
    
}

async function desaliasing (languages){
    //var AliasJson = new XMLHttpRequest();
    //console.log("xs");
    //AliasJson.open('GET', './data/langAliases.json', false);
    await fs.readFile('./data/langAliases.json', 'utf-8', (error,AliasJson) => {
        console.log("ava33nce");
        if (!error){
            console.log("avance2");
            aliasLan=JSON.parse(AliasJson);
            //console.log(aliasLan.$('c++'));
            for (var i=0;i<languages.length;i++){
                actual=languages[i];
                console
                linkear="https://github.com/topics/" + aliasLan.$actual;
                console.log(linkear);
                totalEntry=scrapGitHub(linkear);
                totalEntry=totalEntry.replace(',','');
                console.log(languages[i]+":"+totalEntry);
            }
        }else{
            console.log("avance");
            console.log('Error de lectura: ${error}');
        }
    });
    //AliasJson.
    //AliasJson.send(null);
    /*if(req.status == 200){
        aliasLan=JSON.parse(AliasJson.responseText);
        for (var i=0;i<languages.length;i++){
            totalEntry=scrapGitHub("https://github.com/topics/"+aliasLan.languages[i]);
            totalEntry=totalEntry.replace(',','');
            console.log(languages[i]+":"+totalEntry);
        }
    }else{
        
        console.error("Error no se pudo leer json");
    }*/
    
    console.log("avance"); 
}


//scrapGitHub("https://github.com/topics/c");


let languages = ["python","c","java","c++","c#","visual basic","javascript","assembly language","sql","php","r","delphi/object pascal","go","swift","ruby","classic visual basic","objective-c","perl","lua","matlab"];
desaliasing(languages);
console.log("avance");
