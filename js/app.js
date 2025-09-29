// Elementos DOM
const formScreen = document.getElementById('formScreen');
const confirmationScreen = document.getElementById('confirmationScreen');
const calendarsScreen = document.getElementById('calendarsScreen');
const form = document.getElementById('lunchForm');
const dateSelect = document.getElementById('date');
const availabilityMessage = document.getElementById('availabilityMessage');

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    await loadBookings();
    populateDateOptions();
    setupEventListeners();
    setupRealtimeSubscription();
});

// Carregar agendamentos do Supabase
async function loadBookings() {
    try {
        const { data, error } = await supabase
            .from('lunch_bookings')
            .select('*');
        
        if (error) throw error;
        bookings = data || [];
    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
        bookings = [];
    }
}

// Preencher opções de data
function populateDateOptions() {
    dateSelect.innerHTML = '<option value="">Selecione uma data</option>';
    
    octoberDates.forEach(date => {
        const dateBookings = bookings.filter(b => b.date === date.value);
        const hasDoubleBooking = dateBookings.some(b => b.couples === 'duas');
        const singleBookings = dateBookings.filter(b => b.couples === 'uma');
        const isFullyBooked = hasDoubleBooking || singleBookings.length >= 2;
        
        // Só não mostra a data se estiver completamente ocupada (duas duplas ou uma pessoa para duas duplas)
        if (!isFullyBooked) {
            const option = document.createElement('option');
            option.value = date.value;
            option.textContent = date.text;
            dateSelect.appendChild(option);
        }
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Verificar disponibilidade ao selecionar data
    dateSelect.addEventListener('change', checkDateAvailability);

    // Submissão do formulário
    form.addEventListener('submit', handleFormSubmit);

    // Botões de navegação
    document.getElementById('viewCalendarsBtn').addEventListener('click', showCalendars);
    document.getElementById('viewCalendarsFromConfirmation').addEventListener('click', showCalendars);
    document.getElementById('backToForm').addEventListener('click', showForm);
}

// Verificar disponibilidade da data
function checkDateAvailability() {
    const selectedDate = dateSelect.value;
    const couplesSection = document.querySelector('input[name="couples"]').closest('div').parentElement;
    
    if (selectedDate) {
        const dateBookings = bookings.filter(b => b.date === selectedDate);
        const hasDoubleBooking = dateBookings.some(b => b.couples === 'duas');
        const singleBookings = dateBookings.filter(b => b.couples === 'uma');
        
        if (hasDoubleBooking || singleBookings.length >= 2) {
            // Data completamente ocupada - não deveria aparecer na lista
            availabilityMessage.classList.add('hidden');
            couplesSection.classList.remove('hidden');
        } else {
            // Data livre
            availabilityMessage.classList.add('hidden');
            couplesSection.classList.remove('hidden');
            
            // Limpar seleções
            document.querySelectorAll('input[name="couples"]').forEach(radio => radio.checked = false);
        }
    }
}

// Submissão do formulário
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const date = formData.get('date');
    const couples = formData.get('couples');
    
    // Validação
    if (!name || !date || !couples) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    try {
        const booking = {
            name: name,
            date: date,
            couples: couples,
            which_couple: null,
            created_at: new Date().toISOString()
        };
        
        const { data, error } = await supabase
            .from('lunch_bookings')
            .insert([booking])
            .select();
        
        if (error) throw error;
        
        // Atualizar lista local
        bookings.push(data[0]);
        
        // Mostrar confirmação
        showConfirmation(booking);
        
    } catch (error) {
        console.error('Erro ao salvar agendamento:', error);
        alert('Erro ao agendar almoço. Tente novamente.');
    }
}

// Mostrar tela de confirmação
function showConfirmation(booking) {
    const dateText = octoberDates.find(d => d.value === booking.date)?.text || booking.date;
    const coupleText = booking.couples === 'duas' ? 'Ambas as duplas (Sisteres e Elderes)' : 'Uma dupla';
    
    document.getElementById('confirmationDetails').innerHTML = `
        <div class="space-y-2">
            <p><strong>Nome:</strong> ${booking.name}</p>
            <p><strong>Data:</strong> ${dateText}</p>
            <p><strong>Dupla(s):</strong> ${coupleText}</p>
        </div>
    `;
    
    formScreen.classList.add('hidden');
    confirmationScreen.classList.remove('hidden');
    calendarsScreen.classList.add('hidden');
}

// Mostrar calendários
function showCalendars() {
    updateCal
