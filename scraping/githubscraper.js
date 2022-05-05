const puppeteer = require('puppeteer');
const fs = require('fs');

//scrapGitHub("https://github.com/topics/c")

async function scrapGitHub(urlGH,language){
    try{
        const navegador = await puppeteer.launch(); //abrimos navegador
        const pagina = await navegador.newPage(); //abrimos pagina
        await pagina.goto(urlGH); //vamos al url y esperamos a que responda

        descripcion = await pagina.evaluate(()=>{
            return document.querySelector(".h3.color-fg-muted").textContent;
        })

        numero=(/(\d+(,\d*)*)/).exec(descripcion);
        await navegador.close();
        totalEntry=numero[0]
        totalEntry=totalEntry.replace(',','');
        totalEntry=language+"," +totalEntry+"\n";
        console.log(language+", "+totalEntry);
        fs.writeFileSync("./data/Resultados.txt", totalEntry, { flag:'a+' });
        //console.log(numero[0]);
        //return numero[0];
    } catch(error){
        console.error();
    }
    
}

async function desaliasing (languages){
    //var AliasJson = new XMLHttpRequest();
    //console.log("xs");
    //AliasJson.open('GET', './data/langAliases.json', false);
    console.log("Antes");
    try{
        AliasJson=fs.readFileSync('./data/langAliases.json', 'utf-8');
        AliasJson=JSON.parse(AliasJson);
        console.log(AliasJson);
        for (var i=0;i<20;i++){
            actual=languages[i];
            console
            linkear="https://github.com/topics/" + AliasJson[languages[i]];
            console.log(linkear);
            await scrapGitHub(linkear,languages[i]);
        }
    }catch(err){
        console.error(err);
    }
    
}

//scrapGitHub("https://github.com/topics/c");

async function ejecutarScrapGH(){
    let languages = ["python","c","java","c++","c#","visual basic","javascript","assembly language","sql","php","r","delphi/object pascal","go","swift","ruby","classic visual basic","objective-c","perl","lua","matlab",];
    desaliasing(languages);
} 

module.exports={
    ejecutarScrapGH,
};

//export {ejecutarScrapGH};
//export {desaliasing};
//export {scrapGitHub};