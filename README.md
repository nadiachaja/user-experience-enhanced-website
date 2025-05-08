
# Enhanced website
Ontwerp en maak een interactieve website die snel laadt en prettig te gebruiken is.

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/enhanced-website/blob/main/docs/INSTRUCTIONS.md)


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
Millidoni is een bedrijf waar je cadeaus voor familie/vrienden/collega's of kennissen kan zoeken met behulp van een AI chatbox. Ze geloven dat een cadeau mensen dichter bij elkaar brengt. Ik heb de homepagina, de detailpagina's van de cadeaus en de favorieten pagina waar je de cadeau's kan zien die je heb opgeslagen. <br>
[LIVE LINK](https://user-experience-enhanced-website-5hsm.onrender.com/)

<img width="740" alt="home gemaakt" src="https://github.com/user-attachments/assets/8895acd8-a58e-4fd7-bccc-c6b33662a5e9" />
<br>
<br>

Het design van de homepagina is wat aangepast. De kaartjes zijn wat groter, de filters zijn weg, er zijn nieuwe afbeeldingen en de bookmark is veranderd als je een cadeau wil opslaan. Er zijn ook thema's bijvoorbeeld kerst en valentijnsdag. 

**Origineel**<br>
<img width="456" alt="design home" src="https://github.com/user-attachments/assets/a98e0d6d-58bc-4e7e-8b3a-57aa4d6d7422" />
<br>
**Kerst**<br>
<img width="412" alt="design home kerst" src="https://github.com/user-attachments/assets/7560ac1c-b0b6-4b26-8840-cb14e1712d42" />

**Valentijnsdag**<br>
<img width="411" alt="design home valentijn" src="https://github.com/user-attachments/assets/52eea95a-010d-4222-b8be-36233dbf81cd" />

## Gebruik

Als je op de website komt begin je op homepagina waar je aan de linkerkant de chat heb waar je kan filteren voor een cadeau die je zoekt. Aan de rechterkant staan alle cadeau's waar je doorheen kan scrollen. Als je er doorheen scrollt blijft de chat en de header staan alleen de rechterkant waar de cadeau's staan beweegt dan. Je kan ook cadeau's opslaan je kan op de streepjes met het plusje (bookmark) klikken je kan zien dat je kan klikken, omdat de button waar de bookamark on zit groter wordt. Als het opgeslagen is verandert de bookmark in steepjes met een vinkje en is die ook opgeslagen in je lijst. 
<br>
<br>
Je kan ook meer informatie over een cadeau zien. Je kan dan op het cadeua klikken waar je meer over wil weten. Je ziet dan een beschrjving, meer informatie over het cadeau, waar je het cadeau kan kopen en wat je misschien ook nog leuk vind.
<br>
<br>
In de header staat een button mijn lijst met als je erop klikt dat je dan naar je lijst gaat waar je opgeslagen cadeau's ziet met erboven het aantal opgelagen en als je niks heb opgeslagen dan staat er dat je geen favorieten gevonden en een button naar alle cadeau's. Ook zie je voor wie het cadeau is en zie je je vorige gespreken met de chat.

<video src="https://github.com/user-attachments/assets/24a8a8ff-97b7-44b1-8d52-accc0e5554d9" controls muted autoplay playsinline></video>

## Kenmerken

**Routes**
- [app.get('/')](https://github.com/nadiachaja/user-experience-enhanced-website/blob/main/server.js#L19-L55) -> homepagina. Haalt hier de alle cadeau's op en wordt gekeken of cadeau's zijn opgeslagen. 
- [app.get('/cadeau/:slug')](https://github.com/nadiachaja/user-experience-enhanced-website/blob/main/server.js#L64-L75) -> detailpagina van een cadeau. Haalt hier de slug op van het cadeau waar op geklikt is. 
- [app.get('/favourite')](https://github.com/nadiachaja/user-experience-enhanced-website/blob/main/server.js#L79-L116) -> favorieten pagina/ opgelsagen cadeau's. Haalt de opgeslagen cadeau's op dat doet die met een specifiek id.
- [app.post('/:itemId')](https://github.com/nadiachaja/user-experience-enhanced-website/blob/main/server.js#L123-L154) -> Kijk op de homepagina of de cadeau's opgeslagen of niet opgeslagen zijn.

**Responsive Images**<br>
Op de homepagina heb ik alle img een picture element om heen gezet met een height en width toegevoegd. <br>
Hier pakt die de beste formaat die de browser ondersteund. Ik heb meerdere afbeeldingsformaten (avif, webp en jpg of svg). 
https://github.com/nadiachaja/user-experience-enhanced-website/blob/4a5466c7834f4f14089f7475c6d672384f51cdf5/views/partials/card.liquid#L4-L18
https://github.com/nadiachaja/user-experience-enhanced-website/blob/4a5466c7834f4f14089f7475c6d672384f51cdf5/server.js#L6

<img width="357" alt="responsive images" src="https://github.com/user-attachments/assets/30e8bfb3-121a-4c9d-a371-8347fc32a4ac" />

**View Transitions**<br>
Ik heb een view transition toegevoegd als je naar de mijn lijst gaat. De pagina komt dan van rechts en de pagina waar je op was gaat omhoog en verwijnt. 
https://github.com/nadiachaja/user-experience-enhanced-website/blob/4a5466c7834f4f14089f7475c6d672384f51cdf5/views/index.liquid#L3
https://github.com/nadiachaja/user-experience-enhanced-website/blob/4a5466c7834f4f14089f7475c6d672384f51cdf5/views/favourite.liquid#L2
https://github.com/nadiachaja/user-experience-enhanced-website/blob/4a5466c7834f4f14089f7475c6d672384f51cdf5/public/styles.css#L8-L44
<video src="https://github.com/user-attachments/assets/224a2371-b3f9-4f5e-a09a-4ec41938abcb" controls muted autoplay playsinline></video>

**Lazy loading**<br>
De lazy loading help om je website sneller te laten werken. Hij laad alleen de afbeelingen die op het scherm te zien zijn en als je door scrollt laad die de andere afbeeldingen.
https://github.com/nadiachaja/user-experience-enhanced-website/blob/4a5466c7834f4f14089f7475c6d672384f51cdf5/views/partials/card.liquid#L8
<video src="https://github.com/user-attachments/assets/6f136e65-9acd-4df9-9010-b804102357b0" controls muted autoplay playsinline></video>

## Installatie
1. Download NodeJS
2. Fork deze repository
3. Clone het op je laptop
4. Open het in Github
5. Open de terminal in je Github
6. Typ in de terminal npm install om alles te installeren
7. Typ in de terminal npm start om de server te starten
8. Je krijg een local host in de terminal klik daarop om je project te zien

## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
