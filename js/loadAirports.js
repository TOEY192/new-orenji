window.onload = async () => {
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');

    try {
        const res = await fetch('/airports');
        const airports = await res.json();

        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';

        airports.forEach((airport) => {
            const fromOption = document.createElement('option');
            fromOption.value = airport.iata_code;
            fromOption.textContent = `${airport.name} (${airport.iata_code})`;
        
            const toOption = document.createElement('option');
            toOption.value = airport.iata_code;
            toOption.textContent = `${airport.name} (${airport.iata_code})`;
        
            fromSelect.appendChild(fromOption);
            toSelect.appendChild(toOption);
        });
    } catch (err) {
        console.error('Failed to load airports:', err);
        fromSelect.innerHTML = '<option disabled>Error loading airports</option>';
        toSelect.innerHTML = '<option disabled>Error loading airports</option>';
      }
}