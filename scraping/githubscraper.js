const puppeteer = require('puppeteer');
const fs = require('fs/promises');

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

function desaliasing (languages){
    datps 
    var AliasJson = new XMLHttpRequest();
    AliasJson.open('GET', './data/langAliases.json', false);
    AliasJson.send(null);
    if(req.status == 200){
        aliasLan=JSON.parse(AliasJson.responseText);
        for (var i=0;i<languages.length;i++){
            totalEntry=scrapGitHub("https://github.com/topics/"+aliasLan.languages[i]);
            totalEntry=totalEntry.replace(',','');
            console.log(languages[i]+":"+totalEntry);
        }
    }else{
        console.error("Error no se pudo leer json");
    }
      
}


//scrapGitHub("https://github.com/topics/c");

async function ejecutarScrapGH(){
    let languages = ["python","c","java","c++","c#","visual basic","javascript","assembly language","sql","php","r","delphi/object pascal","go","swift","ruby","classic visual basic","objective-c","perl","lua","matlab",];
    desaliasing(langauges);
} 

