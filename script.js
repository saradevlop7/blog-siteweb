
let destinations = JSON.parse(localStorage.getItem("myDestinations")) || [];
let editId = null;


const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const form = document.getElementById("modal-form");
const cardsContainer = document.getElementById("cardsContainer");
const categoryFilters = document.querySelectorAll(".flex.gap-2.flex-wrap span");

const inputTitle = document.getElementById("inputTitle");
const inputDestination = document.getElementById("inputDestination");
const inputNote = document.getElementById("inputNote");
const inputCategory = document.getElementById("inputCategory");
const inputImage = document.getElementById("inputImage");


function renderDestinations(filter = "All") {
  if (!cardsContainer) return;

  cardsContainer.innerHTML = "";

  const filtered =
    filter === "All" || filter === "Tous"
      ? destinations
      : destinations.filter(
          d => d.categorie.toLowerCase() === filter.toLowerCase()
        );

  filtered.forEach((dest, index) => {
    const card = document.createElement("div");
    card.className =
      "rounded-2xl overflow-hidden shadow-lg w-full bg-white border border-gray-100";

    card.innerHTML = `
      <img src="${dest.imageUrl || "https://via.placeholder.com/400x250"}"
           class="w-full h-56 object-cover">

      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-bold text-lg text-gray-800">${dest.titre}</h3>
          <div class="flex gap-3">
            <button onclick="editCard(${index})"
              class="text-emerald-600 hover:text-emerald-800 text-sm font-medium">
              Modifier
            </button>
            <button onclick="deleteCard(${index})"
              class="text-red-500 hover:text-red-700 text-sm font-medium">
              Supprimer
            </button>
          </div>
        </div>

        <p class="text-sm text-gray-600 mb-2">
          ${dest.destination} • ⭐ ${dest.note}/5
        </p>

        <span
          class="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
          ${dest.categorie}
        </span>
      </div>
    `;

    cardsContainer.appendChild(card);
  });
}


openModalBtn.addEventListener("click", () => {
  editId = null;
  form.reset();
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});


form.addEventListener("submit", e => {
  e.preventDefault();

  const newData = {
    titre: inputTitle.value,
    destination: inputDestination.value,
    note: inputNote.value,
    categorie: inputCategory.value,
    imageUrl: inputImage.value
  };

  if (editId !== null) {
    destinations[editId] = newData;
    editId = null;
  } else {
    destinations.unshift(newData);
  }

  saveAndRender();
  modal.classList.add("hidden");
  form.reset();
});

window.deleteCard = index => {
  if (confirm("Supprimer ce souvenir ?")) {
    destinations.splice(index, 1);
    saveAndRender();
  }
};

window.editCard = index => {
  const dest = destinations[index];
  editId = index;

  inputTitle.value = dest.titre;
  inputDestination.value = dest.destination;
  inputNote.value = dest.note;
  inputCategory.value = dest.categorie;
  inputImage.value = dest.imageUrl;

  modal.classList.remove("hidden");
};


categoryFilters.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryFilters.forEach(b =>
      b.classList.remove("bg-emerald-400", "text-white")
    );
    btn.classList.add("bg-emerald-400", "text-white");
    renderDestinations(btn.innerText.trim());
  });
});


function saveAndRender() {
  localStorage.setItem("myDestinations", JSON.stringify(destinations));
  renderDestinations();
}
renderDestinations();
