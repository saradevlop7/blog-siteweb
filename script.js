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

// 4. L'Enregistrement (FIXED)
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Recuperation des valeurs
    const newData = {
        titre: form.querySelector('input[placeholder*="Titre"]').value,
        destination: form.querySelector('input[placeholder*="Destination"]').value,
        note: form.querySelector('input[placeholder*="Note"]').value,
        categorie: form.querySelector('input[placeholder*="Catégorie"]').value,
        imageUrl: form.querySelector('input[placeholder*="Image"]').value
    };

    if (editId !== null) {
        destinations[editId] = newData;
        editId = null;
    } else {
        destinations.push(newData);
    }

    saveAndRender();
    modal.classList.add('hidden');
    form.reset();
});

// 5. Delete & Edit
window.deleteCard = (index) => {
    if(confirm("Supprimer ce souvenir ?")) {
        destinations.splice(index, 1);
        saveAndRender();
    }
};

window.editCard = (index) => {
    const dest = destinations[index];
    editId = index;
    
    form.querySelector('input[placeholder*="Titre"]').value = dest.titre;
    form.querySelector('input[placeholder*="Destination"]').value = dest.destination;
    form.querySelector('input[placeholder*="Note"]').value = dest.note;
    form.querySelector('input[placeholder*="Catégorie"]').value = dest.categorie;
    form.querySelector('input[placeholder*="Image"]').value = dest.imageUrl;
    
    modal.classList.remove('hidden');
};

// 6. Filtrage
categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryFilters.forEach(s => s.classList.remove('bg-emerald-400', 'text-white'));
        btn.classList.add('bg-emerald-400', 'text-white');
        renderDestinations(btn.innerText.trim());
    });
});

// Helper
function saveAndRender() {
    localStorage.setItem('myDestinations', JSON.stringify(destinations));
    renderDestinations();
}

// Start
renderDestinations();

