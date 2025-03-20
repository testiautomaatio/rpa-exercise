# Selaininteraktiot Playwrightilla

Tässä tehtävässä jatketaan Playwrightin käytön harjoittelua ja testataan web-sivuston toiminnallisuuksia. Tehtävässä keskitytään eri tyyppisten elementtien paikallistamiseen ja niiden kanssa toimimiseen, kuten tekstikentät, painikkeet ja virheilmoitukset. Tehtävässä harjoitellaan myös testien kirjoittamista ja suorittamista sekä testitapauksien luomista ja suunnittelua.

Suoritettavat tehtävät, eli erilaiset interaktiot, on ohjeistettu harjoitussivustolla, joka löytyy osoitteesta https://interaction-playground.pages.dev/. Kyseisellä sivustolla ohjeistetaan esimerkiksi syöttämään tietty teksti tekstikenttään tai valitsemaan tietyt painikkeet, ja onnistuneen suorituksen jälkeen sivusto näyttää palautteen siitä. Tehtäväsi on kirjoittaa testitapaukset, jotka suorittavat nämä interaktiot automaattisesti ja tarkistavat, että sivusto näyttää onnistumisviestit odotetusti.

Pääasiallinen ohjeistus testien kirjoittamiseksi löytyy [Playwrightin dokumentaatiosta](https://playwright.dev/docs/writing-tests). Tekstimuotoisen dokumentaation lisäksi voit hyödyntää lukuisia videoita ja tutoriaaleja, joita löytyy esimerkiksi Playwrightin [YouTube-kanavalta](https://www.youtube.com/c/PlaywrightTest/videos).


## Tehtävän ja testauksen lähtökohdat

Tässä tehtävässä oletetaan, että olet suorittanut aikaisemmat tehtävät, joissa harjoiteltiin Playwright-projektin luontia ja asennusta sekä testien kirjoittamista ja suorittamista. Tämä tehtävärepositorio sisältää valmiiksi Playwright-projektin pohjan, jonka voit asentaa ja käynnistää seuraavasti:

```bash
npm install
npx playwright test
```

Testien suorittaminen edellyttää myös selainten asentamista, minkä olet toivottavasti tehnyt jo aikaisemmassa tehtävässä. Tarvittaessa [asenna testiselain Playwrightin ohjeita seuraten](https://playwright.dev/docs/browsers).


## Testattava sivusto

Testauksen kohteena toimii esimerkkisivusto https://interaction-playground.pages.dev/. Tällä kertaa testien tarkoituksena ei ole varmistaa sivuston toimivuutta, vaan harjoitella eri tyyppisten elementtien paikantamista sekä käyttämistä automatisoiduissa testeissä. Osa sivuston haasteista on hyvin yksinkertaisia ja suoraviivaisia, kun taas osa vaatii hieman enemmän perehtymistä Playwrightin toimintoihin ja mahdollisesti soveltavampia ratkaisuja.

Sivustoa on tarkoitus testata "black box" -mallilla, eli testien kirjoittamiseksi ei ole tarkoitus perehtyä sivuston lähdekoodiin tai verkkoliikenteeseen. HTML-rakenteiden tutkiminen on kuitenkin tarpeen, jotta saat suoritettua testeissä tarvitsemasi operaatiot tekstikentille ja painikkeille.

Sivuston etusivu on jo valmiiksi asetettuna `baseUrl`-muuttujaan [playwright.config.ts](./playwright.config.ts)-tiedostossa, joten testeissä ei välttämättä tarvitse käyttää sivuston absoluuttista osoitetta (ks. [ohje](https://playwright.dev/docs/api/class-testoptions#test-options-base-url)).


## Omien testien toteuttaminen

Kun olet saanut projektin asennettua ja kokeillut manuaalisesti testauksen kohteena olevaa sivustoa, voit aloittaa omien testien kirjoittamisen. Suosittelemme kirjoittamaan jokaista sivustolla olevaa haastetta kohden oman erillisen testin. Voit kirjoittaa testit joko yhteen tiedostoon tai eri tiedostoihin, riippuen siitä, miten haluat järjestää testitapauksesi. Tiedostojesi tulee noudattaa Playwrightin testitiedostojen nimeämiskäytäntöä, eli niiden tulee päättyä `.spec.ts`- tai `.spec.js`-päätteeseen.

Suorita omia testejäsi sitä mukaa, kun kirjoitat niitä, jotta voit varmistaa, että ne toimivat odotetusti. Haasteita ei tarvitse suorittaa järjestyksessä, vaan voit hyvin hypätä yksittäisen haasteen ohi, jos et saa sitä ratkaistua.


## Tehtävän automaattinen arviointi

Kun olet kirjoittanut testitapaukset ja varmistanut, että ne toimivat odotetusti, voit palauttaa tehtävän automaattista tarkastusta varten. Lisää luomasi testitiedostot versionhallintaan ja lähetä muutokset GitHubiin `git status`, `git add`, `git commit` ja `git push` -komennoilla. `push`-komennon jälkeen käynnistyy GitHub action -automaattitarkastus, joka suorittaa testit ja antaa niistä palautteen. Näet palautteen GitHub-repositoriosi actions-välilehdeltä.

Automaattisessa tarkastuksessa käytetään Chromium-selainta ja testit suoritetaan yksi kerrallaan headless-tilassa. Suosittelemme varmistamaan, että testit toimivat paikallisesti seuraavalla komennolla ennen palautusta:

```bash
npx playwright test --reporter="list,html" --project=chromium
```

Palautettuasi tehtävän suorituksesi pisteytetään sen mukaan, kuinka monta interaktiohaastetta sait ratkaistua testattavalla sivustolla. Tarvittaessa tutki actions-välilehden raporttia ja testituloksia, jotta voit täydentää testejäsi kattamaan lisää testitapauksia. Voit palauttaa tehtävän uudelleen useita kertoa tehtävän määräaikaan asti.


## Materiaalista

Tämän tehtävän on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Tehtävän luonnissa on luotu hyödyntämällä kielimalleja ja tekoälytyökaluja, kuten GitHub Copilot ja ChatGPT.