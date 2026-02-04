// 1. État global
let destinations = JSON.parse(localStorage.getItem('myDestinations')) || [];
let editId = null;

// Selectors
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const form = document.getElementById('modal-form'); // Khdemna b ID hna
const cardsContainer = document.querySelector('.lg\\:flex.lg\\:gap-6');
const categoryFilters = document.querySelectorAll('.flex.gap-2.flex-wrap span');

// 2. Fonction d'affichage (Render)
function renderDestinations(filter = 'All') {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = ''; 

    const filtered = (filter === 'All' || filter === 'Tous') 
        ? destinations 
        : destinations.filter(d => d.categorie.toLowerCase() === filter.toLowerCase());

    filtered.forEach((dest, index) => {
        const card = document.createElement('div');
        card.className = "rounded-2xl overflow-hidden shadow-lg mb-4 lg:w-2/3 bg-white border border-gray-100";
        card.innerHTML = `
            <img src="${dest.imageUrl || 'https://via.placeholder.com/400x250'}" class="w-full h-56 object-cover">
            <div class="p-4">
              <div class="flex justify-between items-center mb-2">
                 <h3 class="font-bold text-lg text-gray-800">${dest.titre}</h3>
                 <div class="flex gap-3">
                    <button onclick="editCard(${index})" class="text-emerald-600 hover:text-emerald-800 font-medium text-sm">Modifier</button>
                    <button onclick="deleteCard(${index})" class="text-red-500 hover:text-red-700 font-medium text-sm">Supprimer</button>
                 </div>
              </div>
              <p class="text-sm text-gray-600 mb-2">${dest.destination} • ⭐ ${dest.note}/5</p>
              <span class="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">${dest.categorie}</span>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

// 3. Gestion du Modal
openModalBtn.onclick = () => {
    editId = null;
    form.reset();
    modal.classList.remove('hidden');
};

closeModalBtn.onclick = () => {
    modal.classList.add('hidden');
};

