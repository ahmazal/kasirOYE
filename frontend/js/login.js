const loginForm= document.getElementById('login-form');

loginForm.addEventListener('submit',  async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getEelementById('password').value;

    try{
        const response = await fetch('http://localhost:5000/api/auth/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
            username: username, 
            password: password
        })
    });
    const data = await response.json();
    if (response.ok){
        console.log('Jawaban dari server:', data);
        alert('Login Berhasil! Selamat datang.');
    } else {
        console.error('Error:', data.message);
        alert('Login Gagal! Silakan coba lagi.');
    }
}catch(error){ 
    console.error('Error:', error);
    alert('Terjadi kesalahan. Silakan coba lagi.');
}
});