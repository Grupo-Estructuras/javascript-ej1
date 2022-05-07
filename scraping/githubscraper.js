const puppeteer = require('puppeteer');
const fs = require('fs');

// scrapGitHub("https://github.com/topics/c")

async function scrapGitHub(urlGH, language) {
  try {
    const navegador = await puppeteer.launch();  // abrimos navegador
    const pagina = await navegador.newPage();    // abrimos pagina
    await pagina.goto(urlGH);  // vamos al url y esperamos a que responda

    descripcion = await pagina.evaluate(() => {
      return document.querySelector('.h3.color-fg-muted').textContent;
    })

    numero = (/(\d+(,\d*)*)/).exec(descripcion);
    await navegador.close();
    // totalEntry=numero[0]
    numero[0] = numero[0].replace(',', '');

    return numero[0];
  } catch (error) {
    console.error();
    return 0;
  }
}
function calcRating(languages, min, max) {
  // calculamos rating
  for (var i = 0; i < 20; i++) {
    languages[i].rating = ((languages[i].apar - min) / (max - min)) * 100;
  }
  // ordenamos
  languages.sort((a, b) => {
    if (a.rating == b.rating) {
      return 0;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 1;
  });
  // imprimimos como se pide
  for (let i = 0; i < 20; i++) {
    console.log(
        languages[i].nombre + ', ' + languages[i].rating + ', ' +
        languages[i].apar);
  }

  let abcisa = [];
  let ordenada = [];
  for (var i = 0; i < 10; i++) {
    abcisa.push(languages[i].nombre);
    ordenada.push(languages[i].apar);
  }
  let archivo = `
    var abcisa=${JSON.stringify(abcisa)};
    var ordenada=${JSON.stringify(ordenada)};`;
  fs.writeFileSync('./scraping/datos.js', archivo, {flag: 'w'});
}


async function desaliasing(languages) {
  min = 0;
  max = 0;
  totalEntry = '';
  try {
    AliasJson = fs.readFileSync('./data/langAliases.json', 'utf-8');
    AliasJson = JSON.parse(AliasJson);
    //console.log(AliasJson);
    for (var i = 0; i < 20; i++) {
      actual = languages[i];
      console
      linkear = 'https://github.com/topics/' + AliasJson[languages[i].nombre];
      // console.log(linkear);
      languages[i].apar = await scrapGitHub(linkear, languages[i].nombre);

      totalEntry =
          totalEntry + languages[i].nombre + ', ' + languages[i].apar + '\n';

      if (min > languages[i].apar) {
        min = languages[i].apar;
      } else if (max < languages[i].apar) {
        max = languages[i].apar;
      }
      // console.log (languages[i].apar);
    }
    fs.writeFileSync(
        './data/Resultados.txt', totalEntry,
        {flag: 'w'});  // escribimos los resultados
    await calcRating(languages, min, max);
  } catch (err) {
    console.error(err);
  }
}

// scrapGitHub("https://github.com/topics/c");

async function ejecutarScrapGH() {  // aca empezamos
  let languages = [
    {nombre: 'python', apar: 0, rating: 0},
    {nombre: 'c', apar: 0, rating: 0},
    {nombre: 'java', apar: 0, rating: 0},
    {nombre: 'c++', apar: 0, rating: 0},
    {nombre: 'c#', apar: 0, rating: 0},
    {nombre: 'visual basic', apar: 0, rating: 0},
    {nombre: 'javascript', apar: 0, rating: 0},
    {nombre: 'assembly language', apar: 0, rating: 0},
    {nombre: 'sql', apar: 0, rating: 0},
    {nombre: 'php', apar: 0, rating: 0},
    {nombre: 'r', apar: 0, rating: 0},
    {nombre: 'delphi/object pascal', apar: 0, rating: 0},
    {nombre: 'go', apar: 0, rating: 0},
    {nombre: 'swift', apar: 0, rating: 0},
    {nombre: 'ruby', apar: 0, rating: 0},
    {nombre: 'classic visual basic', apar: 0, rating: 0},
    {nombre: 'objective-c', apar: 0, rating: 0},
    {nombre: 'perl', apar: 0, rating: 0},
    {nombre: 'lua', apar: 0, rating: 0},
    {nombre: 'matlab', apar: 0, rating: 0},
  ]
  await desaliasing(languages);
}

module.exports = {

  ejecutarScrapGH,
};

// export {ejecutarScrapGH};
// export {desaliasing};
// export {scrapGitHub};