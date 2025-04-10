document.getElementById('btn_logout').addEventListener('click', () => {
    fetch('/api/logout', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Logged out successfully') {
                alert('Logged out successfully');
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
});