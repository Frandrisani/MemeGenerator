// Array di frasi per la sovrapposizione
const phrases = [
  "Quando credi di essere il genio del secolo e tutti pensano che sei solo un altro caso di disastro cerebrale",
  "Quando provi a fare una battuta intelligente e tutti si chiedono se hai mai avuto un pensiero lucido",
  "Quando ti senti speciale e qualcuno ti ricorda che anche i virus hanno un obiettivo più alto di te",
  "Quando pensi che il tuo umorismo sia brillante e tutti si chiedono se la tua luce sia stata spenta da tempo",
  "Quando cerchi di essere originale e finisci per essere solo un’imitazione di un brutto sogno",
  "Quando il tuo piano per brillare è solo una luce fioca nel buio del tuo fallimento",
  "Quando pensi di essere un faro di saggezza e tutti vedono solo una lampadina fulminata",
  "Quando credi che le tue idee siano rivoluzionarie e nessuno le considera nemmeno come un’illuminazione di emergenza",
  "Quando ti senti un esperto e il tuo pubblico sembra più interessato a un cartone animato che a te",
  "Quando il tuo ego è grande quanto la tua ignoranza",
  "Quando entri in una stanza e ti accorgi che il tuo piano di fuga è la stessa porta da cui sei entrato",
  "Quando pensi che la tua vita sia un’avventura e scopri che è solo una serie di incidenti domestici",
  "Quando ogni volta che cerchi di fare un cambiamento, il destino ti manda a un circo di disastri",
  "Quando l’unico progresso che fai è scoprire nuovi modi per complicare le cose",
  "Quando pensi che ogni giorno possa migliorare e invece scopri che il futuro è solo un’altra versione del caos presente",
  "Quando ti rendi conto che il tuo piano di carriera è diventato un piano per sopravvivere a un reality show",
  "Quando ogni nuova opportunità sembra solo un’altra scusa per peggiorare la situazione",
  "Quando il tuo sogno di una vita organizzata è diventato un incubo di disordine totale",
  "Quando il tuo tentativo di essere produttivo è solo un’altra scena comica nel film della tua vita",
  "Quando pensi che la tua giornata non possa essere più assurda e poi arriva un’altra sorpresa del destino",
  "Quando ti svegli e scopri che il tuo piano di emergenza era solo un’altra illusione",
  "Quando pensi che il tuo giorno possa solo migliorare e poi il destino ti sorprende con una nuova calamità",
  "Quando realizzi che il tuo peggior incubo è diventato realtà e non hai nemmeno il tempo di farti una risata",
  "Quando ti accorgi che ogni volta che tocchi il fondo, il fondo ha un piano per abbassarsi ulteriormente",
  "Quando pensi che la tua giornata possa solo migliorare e poi il destino decide di offrirti un encore di miseria",
  "Quando scopri che il tuo piano di riserva è così fallimentare che il destino lo ha scelto come scherzo finale",
  "Quando la tua giornata sembra tranquilla e poi il destino lancia un tornado di caos nella tua vita",
  "Quando pensi che la tua vita sia un film drammatico e scopri che è solo un documentario su come tutto può andare storto",
  "Quando credi che le tue crisi siano terminate e poi il destino ti regala un altro colpo basso",
  "Quando pensi che la tua vita possa solo migliorare e il destino ti dimostra quanto puoi ancora scendere",
  "Quando ogni nuovo giorno ti sorprende con una nuova e inaspettata forma di miseria",
  "Quando pensi che la tua giornata non possa peggiorare e poi il destino ti mostra che hai solo scalfito la superficie",
  "Quando credi che il tuo piano di emergenza fosse una soluzione e scopri che è solo un altro problema",
  "Quando il tuo tentativo di essere felice è solo un'altra farsa nella commedia tragica della tua vita",
  "Quando il tuo peggior giorno sembra diventare la norma e il miglior giorno sembra solo un altro sogno deluso",
  "Quando ogni tentativo di risollevarti sembra solo un ulteriore passo verso il precipizio",
  "Quando il tuo giorno di riposo si trasforma in un’altra serie di disastri e imprevisti",
  "Quando credi di avere tutto sotto controllo e poi il destino decide di fare uno scherzo pericoloso",
  "Quando il tuo sogno di una vita serena diventa un lungo incubo senza fine",
  "Quando il tuo piano per un futuro migliore si trasforma in una lunga attesa di calamità imminente",
  "Quando l’unico cambiamento che hai fatto è il passaggio da una crisi all’altra senza soluzione",
  "Quando pensi che il tuo piano per una giornata tranquilla sia fallito e poi il destino ti ricompensa con un’altra sorpresa",
];

const memeForm = document.getElementById("memeForm");
const memeOutput = document.getElementById("memeOutput");
const memeImage = document.getElementById("memeImage");
const downloadLink = document.getElementById("downloadLink");

memeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Simulazione del caricamento dell'immagine
  const image = document.getElementById("image1").files[0];

  if (image) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        // Dimensione standard per l'immagine
        const canvasSize = 600;

        // Creazione del layout del meme
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = canvasSize;
        canvas.height = canvasSize;

        // Calcola le dimensioni per mantenere le proporzioni
        let imgWidth, imgHeight;
        if (img.width > img.height) {
          imgWidth = canvasSize;
          imgHeight = (img.height / img.width) * canvasSize;
        } else {
          imgHeight = canvasSize;
          imgWidth = (img.width / img.height) * canvasSize;
        }

        // Centra l'immagine
        const xOffset = (canvasSize - imgWidth) / 2;
        const yOffset = (canvasSize - imgHeight) / 2;

        // Disegna l'immagine ridimensionata e centrata
        ctx.drawImage(img, xOffset, yOffset, imgWidth, imgHeight);

        // Genera un meme random
        const phrase = getRandomPhrase(phrases);

        // Stile del testo
        ctx.font = "bold 30px Impact";
        ctx.fillStyle = "black"; // Colore del testo
        ctx.textAlign = "center";
        ctx.textBaseline = "top"; // Allinea il testo al bordo superiore
        ctx.shadowColor = "white"; // Colore dell'ombra per migliorare la visibilità
        ctx.shadowBlur = 5;

        // Spazio dal bordo inferiore dell'immagine
        const textMargin = 30;
        const maxWidth = canvas.width - 40; // Larghezza massima del testo

        // Calcola l'altezza del testo e gestisce il testo a capo
        const lines = wrapText(
          ctx,
          phrase,
          canvas.width / 2,
          canvas.height - textMargin,
          maxWidth,
          30
        );

        // Disegna il testo
        const reversedLines = [...lines].reverse(); // Crea una copia invertita dell'array lines
        reversedLines.forEach((line, index) => {
          ctx.fillText(
            line,
            canvas.width / 2,
            canvas.height - textMargin - index * 30
          );
        });

        // Imposta l'immagine del meme e il link per il download
        const dataURL = canvas.toDataURL();
        memeImage.src = dataURL;
        downloadLink.href = dataURL;

        // Mostra l'output del meme e il pulsante di download
        memeOutput.style.display = "block";
      };
    };

    reader.readAsDataURL(image);
  }
});

function getRandomPhrase(phrasesArray) {
  const randomIndex = Math.floor(Math.random() * phrasesArray.length);
  return phrasesArray[randomIndex];
}

// Funzione per gestire il testo a capo
function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line.trim());
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim()); // Aggiunge l'ultima riga

  return lines; // Restituisce le righe nel giusto ordine
}
