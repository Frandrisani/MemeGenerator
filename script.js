// Array di frasi per la sovrapposizione
const phrasesTop = [
  "Quando apro il frigorifero e trovo mia nonna dentro",
  "Quando finalmente arriva il weekend",
  "Quando il tuo amico dice 'Ho un'idea!'",
  // Aggiungi altre frasi qui...
];

const phrasesBottom = [
  "Allora io:",
  "Ecco la mia faccia:",
  "Ecco cosa penso:",
  // Aggiungi altre frasi qui...
];

const memeForm = document.getElementById("memeForm");
const memeOutput = document.getElementById("memeOutput");
const memeImage = document.getElementById("memeImage");

memeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Simulazione del caricamento delle immagini
  const image1 = document.getElementById("image1").files[0];
  const image2 = document.getElementById("image2").files[0];

  if (image1 && image2) {
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function (e) {
      const img1 = new Image();
      img1.src = e.target.result;

      reader2.onload = function (e) {
        const img2 = new Image();
        img2.src = e.target.result;

        img1.onload = function () {
          img2.onload = function () {
            // Dimensione standard per le immagini
            const standardWidth = 600;
            const standardHeight = 800;

            // Creazione del layout del meme
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = standardWidth;
            canvas.height = standardHeight;

            // Disegna le immagini ridimensionate
            ctx.drawImage(img1, 0, 0, standardWidth, standardHeight / 2);
            ctx.drawImage(
              img2,
              0,
              standardHeight / 2,
              standardWidth,
              standardHeight / 2
            );

            // Genera un meme random
            const phraseTop = getRandomPhrase(phrasesTop);
            const phraseBottom = getRandomPhrase(phrasesBottom);

            // Stile del testo
            ctx.font = "40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 4;

            // Testo in sovraimpressione
            ctx.fillText(phraseTop, canvas.width / 2, 50);
            ctx.fillText(
              phraseBottom,
              canvas.width / 2,
              standardHeight / 2 + 50
            );

            memeImage.src = canvas.toDataURL();
            memeOutput.classList.remove("hidden");
          };
          img2.src = e.target.result; // Triggera il caricamento dell'immagine 2
        };
        img1.src = e.target.result; // Triggera il caricamento dell'immagine 1
      };

      reader2.readAsDataURL(image2);
    };

    reader1.readAsDataURL(image1);
  }
});

function getRandomPhrase(phrasesArray) {
  const randomIndex = Math.floor(Math.random() * phrasesArray.length);
  return phrasesArray[randomIndex];
}
